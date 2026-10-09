# Decision Map — Content #004 Keyboard Switch

Shaping artifact for [vestearth/creator-blueprint#5](https://github.com/vestearth/creator-blueprint/issues/5),
produced with the `decision-wayfinding` skill (ai-skills) as its first dogfood.
This is not a pipeline stage output: it feeds `/brief` and `/research`, and
stops before `/script-core`.

## Route

- Classified 2026-10-09: **borderline, run as wayfinding at the operator's request.**
- Destination and format are clear (the issue defines them), and the pipeline
  already defines execution. What is not clear: several card-level claims are
  unverified, and two editorial decisions (card 7, the numeric comparison
  example) depend on what that research finds. On its own this would fit
  "direct pipeline with a research-gated decision cluster".

## Map

```yaml
destination:
  outcome: >
    Content #004 is decision-complete for /script-core: every claim the issue
    proposes for cards is verified against a primary/current source and
    classified (fact / experience / inference), or explicitly cut or reframed;
    evidence-dependent editorial decisions are locked.
  done_when:
    - "Every R node resolved with source URL + access date, or resolved as 'no primary source found' with the consequence recorded"
    - "D1 and D2 resolved or deferred with a reason"
    - "No fog item blocks a card-level claim"
  v1_boundary: >
    Lemon8 carousel per issue #5 scope. Out: modding/lubing tutorial, brand
    ranking, best-switch lists, keyboard profile (#006), deep acoustics,
    Hall Effect deep dive, architecture changes.
  confirmed_by: "issue #5 body (operator-authored acceptance criteria)"

nodes:
  - id: R1
    type: research
    title: "Linear: no tactile/click event, yet linears differ via force, travel, spring, materials, lube, stem geometry"
    status: resolved
    depends_on: []
    outcome: >
      Supported. Linears remove the bump and click; spring force, pre-travel, total travel, housing/stem materials and lube are named as feel factors (Gateron lists stem geometry as a factor without explaining it). "Linear" describes feel, not loudness.
    evidence:
      - "https://www.gateron.com/blog/detail/gateron-linear-switches"
    resolved_at: 2026-10-09
  - id: R2
    type: research
    title: "Tactile: bump during stroke without requiring an audible click mechanism; bump character varies"
    status: resolved
    depends_on: []
    outcome: >
      Supported. Cherry lists MX ULP Tactile as tactile with no click. Bump position and strength vary by published spec (Akko tactile travel 0.2-0.5 mm; Kailh Box Brown 50 vs Box V2 Brown 75 gf). Bump SHAPE is only manufacturer wording ("crisp", "smooth"): treat as experience, not fact.
    evidence:
      - "https://www.cherry.de/en-us/product/mx-ulp-tactile"
      - "https://akkogear.eu/blogs/news/best-tactile-switches"
      - "https://www.kailh.net/blogs/news/kailh-box-switches-buying-guide"
    resolved_at: 2026-10-09
  - id: R3
    type: research
    title: "Clicky: tactile + audible; click mechanisms differ (click-jacket vs click-bar)"
    status: resolved
    depends_on: []
    outcome: >
      Supported. Cherry describes clicky as tactile + audible (MX Blue, MX ULP Click). Mechanisms differ: Kailh states most clickies use a click jacket while Box clickies use a click bar; Cherry describes MX Blue as a two-part slide striking the stem. Do NOT write "Cherry calls it a click jacket" (only a retailer says so). Clicky force also varies (Kailh Box White 55 / Jade 75 / Navy 95 gf).
    evidence:
      - "https://www.cherry.de/en-us/product/mx-ulp-click"
      - "https://www.cherry.de/en-us/product/mx2a-blue"
      - "https://www.kailh.net/blogs/news/kailh-box-switches-buying-guide"
    resolved_at: 2026-10-09
  - id: R4
    type: research
    title: "Operating force, pre-travel, total travel are distinct specs; one family (KS-33 / G Pro 2.0) spans types with differing values"
    status: resolved
    depends_on: []
    outcome: >
      Supported, re-checked against page HTML by the conductor. Gateron publishes operating force, pre-travel and total travel as separate columns. G Pro 2.0: Red and Silver are both 45 gf but pre-travel 2.0 vs 1.2 mm and total travel 4.0 vs 3.4 mm; Red 45 / Brown 55 / Blue 60 gf in one family. KS-33 LP 2.0 rows are labelled by type only (color mapping unverified). Neither page DEFINES the terms, so definitions on a card are inference/industry usage. Avoid Cherry ULP and MX Blue force numbers: the pages contradict themselves.
    evidence:
      - "https://www.gateron.com/pages/g-pro-20"
      - "https://www.gateron.com/products/gateron-ks-33-low-profile-20-switch-set"
    resolved_at: 2026-10-09
  - id: R5
    type: research
    title: "Switch construction (spring, bump geometry, lube, stem/housing materials) changes feel and sound"
    status: resolved
    depends_on: []
    outcome: >
      Partly supported. Fact: materials change sound (nylon vs PC vs all-POM housings), factory lube mainly buys smoothness/consistency, MX Blue click is a separate mechanism from the bump, linear is not silent. Not verified: bump geometry -> feel mechanism, lube -> sound, stem geometry mechanism. Cards must not claim those as fact. Cross-node: the same Gateron page states the whole system (switch construction, plate, PCB, case, keycaps, typing force) contributes to final sound -> evidence for R6.
    evidence:
      - "https://www.gateron.com/blog/detail/gateron-linear-switches"
      - "https://gateron.com/blog/detail/tactile-mechanical-switches-precision-comfort-solutions"
      - "https://www.cherry.de/en-us/product/mx2a-blue"
    resolved_at: 2026-10-09
  - id: R6
    type: research
    title: "Keyboard system (mount, plate, case, keycaps, foam) changes final sound/feel — primary source needed before a card claims it"
    status: resolved
    depends_on: []
    outcome: >
      Resolved: manufacturer sources, no independent measurement. Gateron states the whole system (switch construction, plate, PCB, case, keycaps, typing force) contributes to final sound (conductor-verified). Keychron states keycap material, thickness and profile change sound (PBT deeper than ABS; conductor-verified) and documents gasket/tray/top mount styles (definitions verified; its feel-by-mount claim not re-checked). Wooting product pages attribute plate (PC, FR4) and foam to sound shaping (agent-reported, not re-checked). No peer-reviewed study isolating plate/case/keycap was found. Consequence: system-level claims are usable as "keyboard makers say ...", not as a measured acoustic fact; no percentages.
    evidence:
      - "https://www.gateron.com/blog/detail/gateron-linear-switches"
      - "https://www.keychron.com/blogs/news/do-keycaps-affect-sound"
      - "https://www.keychron.com/blogs/news/how-to-choose-a-custom-mechanical-keyboard"
      - "https://wooting.io/wooting-80he (agent-reported)"
      - "https://wooting.io/wooting-60he-v2 (agent-reported)"
    resolved_at: 2026-10-09
  - id: R7
    type: research
    title: "Creamy / Thock / Clack: descriptive vocabulary, not a switch type or standardized spec — what can be sourced"
    status: resolved
    depends_on: []
    outcome: >
      Resolved. "Thocky" and "Creamy" are used by Keychron as store categories with only qualitative descriptions; Keychron and Wooting use thock/clack loosely in copy. No standard defining them in measurable terms was found (absence, not proof: inference). Switch spec sheets list force and travel, not sound words. Consequence: present as community/marketing vocabulary for how a sound is perceived, never as a switch type or spec.
    evidence:
      - "https://www.keychron.com/collections/thocky-keyboard"
      - "https://www.keychron.com/collections/creamy-keyboards (agent-reported)"
      - "https://www.keychron.com/blogs/news/do-keycaps-affect-sound"
    resolved_at: 2026-10-09
  - id: D1
    type: decision
    title: "Card 7 (sound vocabulary → keyboard system): keep, reframe, or cut"
    status: resolved
    depends_on: [R6, R7]
    recommendation: >
      Keep, reframed. R6 found manufacturer sources (not measurements), so the
      card attributes system-level claims to keyboard makers and names only the
      verified parts (plate, PCB, case, keycaps, typing force); mount appears as
      part of "build" without its own sound claim. Creamy/Thock/Clack framed per R7.
    outcome: "Keep card 7, reframed as recommended"
    evidence: ["operator choice 2026-10-09 (AskUserQuestion)"]
    resolved_at: 2026-10-09
  - id: D2
    type: decision
    title: "Comparison example: real spec numbers from one family, generic dimensions only, or none"
    status: resolved
    depends_on: [R4]
    recommendation: >
      Use Gateron G Pro 2.0 only: Red vs Silver (same 45 gf, pre-travel 2.0 vs
      1.2 mm) shows force alone does not describe the press; Red 45 / Brown 55 /
      Blue 60 gf shows three types inside one family. Drop KS-33 LP 2.0, which
      the issue suggested: its rows are type-only (color mapping unverified) and
      low profile belongs to #006. Label numbers "as published by Gateron,
      accessed 2026-10-09".
    outcome: "Gateron G Pro 2.0 only; KS-33 dropped"
    evidence: ["operator choice 2026-10-09 (AskUserQuestion)"]
    resolved_at: 2026-10-09
  - id: D3
    type: decision
    title: "Card count and sequence"
    status: deferred
    depends_on: []
    reason: "workflows/lemon8-carousel.md assigns card count to /adapt; deciding it here would pre-empt the pipeline"
  - id: D4
    type: decision
    title: "Hall Effect / magnetic switches: one-line scope note or omit"
    status: resolved
    depends_on: []
    recommendation: "One-line scope note: this post covers mechanical contact switches; magnetic/Hall Effect is a separate topic"
    outcome: "One-line scope note"
    evidence: ["operator choice 2026-10-09 (AskUserQuestion)"]
    resolved_at: 2026-10-09

fog: []

dropped_fog:
  - item: "Whether Thai readers search these as ลีเนียร์/แทคไทล์/คลิกกี้ or English terms"
    reason: "Not a shaping decision: /package owns hashtags and caption search terms (2026-10-09)"
```

## Handoff spec (decision-complete 2026-10-09)

Every node on the path is resolved; D3 is deferred to `/adapt` by the workflow;
no fog remains. Shaping stops here. The next owner is the pipeline itself:
`/brief` → `/research` → `/script-core` → `/check` (human verification gate).

**Locked decisions**

- D1: card 7 stays, reframed. Attribute system-level sound claims to keyboard
  makers ("ผู้ผลิตคีย์บอร์ดเองก็บอกว่า …"), name only plate, PCB, case, keycaps
  and typing force (R6). Mount appears only as part of "build". Creamy / Thock /
  Clack = community and marketing vocabulary for perceived sound, not a type or
  spec (R7). No percentages.
- D2: one comparison family, Gateron G Pro 2.0, numbers labelled "as published by
  Gateron, accessed 2026-10-09": Red vs Silver (45 gf both; pre-travel 2.0 vs
  1.2 mm; total travel 4.0 vs 3.4 mm max) and Red 45 / Brown 55 / Blue 60 gf (R4).
  KS-33 LP 2.0 is not used.
