import { test } from "node:test";
import assert from "node:assert/strict";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { MANIFEST_NAME, buildRenderManifest, loadTheme, parsePackageYaml, resolveContent, validateLemon8 } from "./lib/lemon8.mjs";

const realRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ID = "900-fixture";

function png(width, height) {
  const buffer = Buffer.alloc(33);
  Buffer.from("89504e470d0a1a0a0000000d49484452", "hex").copy(buffer, 0);
  buffer.writeUInt32BE(width, 16);
  buffer.writeUInt32BE(height, 20);
  return buffer;
}

const checks = (value = true) => [
  "verification_passed", "card_order_checked", "phone_readability_checked", "source_freshness_checked",
  "rights_checked", "disclosure_checked", "promise_alignment_checked", "rendered_assets_present",
  "human_editorial_approval",
].map(check => `  ${check}: ${value}`).join("\n");

function packageYaml({ state = "ready-for-human-review", publication = "", notes = "", allChecks = true } = {}) {
  return `schema_version: 1
platform: lemon8
state: ${state}
render_data: cards.json
export:
  format: png
  width: 1080
  height: 1440
asset_manifest:
  - id: A-001
    asset: fixture.html
    usage_basis: original
publication:
  target_account: ${publication.includes("account") ? '"@fixture"' : '""'}
  published_at: ${publication.includes("datetime") ? '"2026-10-01T09:30:00+07:00"' : publication.includes("date") ? '"2026-10-01"' : "null"}
  url: ${publication.includes("url") ? '"https://example.com/post"' : "null"}
  package_version: "fixture-v1"
checks:
${checks(allChecks)}
${notes}`;
}

const cards = {
  schema_version: 1,
  theme: "fixture-theme",
  series_label: "SYS/900",
  cards: [
    { order: 1, template: "basic", eyebrow: "E", title: "T", footer: "F", lead: "L", claim_refs: ["C-001"], asset_refs: ["A-001"] },
    { order: 2, template: "basic", eyebrow: "E", title: "T", footer: "F", lead: "L", claim_refs: ["C-002"], asset_refs: ["A-001"] },
  ],
};

function fixture({ pkg = {}, model = cards, verification = "Status: `verified-for-adaptation`\n", render = true } = {}) {
  const root = mkdtempSync(path.join(tmpdir(), "lemon8-"));
  mkdirSync(path.join(root, "platforms"));
  copyFileSync(path.join(realRoot, "platforms", "lemon8-publish-gates.json"), path.join(root, "platforms", "lemon8-publish-gates.json"));
  const themeDir = path.join(root, "channels", "tech", "design", "themes", "fixture-theme");
  mkdirSync(themeDir, { recursive: true });
  writeFileSync(path.join(themeDir, "theme.json"), JSON.stringify({
    name: "fixture-theme", template: "cards.html", canvas: { width: 1080, height: 1440 },
    model_fields: ["series_label"], card_fields: ["order", "template", "eyebrow", "title", "footer", "claim_refs", "asset_refs"],
    templates: { basic: ["lead"] },
  }));
  writeFileSync(path.join(themeDir, "cards.html"), '<link rel="stylesheet" href="tokens.css">__CARD_DATA__');
  writeFileSync(path.join(themeDir, "tokens.css"), ":root{}");

  const item = resolveContent(root, ID);
  mkdirSync(item.lemon8Root, { recursive: true });
  mkdirSync(path.join(item.contentRoot, "core"));
  writeFileSync(path.join(item.contentRoot, "core", "research.md"), "| ID | Claim |\n| --- | --- |\n| C-001 | one |\n| C-002 | two |\n");
  writeFileSync(path.join(item.contentRoot, "core", "verification.md"), verification);
  writeFileSync(item.packagePath, packageYaml(pkg));
  const renderDataPath = path.join(item.lemon8Root, "cards.json");
  writeFileSync(renderDataPath, JSON.stringify(model, null, 2));

  if (render) {
    mkdirSync(item.exportRoot, { recursive: true });
    for (const card of model.cards) writeFileSync(path.join(item.exportRoot, `${ID}-lemon8-0${card.order}.png`), png(1080, 1440));
    const manifest = buildRenderManifest({ repoRoot: root, item, renderDataPath, model, theme: loadTheme(root, model.theme) });
    writeFileSync(path.join(item.exportRoot, MANIFEST_NAME), JSON.stringify(manifest));
  }
  return { root, item, validate: () => validateLemon8({ repoRoot: root, requested: `content/${ID}` }) };
}

const hasError = (result, pattern) => result.errors.some(error => pattern.test(error));

test("parsePackageYaml reads nested maps, scalar lists and lists of maps", () => {
  const parsed = parsePackageYaml(packageYaml({ notes: 'publication_notes:\n  - "URL not captured"\n' }));
  assert.equal(parsed.export.width, 1080);
  assert.deepEqual(parsed.asset_manifest, [{ id: "A-001", asset: "fixture.html", usage_basis: "original" }]);
  assert.deepEqual(parsed.publication_notes, ["URL not captured"]);
  assert.equal(parsed.checks.human_editorial_approval, true);
});

