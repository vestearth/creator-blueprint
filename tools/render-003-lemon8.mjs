import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentId = "003-mcp";
const source = path.join(root, "assets", contentId, "lemon8-cards.html");
const dataSource = path.join(root, "content", contentId, "outputs", "lemon8", "cards.json");
const output = path.join(root, "exports", contentId, "lemon8");
const generatedSource = path.join(path.dirname(source), ".lemon8-cards.generated.html");
mkdirSync(output, { recursive: true });

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
  throw new Error(`No compatible Chromium browser was found. Checked ${candidates.length} paths.`);
}

const browser = findBrowser();
const model = JSON.parse(readFileSync(dataSource, "utf8"));
const template = readFileSync(source, "utf8");
const embeddedModel = JSON.stringify(model).replaceAll("</script", "<\\/script");
if (!template.includes("__CARD_DATA__")) throw new Error(`Missing __CARD_DATA__ placeholder: ${source}`);
writeFileSync(generatedSource, template.replace("__CARD_DATA__", embeddedModel), "utf8");

try {
  for (const card of model.cards) {
    const name = `${contentId}-lemon8-${String(card.order).padStart(2, "0")}.png`;
    execFileSync(browser, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars",
      "--force-device-scale-factor=1", "--window-size=1080,1440",
      `--screenshot=${path.join(output, name)}`,
      `${pathToFileURL(generatedSource).href}?card=${card.order}`,
    ], { stdio: "inherit" });
  }
} finally {
  rmSync(generatedSource, { force: true });
}

console.log(`Rendered ${model.cards.length} Lemon8 cards with ${browser} to ${output}`);
