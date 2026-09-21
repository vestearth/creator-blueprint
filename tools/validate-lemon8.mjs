import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requested = process.argv[2];

if (!requested) {
  console.error("Usage: npm run validate:lemon8 -- content/<id>-<slug>");
  process.exit(2);
}

const contentRoot = path.resolve(repoRoot, requested);
const lemon8Root = path.join(contentRoot, "outputs", "lemon8");
const packagePath = path.join(lemon8Root, "package.yaml");
const gatePath = path.join(repoRoot, "platforms", "lemon8-publish-gates.json");
const errors = [];

function scalar(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null" || trimmed === "") return null;
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseKnownYaml(text) {
  const result = {};
  let section = null;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const top = line.match(/^([a-z_]+):(?:\s*(.*))?$/i);
    if (top) {
      section = top[2] ? null : top[1];
      result[top[1]] = top[2] ? scalar(top[2]) : {};
      continue;
    }
    const nested = line.match(/^\s{2}([a-z_]+):\s*(.*)$/i);
    if (section && nested) result[section][nested[1]] = scalar(nested[2]);
  }
  return result;
}

if (!existsSync(packagePath)) {
  console.error(`Lemon8 package not found: ${packagePath}`);
  process.exit(2);
}

const gate = JSON.parse(readFileSync(gatePath, "utf8"));
const pkg = parseKnownYaml(readFileSync(packagePath, "utf8"));
const renderDataName = pkg.render_data || "cards.json";
const renderDataPath = path.resolve(lemon8Root, renderDataName);

if (!gate.states.includes(pkg.state)) {
  errors.push(`state: unsupported value '${pkg.state ?? "missing"}'`);
}

for (const check of gate.publish_required_checks) {
  if (pkg.checks?.[check] !== true) {
    errors.push(`checks.${check}: must be true (found ${String(pkg.checks?.[check] ?? "missing")})`);
  }
}

let model;
if (!existsSync(renderDataPath)) {
  errors.push(`render_data: file not found (${renderDataPath})`);
} else {
  try {
    model = JSON.parse(readFileSync(renderDataPath, "utf8"));
  } catch (error) {
    errors.push(`render_data: invalid JSON (${error.message})`);
  }
}

if (model) {
  if (!Array.isArray(model.cards) || model.cards.length === 0) {
    errors.push("render_data.cards: must contain at least one card");
  } else {
    model.cards.forEach((card, index) => {
      const expectedOrder = index + 1;
      if (card.order !== expectedOrder) errors.push(`card ${expectedOrder}: order must be ${expectedOrder}`);
      if (!card.title) errors.push(`card ${expectedOrder}: title is required`);
      if (!Array.isArray(card.claim_refs) || card.claim_refs.length === 0) errors.push(`card ${expectedOrder}: claim_refs are required`);
      if (!Array.isArray(card.asset_refs) || card.asset_refs.length === 0) errors.push(`card ${expectedOrder}: asset_refs are required`);
    });

    const contentId = path.basename(contentRoot);
    const exportRoot = path.join(repoRoot, "exports", contentId, "lemon8");
    for (const card of model.cards) {
      const filename = `${contentId}-lemon8-${String(card.order).padStart(2, "0")}.png`;
      if (!existsSync(path.join(exportRoot, filename))) errors.push(`rendered asset missing: ${filename}`);
    }
  }
}

if (["published", "published-metadata-incomplete"].includes(pkg.state)) {
  for (const field of gate.publication_required_fields) {
    const value = pkg.publication?.[field];
    if (value === null || value === undefined || value === "") {
      errors.push(`publication.${field}: required for published content`);
    }
  }
  const publishedAt = pkg.publication?.published_at;
  if (publishedAt && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(publishedAt)) {
    errors.push("publication.published_at: use an exact ISO 8601 date and time, not a date alone");
  }
}

if (errors.length) {
  console.error(`Lemon8 validation failed for ${path.relative(repoRoot, contentRoot)}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Lemon8 package is ready to publish: ${path.relative(repoRoot, contentRoot)}`);
