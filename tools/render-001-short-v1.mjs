import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const page = path.join(root, "assets", "001-keyboard-layout", "short-v1.html");
const music = path.join(root, "assets", "001-keyboard-layout", "audio", "always-yours-youtube-library.webm");
const exportDir = path.join(root, "exports", "001-keyboard-layout");
const frameDir = path.join(exportDir, "frames-short-v1");
const output = path.join(exportDir, "keyboard-layout-short-v1.mp4");
const durations = [4, 9, 11, 10, 8];
const runtime = durations.reduce((sum, duration) => sum + duration, 0);
const motionFps = 12;

if (!existsSync(music)) throw new Error(`Missing YouTube Audio Library working file: ${music}`);
mkdirSync(frameDir, { recursive: true });

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
  close() { this.socket.close(); }
}

function sampleTimes(duration) {
  const times = new Set([0]);
  for (let time = 1 / motionFps; time <= Math.min(1.2, duration); time += 1 / motionFps) times.add(time);
  for (let time = 2.2; time < duration - 0.65; time += 1.4) times.add(time);
  for (let time = Math.max(1.2, duration - 0.65); time < duration; time += 1 / motionFps) times.add(time);
  return [...times].sort((a, b) => a - b).filter((time) => time < duration);
}

const chromeProfile = mkdtempSync(path.join(os.tmpdir(), "creator-blueprint-short-"));
const chrome = spawn(chromePath, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--remote-debugging-port=0",
  `--user-data-dir=${chromeProfile}`, "--window-size=1080,1920", "about:blank",
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
  await client.call("Emulation.setDeviceMetricsOverride", { width:1080, height:1920, deviceScaleFactor:1, mobile:false }, sessionId);

  const concat = [];
  let frameIndex = 0;
  for (let sceneIndex = 0; sceneIndex < durations.length; sceneIndex += 1) {
    const duration = durations[sceneIndex];
    await client.call("Page.navigate", { url:`${pathToFileURL(page).href}?export=1&scene=${sceneIndex}` }, sessionId);
    await client.call("Runtime.evaluate", {
      expression:"document.fonts.ready.then(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))",
      awaitPromise:true,
    }, sessionId);
    const times = sampleTimes(duration);
    for (let index = 0; index < times.length; index += 1) {
      const elapsed = times[index];
      await client.call("Runtime.evaluate", {
        expression:`window.setExportTime(${elapsed}, ${duration}); new Promise(resolve => requestAnimationFrame(() => resolve(true)))`,
        awaitPromise:true,
      }, sessionId);
      const { data } = await client.call("Page.captureScreenshot", { format:"jpeg", quality:92, fromSurface:true }, sessionId);
      frameIndex += 1;
      const frame = path.join(frameDir, `short-${String(frameIndex).padStart(4, "0")}.jpg`);
      writeFileSync(frame, Buffer.from(data, "base64"));
      const nextTime = times[index + 1] ?? duration;
      concat.push(`file '${frame.replaceAll("\\", "/")}'`, `duration ${(nextTime - elapsed).toFixed(6)}`);
    }
    console.log(`Rendered short scene ${sceneIndex + 1} / ${durations.length}`);
  }

  const lastFrame = path.join(frameDir, `short-${String(frameIndex).padStart(4, "0")}.jpg`).replaceAll("\\", "/");
  concat.push(`file '${lastFrame}'`);
  const concatFile = path.join(frameDir, "concat-short.txt");
  writeFileSync(concatFile, `${concat.join("\n")}\n`, "utf8");

  execFileSync(ffmpegPath, [
    "-y", "-f", "concat", "-safe", "0", "-i", concatFile, "-i", music,
    "-filter_complex", `[1:a]atrim=start=0:duration=${runtime},asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.4,afade=t=out:st=${runtime - 2}:d=2,loudnorm=I=-14:TP=-1.5:LRA=8[aout]`,
    "-map", "0:v:0", "-map", "[aout]", "-vf", "scale=1080:1920:flags=lanczos,format=yuv420p",
    "-r", "30", "-t", String(runtime), "-c:v", "libx264", "-preset", "medium", "-crf", "19",
    "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-movflags", "+faststart", output,
  ], { stdio:"inherit" });
} finally {
  client?.close();
  await new Promise((resolve) => {
    if (chrome.exitCode !== null) return resolve();
    chrome.once("exit", resolve);
    chrome.kill();
    setTimeout(resolve, 3_000);
  });
  try { rmSync(chromeProfile, { recursive:true, force:true, maxRetries:3, retryDelay:250 }); }
  catch (error) { console.warn(`Chrome profile cleanup skipped: ${error.message}`); }
}

console.log(`Rendered ${output}`);
