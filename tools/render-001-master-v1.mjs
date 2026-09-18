import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const exportDir = path.join(root, "exports", "001-keyboard-layout");
const video = path.join(exportDir, "keyboard-layout-visual-cut-v1.mp4");
const output = path.join(exportDir, "keyboard-layout-master-v1.mp4");
const runtime = 555;

if (!existsSync(video)) throw new Error(`Missing visual cut: ${video}`);

const chapterTimes = [0, 35, 75, 125, 180, 235, 295, 360, 410, 425, 505, 525, 545];
const cueExpression = chapterTimes.map((start) => {
  const local = `(t-${start})`;
  return `between(t,${start},${start + 0.42})*exp(-8*max(0,${local}))*(sin(2*PI*660*${local})+0.55*sin(2*PI*990*${local}))`;
}).join("+").replaceAll(",", "\\,");

const leftMusic = [
  "0.013*sin(2*PI*110*t+0.22*sin(2*PI*0.021*t))",
  "0.008*sin(2*PI*164.81*t+0.7+0.16*sin(2*PI*0.017*t))",
  "0.006*sin(2*PI*220*t+1.4)",
  "0.004*pow(max(0,sin(2*PI*0.25*t)),12)*sin(2*PI*440*t)",
].join("+");
const rightMusic = [
  "0.013*sin(2*PI*110*t+0.18+0.22*sin(2*PI*0.019*t))",
  "0.008*sin(2*PI*164.81*t+1.1+0.16*sin(2*PI*0.023*t))",
  "0.006*sin(2*PI*220*t+1.8)",
  "0.004*pow(max(0,sin(2*PI*0.25*t+0.5)),12)*sin(2*PI*440*t+0.3)",
].join("+");
const musicExpression = `${leftMusic}|${rightMusic}`.replaceAll(",", "\\,");

const filter = [
  `aevalsrc='${musicExpression}':s=48000:d=${runtime},` +
    "lowpass=f=5200,highpass=f=55,aecho=0.8:0.42:70|140:0.14|0.08," +
    "afade=t=in:st=0:d=2.5,afade=t=out:st=549:d=6[music]",
  `aevalsrc='0.11*(${cueExpression})|0.11*(${cueExpression})':s=48000:d=${runtime},` +
    "highpass=f=300,lowpass=f=4800[sfx]",
  "[music][sfx]amix=inputs=2:duration=longest:normalize=0," +
    "loudnorm=I=-16:TP=-1.5:LRA=8,aresample=48000,aformat=channel_layouts=stereo[aout]",
].join(";");

execFileSync(ffmpegPath, [
  "-y",
  "-i", video,
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
