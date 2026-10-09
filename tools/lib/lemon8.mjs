import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export const THEMES_DIR = path.join("channels", "tech", "design", "themes");
export const MANIFEST_NAME = "render-manifest.json";
const PUBLISHED_STATES = ["published", "published-metadata-incomplete"];

function scalar(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null" || trimmed === "") return null;
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed);
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

// Parses the subset of YAML used by package.yaml: top-level scalars, and one
// nested level of maps, scalar lists, or lists of flat maps.
export function parsePackageYaml(text) {
  const result = {};
  let section = null;
  let item = null;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const top = line.match(/^([a-z_]+):(?:\s+(.*))?$/i);
    if (top) {
      section = top[2] ? null : top[1];
      item = null;
      result[top[1]] = top[2] ? scalar(top[2]) : null;
      continue;
    }
    if (!section) continue;
    const listEntry = line.match(/^\s{2}-\s+(.*)$/);
    if (listEntry) {
      if (!Array.isArray(result[section])) result[section] = [];
      const pair = listEntry[1].match(/^([a-z_]+):\s+(.*)$/i);
      item = pair ? { [pair[1]]: scalar(pair[2]) } : null;
      result[section].push(item ?? scalar(listEntry[1]));
      continue;
    }
    const itemField = line.match(/^\s{4}([a-z_]+):\s*(.*)$/i);
    if (item && itemField) {
      item[itemField[1]] = scalar(itemField[2]);
      continue;
    }
    const field = line.match(/^\s{2}([a-z_]+):\s*(.*)$/i);
    if (field) {
      if (result[section] === null) result[section] = {};
      result[section][field[1]] = scalar(field[2]);
    }
  }
  return result;
}

export function sha256(file) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

export function pngSize(file) {
  const buffer = readFileSync(file);
  const signature = "89504e470d0a1a0a";
  if (buffer.length < 24 || buffer.subarray(0, 8).toString("hex") !== signature) return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

const isPresent = value =>
  value !== undefined && value !== null && value !== "" && !(Array.isArray(value) && value.length === 0);

const toPosix = file => file.split(path.sep).join("/");

export function resolveContent(repoRoot, requested) {
  const contentRoot = path.resolve(repoRoot, requested.includes("/") ? requested : path.join("content", requested));
  const contentId = path.basename(contentRoot);
  const lemon8Root = path.join(contentRoot, "outputs", "lemon8");
  return {
    contentRoot,
    contentId,
    lemon8Root,
    packagePath: path.join(lemon8Root, "package.yaml"),
    exportRoot: path.join(repoRoot, "exports", contentId, "lemon8"),
    assetRoot: path.join(repoRoot, "assets", contentId),
  };
}

export function loadTheme(repoRoot, name) {
  const dir = path.join(repoRoot, THEMES_DIR, name ?? "");
  const specPath = path.join(dir, "theme.json");
  if (!name || !existsSync(specPath)) return null;
  const spec = JSON.parse(readFileSync(specPath, "utf8"));
  return { dir, specPath, spec, templatePath: path.join(dir, spec.template) };
}

export function exportName(contentId, card) {
  return `${contentId}-lemon8-${String(card.order).padStart(2, "0")}.png`;
}

// Errors that make a card model unrenderable with its theme.
export function checkModel(model, theme) {
  const errors = [];
  if (!Array.isArray(model.cards) || model.cards.length === 0) {
    return ["render_data.cards: must contain at least one card"];
  }
  for (const field of theme.spec.model_fields ?? []) {
    if (!isPresent(model[field])) errors.push(`render_data.${field}: required by theme ${theme.spec.name}`);
  }
  model.cards.forEach((card, index) => {
    const label = `card ${index + 1}`;
    if (card.order !== index + 1) errors.push(`${label}: order must be ${index + 1}`);
    const templateFields = theme.spec.templates[card.template];
    if (!templateFields) {
      errors.push(`${label}: unknown template '${card.template ?? "missing"}' for theme ${theme.spec.name}`);
      return;
    }
    for (const field of [...theme.spec.card_fields, ...templateFields]) {
      if (!isPresent(card[field])) errors.push(`${label} (${card.template}): ${field} is required`);
    }
  });
  return errors;
}

// Every file whose content can change the rendered PNGs.
export function renderInputs(repoRoot, item, renderDataPath, model, theme) {
  const inputs = new Set([renderDataPath, theme.specPath, theme.templatePath]);
  const template = readFileSync(theme.templatePath, "utf8");
  for (const [, href] of template.matchAll(/<link[^>]+href="([^"]+\.css)"/g)) {
    inputs.add(path.resolve(theme.dir, href));
  }
  for (const card of model.cards ?? []) {
    for (const asset of card.assets ?? []) inputs.add(path.join(item.assetRoot, asset));
  }
  return [...inputs].map(file => ({ file, key: toPosix(path.relative(repoRoot, file)) }));
}

