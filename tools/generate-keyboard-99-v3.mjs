import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output99Path = path.join(repoRoot, "assets", "001-keyboard-layout", "keyboard-99-v3.svg");
const output97Path = path.join(repoRoot, "assets", "001-keyboard-layout", "keyboard-97-v3.svg");

const unit = 64;
const gap = 7;
const keyHeight = 58;
const padding = 28;
const topY = padding;
const coreY = topY + keyHeight + 20;
const coreX = padding;
const coreWidth = 15 * unit + 14 * gap;
const navX = coreX + coreWidth + 16;
const navWidth = 3 * unit + 2 * gap;
const numpadX = navX + navWidth + 16;
const numpadWidth = 4 * unit + 3 * gap;
const boardWidth = numpadX + numpadWidth + padding;
const boardHeight = coreY + 5 * keyHeight + 4 * gap + padding;

const keys = [];

function keyWidth(units) {
  return units * unit + (units - 1) * gap;
}

function addKey(x, y, label, width = 1, height = 1, group = "core", accent = false) {
  keys.push({ x, y, label, width, height, group, accent });
}

function addRow(definitions, y, startX = coreX) {
  let x = startX;
  for (const definition of definitions) {
    const [label, width = 1, group = "core", accent = false] = definition;
    addKey(x, y, label, width, 1, group, accent);
    x += keyWidth(width) + gap;
  }
}

let functionX = coreX;
addKey(functionX, topY, "Esc", 1, 1, "function", true);
functionX += unit + gap * 3;
for (let index = 1; index <= 12; index += 1) {
  addKey(functionX, topY, `F${index}`, 1, 1, "function");
  functionX += unit + gap;
  if (index === 4 || index === 8) functionX += gap * 2;
}

const alphaRows = [
  [["~"], ["1"], ["2"], ["3"], ["4"], ["5"], ["6"], ["7"], ["8"], ["9"], ["0"], ["-"], ["="], ["Back", 2]],
  [["Tab", 1.5], ["Q"], ["W"], ["E"], ["R"], ["T"], ["Y"], ["U"], ["I"], ["O"], ["P"], ["["], ["]"], ["\\", 1.5]],
  [["Caps", 1.75], ["A"], ["S"], ["D"], ["F"], ["G"], ["H"], ["J"], ["K"], ["L"], [";"], ["'"], ["Enter", 2.25, "core", true]],
  [["Shift", 2.25], ["Z"], ["X"], ["C"], ["V"], ["B"], ["N"], ["M"], [","], ["."], ["/"], ["Shift", 2.75]],
  [["Ctrl", 1.25], ["Win", 1.25], ["Alt", 1.25], ["", 6.25], ["Alt", 1.25], ["Fn", 1.25], ["Menu", 1.25], ["Ctrl", 1.25]],
];

alphaRows.forEach((row, index) => addRow(row, coreY + index * (keyHeight + gap)));

[["Home", 0, 0], ["End", 1, 0], ["PgUp", 0, 1], ["PgDn", 1, 1]].forEach(([label, column, row]) => {
  addKey(navX + column * (unit + gap), coreY + row * (keyHeight + gap), label, 1, 1, "navigation");
});

addKey(navX + unit + gap, coreY + 3 * (keyHeight + gap), "↑", 1, 1, "arrow", true);
[["←", 0], ["↓", 1], ["→", 2]].forEach(([label, column]) => {
  addKey(navX + column * (unit + gap), coreY + 4 * (keyHeight + gap), label, 1, 1, "arrow");
});

[["Num", 0], ["/", 1], ["*", 2], ["-", 3]].forEach(([label, column]) => {
  addKey(numpadX + column * (unit + gap), coreY, label, 1, 1, "numpad");
});
[["7", 0], ["8", 1], ["9", 2]].forEach(([label, column]) => {
  addKey(numpadX + column * (unit + gap), coreY + keyHeight + gap, label, 1, 1, "numpad");
});
addKey(numpadX + 3 * (unit + gap), coreY + keyHeight + gap, "+", 1, 2, "numpad", true);
[["4", 0], ["5", 1], ["6", 2]].forEach(([label, column]) => {
  addKey(numpadX + column * (unit + gap), coreY + 2 * (keyHeight + gap), label, 1, 1, "numpad");
});
[["1", 0], ["2", 1], ["3", 2]].forEach(([label, column]) => {
  addKey(numpadX + column * (unit + gap), coreY + 3 * (keyHeight + gap), label, 1, 1, "numpad");
});
addKey(numpadX + 3 * (unit + gap), coreY + 3 * (keyHeight + gap), "Enter", 1, 2, "numpad", true);
addKey(numpadX, coreY + 4 * (keyHeight + gap), "0", 2, 1, "numpad");
addKey(numpadX + 2 * (unit + gap), coreY + 4 * (keyHeight + gap), ".", 1, 1, "numpad");

