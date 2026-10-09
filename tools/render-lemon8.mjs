import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import {
  MANIFEST_NAME, buildRenderManifest, checkModel, exportName, loadTheme, parsePackageYaml, resolveContent,
} from "./lib/lemon8.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requested = process.argv[2];

if (!requested) {
  console.error("Usage: npm run render:lemon8 -- <id>-<slug>  (or content/<id>-<slug>)");
  process.exit(2);
}

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    ...(process.platform === "win32" ? [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
      process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, "Google", "Chrome", "Application", "chrome.exe"),
    ] : []),
    ...(process.platform === "darwin" ? [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ] : []),
    ...(process.platform === "linux" ? [
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
      "/usr/bin/microsoft-edge",
    ] : []),
  ].filter(Boolean);

  const browser = candidates.find(candidate => existsSync(candidate));
  if (browser) return browser;
  throw new Error([
    "No compatible Chromium browser was found.",
    "Install Chrome, Chromium, or Edge, or set CHROME_PATH to the browser executable.",
    `Checked ${candidates.length} paths for platform ${process.platform}.`,
  ].join(" "));
}

function browserVersion(browser) {
  try {
    // Chrome's --version starts a persistent GUI process on Windows.
    if (process.platform === "win32") {
      return execFileSync("powershell.exe", [
        "-NoProfile", "-NonInteractive", "-Command",
        "(Get-Item -LiteralPath $env:LEMON8_BROWSER_PATH).VersionInfo.ProductVersion",
      ], { encoding: "utf8", windowsHide: true, timeout: 5000,
        env: { ...process.env, LEMON8_BROWSER_PATH: browser } }).trim();
    }
    return execFileSync(browser, ["--version"], { encoding: "utf8", timeout: 5000 }).trim();
  } catch {
    return null;
  }
}

const item = resolveContent(repoRoot, requested);
if (!existsSync(item.packagePath)) {
  console.error(`Lemon8 package not found: ${item.packagePath}`);
  process.exit(2);
}
const pkg = parsePackageYaml(readFileSync(item.packagePath, "utf8"));
const renderDataPath = path.resolve(item.lemon8Root, pkg.render_data || "cards.json");
const model = JSON.parse(readFileSync(renderDataPath, "utf8"));
const theme = loadTheme(repoRoot, model.theme);
if (!theme) {
  console.error(`No theme.json for render_data.theme '${model.theme ?? "missing"}'`);
  process.exit(1);
}
const modelErrors = checkModel(model, theme);
if (modelErrors.length) {
  console.error(`Cannot render ${item.contentId} with theme ${theme.spec.name}:`);
  for (const error of modelErrors) console.error(`- ${error}`);
  process.exit(1);
}

const browser = findBrowser();
const template = readFileSync(theme.templatePath, "utf8");
if (!template.includes("__CARD_DATA__")) throw new Error(`Missing __CARD_DATA__ placeholder: ${theme.templatePath}`);
const pageModel = { ...model, asset_base: `${pathToFileURL(item.assetRoot).href}/` };
const embeddedModel = JSON.stringify(pageModel).replaceAll("</script", "<\\/script");
// Written beside the template so its relative stylesheet and font URLs resolve.
const generatedSource = path.join(theme.dir, `.lemon8-cards.${item.contentId}.generated.html`);
const { width, height } = theme.spec.canvas;
mkdirSync(item.exportRoot, { recursive: true });
writeFileSync(generatedSource, template.replace("__CARD_DATA__", embeddedModel), "utf8");

try {
  for (const card of model.cards) {
    execFileSync(browser, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars",
      "--force-device-scale-factor=1", `--window-size=${width},${height}`,
      `--screenshot=${path.join(item.exportRoot, exportName(item.contentId, card))}`,
      `${pathToFileURL(generatedSource).href}?card=${card.order}`,
    ], { stdio: "inherit" });
  }
} finally {
  rmSync(generatedSource, { force: true });
}

const manifest = buildRenderManifest({
  repoRoot, item, renderDataPath, model, theme,
  extra: { rendered_at: new Date().toISOString(), browser: browserVersion(browser) },
});
writeFileSync(path.join(item.exportRoot, MANIFEST_NAME), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(`Rendered ${model.cards.length} Lemon8 cards with ${browser} to ${item.exportRoot}`);