- D4: one-line scope note that magnetic / Hall Effect switches are a separate topic.

**Claim guidance for `/research` (transcribe into the `research.md` ledger;
this map is not a second ledger)**

| Use as fact | Use only as experience / inference | Do not claim |
| --- | --- | --- |
| Linear has no bump or click (R1) | Bump shape: "crisp", "smooth" (R2) | Bump geometry → feel mechanism (R5) |
| Tactile = bump, no click mechanism required (R2) | Feel effect of a heavier/lighter spring (R1) | Lube changes sound (R5) |
| Clicky = tactile + audible; click jacket vs click bar vs Cherry two-part slide (R3) | Gasket mount "feels softer" (R6, unverified by conductor) | "Cherry calls it a click jacket" (R3) |
| Force, pre-travel, total travel are separate published specs (R4) | Definitions of those terms (R4: pages do not define them) | Cherry ULP / MX Blue force numbers (pages contradict themselves) |
| Materials change sound; linear ≠ silent (R5) | "Force alone doesn't define feel" (R4, inference from specs) | Any acoustic percentage (R6) |
| Makers state plate/PCB/case/keycaps change sound (R6) | Creamy/Thock/Clack meanings (R7) | A standard defines thock/creamy (R7) |

**Open risks**

- R6 rests on manufacturer statements, not measurements. `/check` should keep the
  attribution in the copy.
- Wooting and Keychron "creamy" sources are agent-reported, not re-checked by the
  conductor; re-open them during `/research` or drop them.
- Gateron G Pro 2.0 page has a minor internal inconsistency (original G Pro
  White bottom force 58 vs 59 gf); it is not used, but recheck freshness before publish.

**Deferred**: D3 card count and sequence → `/adapt`.

## Checkpoints

```yaml
checkpoint:
  written_at: 2026-10-09
  map: "content/004-keyboard-switch/core/decision-map.md"
  destination: "Content #004 decision-complete for /script-core"
  resolved: [R1, R2, R3, R4, R5, R6, R7, D1, D2, D4]
  findings_to_keep:
    - "R5 → R6 cross-node: the Gateron linear guide is itself the system-level sound source"
    - "R4 changed the route: KS-33 replaced by G Pro 2.0 for the comparison"
  frontier: []
  blocked: []
  fog: []
  next_action: "Run /brief then /research for 004, transcribing the claim guidance above into research.md"
```
