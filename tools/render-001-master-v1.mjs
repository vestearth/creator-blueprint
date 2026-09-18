import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const exportDir = path.join(root, "exports", "001-keyboard-layout");
const video = path.join(exportDir, "keyboard-layout-visual-cut-v1.mp4");
const narrationDir = path.join(exportDir, "narration-v1");
const manifestPath = path.join(narrationDir, "manifest.json");
const output = path.join(exportDir, "keyboard-layout-master-v1.mp4");
const runtime = 555;

if (!existsSync(video)) throw new Error(`Missing visual cut: ${video}`);
if (!existsSync(manifestPath)) throw new Error(`Missing narration manifest: ${manifestPath}`);

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const inputs = ["-i", video];
for (const segment of manifest.segments) {
  inputs.push("-i", path.join(narrationDir, segment.file));
}

function atempoChain(speed) {
  const filters = [];
  let remaining = speed;
  while (remaining > 2) {
    filters.push("atempo=2");
    remaining /= 2;
  }
  filters.push(`atempo=${remaining.toFixed(6)}`);
  return filters.join(",");
}

const narrationFilters = [];
const narrationLabels = [];
manifest.segments.forEach((segment, index) => {
  const usable = segment.slotDuration - 2.2;
  const speed = Math.max(1, segment.audioDuration / usable);
  const label = `n${index}`;
  const delay = Math.round((segment.start + 1.1) * 1000);
  narrationFilters.push(
    `[${index + 1}:a]${atempoChain(speed)},highpass=f=75,lowpass=f=11500,` +
    `afade=t=in:st=0:d=0.08,afade=t=out:st=${Math.max(0.1, usable - 0.18).toFixed(3)}:d=0.18,` +
    `atrim=duration=${usable.toFixed(3)},adelay=${delay}|${delay}[${label}]`,
  );
  narrationLabels.push(`[${label}]`);
});

const chapterTimes = [0, 35, 75, 125, 180, 235, 295, 360, 410, 425, 505, 525, 545];
const cueExpression = chapterTimes.map((start) => {
  const local = `(t-${start})`;
  return `between(t,${start},${start + 0.42})*exp(-8*max(0,${local}))*(sin(2*PI*660*${local})+0.55*sin(2*PI*990*${local}))`;
}).join("+").replaceAll(",", "\\,");

const leftMusic = [
  "0.011*sin(2*PI*110*t)",
  "0.007*sin(2*PI*164.81*t+0.7)",
  "0.006*sin(2*PI*220*t+1.4)",
  "0.003*sin(2*PI*329.63*t+2.1)",
].join("+");
const rightMusic = [
  "0.011*sin(2*PI*110*t+0.15)",
  "0.007*sin(2*PI*164.81*t+1.1)",
  "0.006*sin(2*PI*220*t+1.8)",
  "0.003*sin(2*PI*329.63*t+2.7)",
].join("+");

const filter = [
  ...narrationFilters,
  `${narrationLabels.join("")}amix=inputs=${narrationLabels.length}:duration=longest:normalize=0,` +
    "loudnorm=I=-17:TP=-2:LRA=8,asplit=2[narr_sc][narr_mix]",
  `aevalsrc='${leftMusic}|${rightMusic}':s=48000:d=${runtime},` +
    "lowpass=f=4200,highpass=f=60,aecho=0.8:0.42:70|140:0.12|0.07," +
    "afade=t=in:st=0:d=2.5,afade=t=out:st=549:d=6[music]",
  `[music][narr_sc]sidechaincompress=threshold=0.012:ratio=8:attack=18:release=420:makeup=1[ducked]`,
  `aevalsrc='0.11*(${cueExpression})|0.11*(${cueExpression})':s=48000:d=${runtime},` +
    "highpass=f=300,lowpass=f=4800[sfx]",
  "[ducked][narr_mix][sfx]amix=inputs=3:duration=longest:normalize=0," +
    "loudnorm=I=-14:TP=-1.5:LRA=10,aresample=48000,aformat=channel_layouts=stereo[aout]",
].join(";");

execFileSync(ffmpegPath, [
  "-y",
  ...inputs,
  "-filter_complex", filter,
  "-map", "0:v:0",
  "-map", "[aout]",
  "-c:v", "copy",
  "-c:a", "aac",
  "-b:a", "256k",
  "-ar", "48000",
  "-t", String(runtime),
  "-movflags", "+faststart",
  output,
], { stdio: "inherit" });

console.log(`Rendered ${output}`);
