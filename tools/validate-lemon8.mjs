import { fileURLToPath } from "node:url";
import path from "node:path";
import { validateLemon8 } from "./lib/lemon8.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requested = process.argv[2];

if (!requested) {
  console.error("Usage: npm run validate:lemon8 -- content/<id>-<slug>");
  process.exit(2);
}

const result = validateLemon8({ repoRoot, requested });
if (result.fatal) {
  console.error(result.fatal);
  process.exit(2);
}

const label = path.relative(repoRoot, result.item.contentRoot);
for (const warning of result.warnings) console.warn(`warning: ${warning}`);

if (result.errors.length) {
  console.error(`Lemon8 validation failed for ${label}:`);
  for (const error of result.errors) console.error(`- ${error}`);
  process.exit(1);
}

if (result.state === "published") {
  console.log(`Lemon8 publication record is complete: ${label}`);
} else if (result.state === "published-metadata-incomplete") {
  console.log(`Lemon8 post is published; metadata still outstanding for ${label}:`);
  for (const field of result.outstanding) console.log(`- ${field}`);
} else if (result.state === "ready-to-publish") {
  console.log(`Lemon8 package is ready to publish: ${label}`);
} else {
  console.log(`Lemon8 package passes the publish gates and may move to ready-to-publish: ${label}`);
}
