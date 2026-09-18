import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const preview = path.join(root, "assets", "001-keyboard-layout", "animatic-v1.html");
const frameDir = path.join(root, "exports", "001-keyboard-layout", "frames-v1");
const outputDir = path.dirname(frameDir);
const output = path.join(outputDir, "keyboard-layout-visual-cut-v1.mp4");
const durations = [12, 23, 20, 20, 20, 30, 25, 30, 25, 30, 25, 35, 25, 40, 25, 25, 15, 20, 15, 15, 15, 15, 20, 20, 10];

mkdirSync(frameDir, { recursive: true });

for (let index = 0; index < durations.length; index += 1) {
  const frame = path.join(frameDir, `${String(index + 1).padStart(2, "0")}.png`);
  const url = `${pathToFileURL(preview).href}?export=1&slide=${index}`;
  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--window-size=1920,1080",
    `--screenshot=${frame}`,
    url,
  ], { stdio: "inherit" });
}

const concat = durations.flatMap((duration, index) => {
  const frame = path.join(frameDir, `${String(index + 1).padStart(2, "0")}.png`).replaceAll("\\", "/");
  return [`file '${frame}'`, `duration ${duration}`];
});
const lastFrame = path.join(frameDir, "25.png").replaceAll("\\", "/");
concat.push(`file '${lastFrame}'`);
const concatFile = path.join(frameDir, "concat.txt");
writeFileSync(concatFile, `${concat.join("\n")}\n`, "utf8");

execFileSync(ffmpegPath, [
  "-y",
  "-f", "concat",
  "-safe", "0",
  "-i", concatFile,
  "-vf", "scale=1920:1080:flags=lanczos,format=yuv420p",
  "-r", "30",
  "-t", "555",
  "-an",
  "-c:v", "libx264",
  "-preset", "medium",
  "-crf", "21",
  "-movflags", "+faststart",
  output,
], { stdio: "inherit" });

console.log(`Rendered ${output}`);