if (keys.length !== 99) {
  throw new Error(`Expected 99 physical keys, generated ${keys.length}`);
}

const escapeXml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function renderKeyMarkup(items) {
  return items.map((key, index) => {
  const width = keyWidth(key.width);
  const height = key.height * keyHeight + (key.height - 1) * gap;
  const fill = key.accent ? "url(#accent)" : "url(#cap)";
  const labelClass = key.label.length > 4 ? "small" : "";
  const legendMarkup = key.label
    ? `\n      <text class="legend ${labelClass}" x="${width / 2}" y="${height / 2 + 1}">${escapeXml(key.label)}</text>`
    : "";
  return `<g class="key ${key.group}" data-key-index="${index + 1}" transform="translate(${key.x} ${key.y})">
      <rect class="key-shadow" x="0" y="3" width="${width}" height="${height}" rx="9"/>
      <rect class="key-wall" width="${width}" height="${height}" rx="9"/>
      <rect class="key-top" x="4" y="4" width="${width - 8}" height="${height - 10}" rx="7" fill="${fill}"/>${legendMarkup}
    </g>`;
  }).join("\n  ");
}

function renderSvg(items, title, description, accentColors) {
  const keyMarkup = renderKeyMarkup(items);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${boardWidth} ${boardHeight}" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">${description}</desc>
  <defs>
    <linearGradient id="case" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#24384c"/><stop offset=".55" stop-color="#15293c"/><stop offset="1" stop-color="#0b1c2d"/></linearGradient>
    <linearGradient id="cap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#aeb8c2"/><stop offset=".42" stop-color="#8694a2"/><stop offset="1" stop-color="#657482"/></linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${accentColors[0]}"/><stop offset=".5" stop-color="${accentColors[1]}"/><stop offset="1" stop-color="${accentColors[2]}"/></linearGradient>
    <filter id="boardShadow" x="-10%" y="-20%" width="120%" height="150%"><feDropShadow dx="0" dy="11" stdDeviation="10" flood-color="#07111b" flood-opacity=".45"/></filter>
  </defs>
  <style>
    .key-shadow { fill: #06111d; opacity: .92; }
    .key-wall { fill: #31485c; stroke: #07131f; stroke-width: 2; }
    .key-top { stroke: rgba(255,255,255,.18); stroke-width: 1; }
    .legend { fill: #f5f7f8; font-family: Arial, sans-serif; font-size: 18px; font-weight: 700; text-anchor: middle; dominant-baseline: middle; paint-order: stroke; stroke: rgba(4,14,24,.45); stroke-width: 1px; }
    .legend.small { font-size: 14px; }
  </style>
  <rect x="4" y="4" width="${boardWidth - 8}" height="${boardHeight - 8}" rx="31" fill="url(#case)" stroke="#496175" stroke-width="4" filter="url(#boardShadow)"/>
  <rect x="15" y="15" width="${boardWidth - 30}" height="${boardHeight - 30}" rx="24" fill="none" stroke="#7590a5" stroke-opacity=".26" stroke-width="2"/>
  ${keyMarkup}
</svg>`;
}

const keys97 = keys.filter((key) => key.group !== "navigation" || key.label === "Home" || key.label === "End");
if (keys97.length !== 97) {
  throw new Error(`Expected 97 physical keys, generated ${keys97.length}`);
}

const svg99 = renderSvg(
  keys,
  "Generic compact 99-key ANSI keyboard",
  "A verified 99-key compact 1800 layout with one alphanumeric block, four navigation keys, one arrow cluster, and one standard numpad.",
  ["#25c8d4", "#0796aa", "#047384"],
);
const svg97 = renderSvg(
  keys97,
  "Generic compact 97-key ANSI keyboard",
  "A verified 97-key compact 1800 layout with one alphanumeric block, two navigation keys, one arrow cluster, and one standard numpad.",
  ["#ffab76", "#e97848", "#bd4f2c"],
);

writeFileSync(output99Path, svg99, "utf8");
writeFileSync(output97Path, svg97, "utf8");
console.log(`Generated ${output97Path} (${keys97.length} physical keys)`);
console.log(`Generated ${output99Path} (${keys.length} physical keys)`);
