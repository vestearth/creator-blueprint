import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const source = path.join(root, "assets", "001-keyboard-layout", "lemon8-cards.html");
const output = path.join(root, "exports", "001-keyboard-layout", "lemon8");
mkdirSync(output, { recursive: true });

for (let card = 1; card <= 8; card += 1) {
  const name = `001-keyboard-layout-lemon8-${String(card).padStart(2, "0")}.png`;
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--force-device-scale-factor=1", "--window-size=1080,1440",
    `--screenshot=${path.join(output, name)}`, `${pathToFileURL(source).href}?card=${card}`],
    { stdio: "inherit" });
}
console.log(`Rendered 8 Lemon8 cards to ${output}`);
