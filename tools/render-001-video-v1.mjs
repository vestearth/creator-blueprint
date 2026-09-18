import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const preview = path.join(root, "assets", "001-keyboard-layout", "animatic-v1.html");
const frameDir = path.join(root, "exports", "001-keyboard-layout", "frames-v1");
const outputDir = path.dirname(frameDir);
const output = path.join(outputDir, "keyboard-layout-visual-cut-v1.mp4");
const durations = [12, 23, 20, 20, 20, 30, 25, 30, 25, 30, 25, 35, 25, 40, 25, 25, 15, 20, 15, 15, 15, 15, 20, 20, 10];
const motionFps = 12;
const holdStep = 2.5;

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForFile(filePath, timeout = 10_000) {
  const started = Date.now();
  while (!existsSync(filePath)) {
    if (Date.now() - started > timeout) throw new Error(`Timed out waiting for ${filePath}`);
    await wait(50);
  }
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id || !this.pending.has(message.id)) return;
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    });
  }

  call(method, params = {}, sessionId) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  close() {
    this.socket.close();
  }
}

function sampleTimes(duration) {
  const times = new Set([0]);
  const frameStep = 1 / motionFps;
  for (let time = frameStep; time <= Math.min(1.35, duration); time += frameStep) times.add(time);
  for (let time = 1.35 + holdStep; time < duration - 0.7; time += holdStep) times.add(time);
  for (let time = Math.max(1.35, duration - 0.7); time < duration; time += frameStep) times.add(time);
  return [...times].sort((a, b) => a - b).filter((time) => time < duration);
}

async function main() {
  mkdirSync(frameDir, { recursive: true });
  const chromeProfile = mkdtempSync(path.join(os.tmpdir(), "creator-blueprint-motion-"));
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--remote-debugging-port=0",
    `--user-data-dir=${chromeProfile}`,
    "--window-size=1920,1080",
    "about:blank",
  ], { stdio: "ignore" });

  let client;
  try {
    const portFile = path.join(chromeProfile, "DevToolsActivePort");
    await waitForFile(portFile);
    const [port, browserPath] = readFileSync(portFile, "utf8").trim().split(/\r?\n/);
    client = new CdpClient(`ws://127.0.0.1:${port}${browserPath}`);
    await client.connect();

    const { targetId } = await client.call("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await client.call("Target.attachToTarget", { targetId, flatten: true });
    await client.call("Page.enable", {}, sessionId);
    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false,
    }, sessionId);

    const concat = [];
    let frameIndex = 0;
    for (let sceneIndex = 0; sceneIndex < durations.length; sceneIndex += 1) {
      const duration = durations[sceneIndex];
      const url = `${pathToFileURL(preview).href}?export=1&slide=${sceneIndex}`;
      await client.call("Page.navigate", { url }, sessionId);
      await client.call("Runtime.evaluate", {
        expression: "document.fonts.ready.then(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))",
        awaitPromise: true,
      }, sessionId);

      const times = sampleTimes(duration);
      for (let timeIndex = 0; timeIndex < times.length; timeIndex += 1) {
        const elapsed = times[timeIndex];
        await client.call("Runtime.evaluate", {
          expression: `window.setExportTime(${elapsed}, ${duration}); new Promise(resolve => requestAnimationFrame(() => resolve(true)))`,
          awaitPromise: true,
        }, sessionId);
        const { data } = await client.call("Page.captureScreenshot", {
          format: "jpeg",
          quality: 91,
          fromSurface: true,
        }, sessionId);
        frameIndex += 1;
        const frame = path.join(frameDir, `motion-${String(frameIndex).padStart(4, "0")}.jpg`);
        writeFileSync(frame, Buffer.from(data, "base64"));
        const nextTime = times[timeIndex + 1] ?? duration;
        concat.push(`file '${frame.replaceAll("\\", "/")}'`, `duration ${(nextTime - elapsed).toFixed(6)}`);
      }
      console.log(`Rendered motion scene ${String(sceneIndex + 1).padStart(2, "0")} / ${durations.length}`);
    }

    const lastFrame = path.join(frameDir, `motion-${String(frameIndex).padStart(4, "0")}.jpg`).replaceAll("\\", "/");
    concat.push(`file '${lastFrame}'`);
    const concatFile = path.join(frameDir, "concat-motion.txt");
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
      "-crf", "20",
      "-movflags", "+faststart",
      output,
    ], { stdio: "inherit" });
  } finally {
    client?.close();
    await new Promise((resolve) => {
      if (chrome.exitCode !== null) return resolve();
      chrome.once("exit", resolve);
      chrome.kill();
      setTimeout(resolve, 3_000);
    });
    try {
      rmSync(chromeProfile, { recursive: true, force: true, maxRetries: 3, retryDelay: 250 });
    } catch (error) {
      console.warn(`Chrome profile cleanup skipped: ${error.message}`);
    }
  }

  console.log(`Rendered ${output}`);
}

await main();
