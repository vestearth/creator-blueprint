import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output99Path = path.join(repoRoot, "assets", "001-keyboard-layout", "keyboard-99-v3.svg");
const output97Path = path.join(repoRoot, "assets", "001-keyboard-layout", "keyboard-97-v3.svg");

const unit = 64;
const gap = 7;
const keyHeight = 62;
const padding = 28;
const topY = padding;
const coreY = topY + keyHeight + 14;
const coreX = padding;
const step = unit + gap;
const coreWidth = 15 * unit + 14 * gap;
// A compact 1800/96% silhouette keeps the ANSI typing block intact. The
// three-key arrow bridge occupies columns 13–15 and the numpad starts at 16.
// This removes the full-size navigation island without shrinking the spacebar.
const numpadX = coreX + 16 * step;
const numpadWidth = 4 * unit + 3 * gap;
const boardWidth = numpadX + numpadWidth + padding;
const boardHeight = coreY + 5 * keyHeight + 4 * gap + padding;

function keyWidth(units) {
  return units * unit + (units - 1) * gap;
}

function addKey(items, x, y, label, width = 1, height = 1, group = "core", accent = false) {
  items.push({ x, y, label, width, height, group, accent });
}

function addRow(items, definitions, y, startX = coreX) {
  let x = startX;
  for (const definition of definitions) {
    const [label, width = 1, group = "core", accent = false] = definition;
    addKey(items, x, y, label, width, 1, group, accent);
    x += keyWidth(width) + gap;
  }
}

function functionKeyX(index) {
  if (index === 0) return coreX;
  if (index <= 4) return coreX + index * step;
  if (index <= 8) return coreX + (index + 0.25) * step;
  if (index <= 12) return coreX + (index + 0.5) * step;
  if (index === 13) return coreX + 14 * step;
  return coreX + (index + 1) * step;
}

function assertValidLayout(items, expectedCount, name) {
  if (items.length !== expectedCount) {
    throw new Error(`${name}: expected ${expectedCount} physical keys, generated ${items.length}`);
  }

  for (const [index, key] of items.entries()) {
    const bounds = {
      left: key.x,
      top: key.y,
      right: key.x + keyWidth(key.width),
      bottom: key.y + key.height * keyHeight + (key.height - 1) * gap,
    };
    if (bounds.left < padding || bounds.top < padding || bounds.right > boardWidth - padding || bounds.bottom > boardHeight - padding) {
      throw new Error(`${name}: key ${index + 1} (${key.label}) falls outside the case`);
    }

    for (let otherIndex = 0; otherIndex < index; otherIndex += 1) {
      const other = items[otherIndex];
      const overlapX = Math.min(bounds.right, other.x + keyWidth(other.width)) - Math.max(bounds.left, other.x);
      const overlapY = Math.min(bounds.bottom, other.y + other.height * keyHeight + (other.height - 1) * gap) - Math.max(bounds.top, other.y);
      if (overlapX > 0.01 && overlapY > 0.01) {
        throw new Error(`${name}: key ${index + 1} (${key.label}) overlaps key ${otherIndex + 1} (${other.label})`);
      }
    }
  }
}

