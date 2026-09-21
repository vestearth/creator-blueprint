# Lemon8 Carousel Workflow v0

Lemon8 is the primary v0 adapter. The stages through verification are platform-
independent; Lemon8 decisions begin only at `/adapt`.

## States

`idea → briefed → researching → core-draft → verified → adapting → designing → packaged → ready-for-human-review → ready-to-publish → published → reviewing → learned`

## Workflow

### 1. `/idea`

Turn a rough observation or audience question into a content candidate. Do not
choose card count or visual treatment yet.

Output: candidate recorded in `core/brief.md`, state `idea`.

### 2. `/brief`

Define the objective, target audience, audience promise, original angle, scope, key
questions, and expected Lemon8 deliverable. Confirm a rights-safe production path.

Output: completed `core/brief.md`, state `briefed`.

### 3. `/research`

Collect only the evidence needed for the promise. Record each material claim,
source, access date, source type, confidence, and intended use. Prefer primary
sources for specifications and product behavior.

Output: `core/research.md`, state `researching` then `core-draft`.

### 4. `/script-core`

Write the platform-independent narrative: hook, reasoning order, explanation,
recommendation, caveats, and claim references. Do not split it into cards.

Output: `core/core-script.md`, state `core-draft`.

### 5. `/check` — required verification gate

Follow: `Generate → Evidence → Verify → Human Review → Continue`.

Check factual accuracy, source quality, unsupported claims, originality, rights,
licensing, safety, and time-sensitive facts. Adaptation may begin only after all
material claims are traceable and a human records the verification decision.

Output: `core/verification.md`, state `verified`. A failed or pending decision
returns the item to research or the core draft.

### 6. `/adapt`

Read `platforms/lemon8.yaml`. Decide the post angle, hook, card count, information
density, sequence, summary, CTA, and caption strategy. Preserve claim IDs so facts
remain traceable.

Output: `outputs/lemon8/post.yaml`, state `adapting`.

### 7. `/design`

Apply `channels/tech/design/lemon8.md`. Design the cover and cards as one reading
experience: hierarchy, layout, type, diagrams, callouts, icons, imagery, rhythm,
and card-to-card continuity. Record every asset and usage basis.

Output: canonical render content in `outputs/lemon8/cards.json`, visual plans in
`outputs/lemon8/cards/`, and an asset manifest; state `designing`. The renderer
must not contain card-facing editorial copy.

### 8. `/package`

Prepare title/cover copy, caption, hashtags, card order, export specifications,
metadata, source notes, disclosures, and the pre-publish checklist.

Output: `caption.md` and `package.yaml`, state `packaged` then
`ready-for-human-review`.

After human review, run:

```text
npm run validate:lemon8 -- content/<id>-<slug>
```

Only a passing package may move to `ready-to-publish`. Required checks are
defined centrally in `platforms/lemon8-publish-gates.json`; missing or false
checks are blocking.

### 9. `/publish`

Record the target account, final package version, URL, and exact publication
timestamp. Direct automated publishing is outside v0. If the post was published
but these details were not captured, use `published-metadata-incomplete`; do not
claim a complete `published` state.

Output: updated `package.yaml`, state `published`.

The renderer discovers Chrome, Chromium, or Edge on supported operating systems.
Set `CHROME_PATH` to an explicit browser executable when automatic discovery is
not suitable.

### 10. `/review`

After a meaningful observation window, record reach, saves, shares, comments,
profile actions, card-level drop-off when available, and qualitative feedback.
Avoid conclusions from tiny samples.

Output: `review.md`, state `reviewing`.

### 11. `/learn`

Keep post-specific observations with the item. Promote a finding to the existing
`knowledge-base/creator/` namespace only when evidence suggests it is durable and
reusable. Propose a generic `ai-skill` only after repeated need is demonstrated.

Output: promotion decision in `review.md`, state `learned`.

## Ready-to-publish gate

- The brief names the audience, promise, and original angle.
- Every material claim maps to research evidence.
- Verification is completed before adaptation.
- Each non-original asset has a source and usage basis.
- Cover, cards, and caption deliver the same promise.
- Copyright, disclosure, privacy, and safety checks are complete.
- Phone-size readability and export order are checked.
- A human records the final editorial approval.