export function buildRenderManifest({ repoRoot, item, renderDataPath, model, theme, extra = {} }) {
  const inputs = {};
  for (const { file, key } of renderInputs(repoRoot, item, renderDataPath, model, theme)) {
    inputs[key] = existsSync(file) ? sha256(file) : null;
  }
  const outputs = {};
  for (const card of model.cards) {
    const name = exportName(item.contentId, card);
    outputs[name] = sha256(path.join(item.exportRoot, name));
  }
  return { schema_version: 1, content_id: item.contentId, theme: theme.spec.name, ...extra, inputs, outputs };
}

function checkExports({ repoRoot, item, pkg, renderDataPath, model, theme }) {
  const errors = [];
  const expected = model.cards.map(card => exportName(item.contentId, card));
  for (const name of expected) {
    const file = path.join(item.exportRoot, name);
    if (!existsSync(file)) {
      errors.push(`rendered asset missing: ${name}`);
      continue;
    }
    const size = pngSize(file);
    const width = pkg.export?.width;
    const height = pkg.export?.height;
    if (!size) errors.push(`${name}: not a PNG file`);
    else if (width && height && (size.width !== width || size.height !== height)) {
      errors.push(`${name}: ${size.width}x${size.height} does not match export ${width}x${height}`);
    }
  }
  if (existsSync(item.exportRoot)) {
    const pattern = new RegExp(`^${item.contentId}-lemon8-\\d+\\.png$`);
    for (const name of readdirSync(item.exportRoot)) {
      if (pattern.test(name) && !expected.includes(name)) errors.push(`unexpected export not in render_data: ${name}`);
    }
  }
  if (errors.length || !theme) return errors;

  const rerender = `run npm run render:lemon8 -- ${item.contentId}`;
  const manifestPath = path.join(item.exportRoot, MANIFEST_NAME);
  if (!existsSync(manifestPath)) return [`exports: ${MANIFEST_NAME} missing; ${rerender}`];
  const recorded = JSON.parse(readFileSync(manifestPath, "utf8"));
  const current = buildRenderManifest({ repoRoot, item, renderDataPath, model, theme });
  const changed = Object.keys({ ...recorded.inputs, ...current.inputs })
    .filter(key => recorded.inputs?.[key] !== current.inputs[key]);
  if (changed.length) errors.push(`exports are stale (changed since render: ${changed.join(", ")}); ${rerender}`);
  const replaced = Object.keys(current.outputs).filter(name => recorded.outputs?.[name] !== current.outputs[name]);
  if (replaced.length) errors.push(`exports do not match the recorded render: ${replaced.join(", ")}; ${rerender}`);
  return errors;
}

function ledgerIds(file) {
  return new Set([...readFileSync(file, "utf8").matchAll(/^\|\s*([A-Z]+-\d+)\s*\|/gm)].map(match => match[1]));
}

function checkTraceability({ item, pkg, model }) {
  const errors = [];
  const researchPath = path.join(item.contentRoot, "core", "research.md");
  const claims = existsSync(researchPath) ? ledgerIds(researchPath) : null;
  if (!claims) errors.push("core/research.md: not found; claim_refs cannot be traced");
  const assets = new Set((Array.isArray(pkg.asset_manifest) ? pkg.asset_manifest : []).map(asset => asset?.id));
  model.cards.forEach((card, index) => {
    for (const ref of card.claim_refs ?? []) {
      if (claims && !claims.has(ref)) errors.push(`card ${index + 1}: claim_ref ${ref} is not in the core/research.md claim ledger`);
    }
    for (const ref of card.asset_refs ?? []) {
      if (!assets.has(ref)) errors.push(`card ${index + 1}: asset_ref ${ref} is not in package.yaml asset_manifest`);
    }
  });
  return errors;
}

