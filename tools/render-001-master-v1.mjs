import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const exportDir = path.join(root, "exports", "001-keyboard-layout");
const video = path.join(exportDir, "keyboard-layout-visual-cut-v1.mp4");
const music = path.join(root, "assets", "001-keyboard-layout", "audio", "midnight-jay-someday.m4a");
const output = path.join(exportDir, "keyboard-layout-master-v1.mp4");
const runtime = 555;

if (!existsSync(video)) throw new Error(`Missing visual cut: ${video}`);
if (!existsSync(music)) throw new Error(`Missing licensed music: ${music}`);

const chapterTimes = [0, 35, 75, 125, 180, 235, 295, 360, 410, 425, 505, 525, 545];
const cueExpression = chapterTimes.map((start) => {
  const local = `(t-${start})`;
  return `between(t,${start},${start + 0.42})*exp(-8*max(0,${local}))*(sin(2*PI*660*${local})+0.55*sin(2*PI*990*${local}))`;
}).join("+").replaceAll(",", "\\,");

const filter = [
  "[1:a]aresample=48000[m0]",
  "[2:a]aresample=48000[m1]",
  "[3:a]aresample=48000[m2]",
  "[4:a]aresample=48000[m3]",
  "[5:a]aresample=48000[m4]",
  "[6:a]aresample=48000[m5]",
  "[m0][m1]acrossfade=d=2:c1=tri:c2=tri[x1]",
  "[x1][m2]acrossfade=d=2:c1=tri:c2=tri[x2]",
  "[x2][m3]acrossfade=d=2:c1=tri:c2=tri[x3]",
  "[x3][m4]acrossfade=d=2:c1=tri:c2=tri[x4]",
  "[x4][m5]acrossfade=d=2:c1=tri:c2=tri,atrim=duration=555," +
    "afade=t=in:st=0:d=1.5,afade=t=out:st=549:d=6[music]",
  `aevalsrc='0.11*(${cueExpression})|0.11*(${cueExpression})':s=48000:d=${runtime},` +
    "highpass=f=300,lowpass=f=4800[sfx]",
  "[music][sfx]amix=inputs=2:duration=longest:normalize=0," +
    "loudnorm=I=-16:TP=-1.5:LRA=8,aresample=48000,aformat=channel_layouts=stereo[aout]",
].join(";");

execFileSync(ffmpegPath, [
  "-y",
  "-i", video,
  "-i", music,
  "-i", music,
  "-i", music,
  "-i", music,
  "-i", music,
  "-i", music,
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