test("a complete pre-publish package passes", () => {
  const result = fixture().validate();
  assert.deepEqual(result.errors, []);
});

test("a false gate blocks a pre-publish package", () => {
  const result = fixture({ pkg: { allChecks: false } }).validate();
  assert.ok(hasError(result, /checks\.human_editorial_approval: must be true/));
});

test("published-metadata-incomplete passes with notes and lists outstanding metadata", () => {
  const result = fixture({
    pkg: { state: "published-metadata-incomplete", publication: "date", notes: 'publication_notes:\n  - "URL not captured"\n' },
  }).validate();
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.outstanding, ["publication.target_account", "publication.url", "publication.published_at time"]);
});

test("published-metadata-incomplete requires a date and an explanation", () => {
  const result = fixture({ pkg: { state: "published-metadata-incomplete" } }).validate();
  assert.ok(hasError(result, /publication\.published_at: record at least/));
  assert.ok(hasError(result, /publication_notes:/));
});

test("published-metadata-incomplete with complete metadata must move to published", () => {
  const result = fixture({
    pkg: { state: "published-metadata-incomplete", publication: "account datetime url", notes: 'publication_notes:\n  - "done"\n' },
  }).validate();
  assert.ok(hasError(result, /set state to published/));
});

test("published states report missing checks as warnings, not errors", () => {
  const result = fixture({ pkg: { state: "published", publication: "account datetime url", allChecks: false } }).validate();
  assert.deepEqual(result.errors.filter(error => error.startsWith("checks.")), []);
  assert.ok(result.warnings.some(warning => /published without this check/.test(warning)));
});

test("published requires an exact publication time", () => {
  const result = fixture({ pkg: { state: "published", publication: "account date url" } }).validate();
  assert.ok(hasError(result, /exact ISO 8601/));
});

test("claim and asset refs must resolve", () => {
  const model = structuredClone(cards);
  model.cards[0].claim_refs = ["C-404"];
  model.cards[1].asset_refs = ["A-404"];
  const result = fixture({ model }).validate();
  assert.ok(hasError(result, /claim_ref C-404 is not in the core\/research\.md claim ledger/));
  assert.ok(hasError(result, /asset_ref A-404 is not in package\.yaml asset_manifest/));
});

test("editing render inputs after rendering makes exports stale", () => {
  const { item, root, validate } = fixture();
  const renderDataPath = path.join(item.lemon8Root, "cards.json");
  writeFileSync(renderDataPath, readFileSync(renderDataPath, "utf8").replace('"title": "T"', '"title": "T2"'));
  writeFileSync(path.join(root, "channels", "tech", "design", "themes", "fixture-theme", "tokens.css"), ":root{--x:1}");
  const result = validate();
  assert.ok(hasError(result, /exports are stale .*content\/900-fixture\/outputs\/lemon8\/cards\.json/));
  assert.ok(hasError(result, /exports are stale .*fixture-theme\/tokens\.css/));
});

test("missing render manifest and wrong PNG size are reported", () => {
  const { item, validate } = fixture({ render: false });
  mkdirSync(item.exportRoot, { recursive: true });
  writeFileSync(path.join(item.exportRoot, `${ID}-lemon8-01.png`), png(1080, 1440));
  writeFileSync(path.join(item.exportRoot, `${ID}-lemon8-02.png`), png(1080, 1350));
  writeFileSync(path.join(item.exportRoot, `${ID}-lemon8-03.png`), png(1080, 1440));
  const result = validate();
  assert.ok(hasError(result, /lemon8-02\.png: 1080x1350 does not match export 1080x1440/));
  assert.ok(hasError(result, /unexpected export not in render_data: 900-fixture-lemon8-03\.png/));

  const sized = fixture({ render: false });
  mkdirSync(sized.item.exportRoot, { recursive: true });
  for (const n of [1, 2]) writeFileSync(path.join(sized.item.exportRoot, `${ID}-lemon8-0${n}.png`), png(1080, 1440));
  assert.ok(hasError(sized.validate(), /render-manifest\.json missing/));
});

test("verification_passed must agree with core/verification.md", () => {
  const result = fixture({ verification: "Status: `evidence-verified-pending-human-review`\n\nDecision: `pending`\n" }).validate();
  assert.ok(hasError(result, /Status is 'evidence-verified-pending-human-review'/));
  assert.ok(hasError(result, /Decision is 'pending'/));
});

test("unknown templates and missing template fields are rejected", () => {
  const model = structuredClone(cards);
  model.cards[0].template = "mystery";
  delete model.cards[1].lead;
  delete model.series_label;
  const result = fixture({ model, render: false }).validate();
  assert.ok(hasError(result, /card 1: unknown template 'mystery'/));
  assert.ok(hasError(result, /card 2 \(basic\): lead is required/));
  assert.ok(hasError(result, /render_data\.series_label: required by theme/));
});