function checkVerificationRecord({ item, pkg }) {
  if (pkg.checks?.verification_passed !== true) return [];
  const file = path.join(item.contentRoot, "core", "verification.md");
  if (!existsSync(file)) return ["checks.verification_passed is true but core/verification.md is missing"];
  const text = readFileSync(file, "utf8");
  const status = text.match(/^Status:\s*`([^`]+)`/m)?.[1];
  const decision = text.match(/^Decision:\s*`([^`]+)`/m)?.[1];
  const errors = [];
  if (!status || /pending|fail/i.test(status)) {
    errors.push(`checks.verification_passed is true but core/verification.md Status is '${status ?? "missing"}'`);
  }
  if (decision && /pending|fail|reject/i.test(decision)) {
    errors.push(`checks.verification_passed is true but core/verification.md Decision is '${decision}'`);
  }
  return errors;
}

function checkPublication(pkg, gate) {
  const errors = [];
  const outstanding = [];
  const publication = pkg.publication ?? {};
  const missing = gate.publication_required_fields.filter(field => !isPresent(publication[field]));
  const publishedAt = publication.published_at;
  const exactTime = typeof publishedAt === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(publishedAt);

  if (pkg.state === "published") {
    for (const field of missing) errors.push(`publication.${field}: required for published content`);
    if (isPresent(publishedAt) && !exactTime) {
      errors.push("publication.published_at: use an exact ISO 8601 date and time, not a date alone");
    }
    return { errors, outstanding };
  }

  if (!isPresent(publishedAt)) errors.push("publication.published_at: record at least the publication date");
  if (!Array.isArray(pkg.publication_notes) || pkg.publication_notes.length === 0) {
    errors.push("publication_notes: explain which publication metadata is missing and why");
  }
  outstanding.push(...missing.filter(field => field !== "published_at").map(field => `publication.${field}`));
  if (isPresent(publishedAt) && !exactTime) outstanding.push("publication.published_at time");
  if (!errors.length && !outstanding.length) {
    errors.push("publication metadata is complete; set state to published");
  }
  return { errors, outstanding };
}

export function validateLemon8({ repoRoot, requested }) {
  const item = resolveContent(repoRoot, requested);
  if (!existsSync(item.packagePath)) {
    return { item, fatal: `Lemon8 package not found: ${item.packagePath}` };
  }
  const gate = JSON.parse(readFileSync(path.join(repoRoot, "platforms", "lemon8-publish-gates.json"), "utf8"));
  const pkg = parsePackageYaml(readFileSync(item.packagePath, "utf8"));
  const errors = [];
  const warnings = [];
  let outstanding = [];
  const published = PUBLISHED_STATES.includes(pkg.state);

  if (!gate.states.includes(pkg.state)) errors.push(`state: unsupported value '${pkg.state ?? "missing"}'`);

  for (const check of gate.publish_required_checks) {
    if (pkg.checks?.[check] === true) continue;
    const message = `checks.${check}: must be true (found ${String(pkg.checks?.[check] ?? "missing")})`;
    if (published) warnings.push(`${message}; the post was published without this check`);
    else errors.push(message);
  }
  errors.push(...checkVerificationRecord({ item, pkg }));

  const renderDataPath = path.resolve(item.lemon8Root, pkg.render_data || "cards.json");
  let model;
  if (!existsSync(renderDataPath)) errors.push(`render_data: file not found (${renderDataPath})`);
  else {
    try {
      model = JSON.parse(readFileSync(renderDataPath, "utf8"));
    } catch (error) {
      errors.push(`render_data: invalid JSON (${error.message})`);
    }
  }

  if (model) {
    const theme = loadTheme(repoRoot, model.theme);
    if (!theme) errors.push(`render_data.theme: no theme.json for '${model.theme ?? "missing"}' under ${THEMES_DIR}`);
    const modelErrors = theme ? checkModel(model, theme) : [];
    errors.push(...modelErrors);
    if (Array.isArray(model.cards) && model.cards.length) {
      errors.push(...checkTraceability({ item, pkg, model }));
      errors.push(...checkExports({ repoRoot, item, pkg, renderDataPath, model, theme: modelErrors.length ? null : theme }));
    }
  }

  if (published) {
    const publication = checkPublication(pkg, gate);
    errors.push(...publication.errors);
    outstanding = publication.outstanding;
  }

  return { item, state: pkg.state, errors, warnings, outstanding };
}