function createKeyboard(functionLabels, expectedCount, name) {
  const items = [];
  for (const [index, label] of functionLabels.entries()) {
    addKey(items, functionKeyX(index), topY, label, 1, 1, "function", index === 0);
  }

  const alphaRows = [
    [["~"], ["1"], ["2"], ["3"], ["4"], ["5"], ["6"], ["7"], ["8"], ["9"], ["0"], ["-"], ["="], ["Back", 2]],
    [["Tab", 1.5], ["Q"], ["W"], ["E"], ["R"], ["T"], ["Y"], ["U"], ["I"], ["O"], ["P"], ["["], ["]"], ["\\", 1.5]],
    [["Caps", 1.75], ["A"], ["S"], ["D"], ["F"], ["G"], ["H"], ["J"], ["K"], ["L"], [";"], ["'"], ["Enter", 2.25, "core", true]],
    [["Shift", 2.25], ["Z"], ["X"], ["C"], ["V"], ["B"], ["N"], ["M"], [","], ["."], ["/"], ["Shift", 1.75]],
    [["Ctrl", 1.25], ["Win", 1.25], ["Alt", 1.25], ["", 6], ["Alt", 1.25], ["Fn"], ["Ctrl"]],
  ];

  alphaRows.forEach((row, index) => addRow(items, row, coreY + index * (keyHeight + gap)));

  // The arrow cluster is integrated into the lower-right edge of the main block.
  addKey(items, numpadX - 2 * step, coreY + 3 * (keyHeight + gap), "↑", 1, 1, "arrow", true);
  [["←", 3], ["↓", 2], ["→", 1]].forEach(([label, stepsFromNumpad]) => {
    addKey(items, numpadX - stepsFromNumpad * step, coreY + 4 * (keyHeight + gap), label, 1, 1, "arrow");
  });

  // Standard 17-key numpad, directly adjacent to the main block.
  [["Num", 0], ["/", 1], ["*", 2], ["-", 3]].forEach(([label, column]) => {
    addKey(items, numpadX + column * step, coreY, label, 1, 1, "numpad");
  });
  [["7", 0], ["8", 1], ["9", 2]].forEach(([label, column]) => {
    addKey(items, numpadX + column * step, coreY + keyHeight + gap, label, 1, 1, "numpad");
  });
  addKey(items, numpadX + 3 * step, coreY + keyHeight + gap, "+", 1, 2, "numpad", true);
  [["4", 0], ["5", 1], ["6", 2]].forEach(([label, column]) => {
    addKey(items, numpadX + column * step, coreY + 2 * (keyHeight + gap), label, 1, 1, "numpad");
  });
  [["1", 0], ["2", 1], ["3", 2]].forEach(([label, column]) => {
    addKey(items, numpadX + column * step, coreY + 3 * (keyHeight + gap), label, 1, 1, "numpad");
  });
  addKey(items, numpadX + 3 * step, coreY + 3 * (keyHeight + gap), "Enter", 1, 2, "numpad", true);
  addKey(items, numpadX, coreY + 4 * (keyHeight + gap), "0", 2, 1, "numpad");
  addKey(items, numpadX + 2 * step, coreY + 4 * (keyHeight + gap), ".", 1, 1, "numpad");

  assertValidLayout(items, expectedCount, name);
  return items;
}

const keys99 = createKeyboard(["Esc", ...Array.from({ length: 12 }, (_, index) => `F${index + 1}`), "Del", "Home", "End", "PgUp", "PgDn"], 99, "99-key compact");
const keys97 = createKeyboard(["Esc", ...Array.from({ length: 12 }, (_, index) => `F${index + 1}`), "Del", "Home", "End"], 97, "97-key compact");

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

function renderStatusPanel() {
  const panelX = coreX + 18 * step;
  const knobX = coreX + 19.35 * step;
  return `<g class="status-panel" aria-label="decorative status panel, not a key">
    <rect x="${panelX}" y="${topY + 3}" width="${keyWidth(1.1)}" height="${keyHeight - 6}" rx="8" fill="#071521" stroke="#6d8293" stroke-width="2"/>
    <path d="M ${panelX + 12} ${topY + 39} L ${panelX + 29} ${topY + 22} L ${panelX + 43} ${topY + 34} L ${panelX + 62} ${topY + 15}" fill="none" stroke="#ff8a54" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${knobX}" cy="${topY + keyHeight / 2}" r="23" fill="#172b3d" stroke="#ff9a68" stroke-width="4"/>
    <circle cx="${knobX}" cy="${topY + keyHeight / 2}" r="8" fill="#ff9a68"/>
  </g>`;
}

function renderSvg(items, title, description, accentColors, decoration = "") {
  const keyMarkup = renderKeyMarkup(items);
  const decorationMarkup = decoration ? `  ${decoration}\n` : "";
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
${decorationMarkup}  ${keyMarkup}
</svg>`;
}

const svg97 = renderSvg(
  keys97,
  "Generic compact 97-key ANSI keyboard",
  "A compact 1800-style 97-key keyboard with the numpad directly adjacent to the main block and the arrow cluster integrated at the lower right.",
  ["#ffab76", "#e97848", "#bd4f2c"],
  renderStatusPanel(),
);
const svg99 = renderSvg(
  keys99,
  "Generic compact 99-key ANSI keyboard",
  "A compact 1800-style 99-key keyboard with the numpad directly adjacent to the main block and the arrow cluster integrated at the lower right.",
  ["#25c8d4", "#0796aa", "#047384"],
);

writeFileSync(output97Path, svg97, "utf8");
writeFileSync(output99Path, svg99, "utf8");
console.log(`Generated ${output97Path} (${keys97.length} physical keys)`);
console.log(`Generated ${output99Path} (${keys99.length} physical keys)`);
