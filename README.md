# Creator Blueprint

`creator-blueprint` is the operating system for an AI-assisted, content-first
creator workflow. It owns channel direction, production workflows, platform
profiles, templates, and the working state of each content item.

It does **not** own reusable AI capabilities or durable cross-project knowledge:

- Reusable capability belongs in the sibling `ai-skills` repository.
- Validated, reusable knowledge belongs in the sibling `knowledge-base` repository.
- Drafts, production notes, and publishing state stay here.

## Version 0 scope

Lemon8 carousel posts are the primary implementation target for v0. The core
remains platform-independent so later targets can be added as adapters rather
than forcing a rewrite.

- Channel: Tech
- Pillars: AI/developer workflow and mechanical keyboards
- Primary format: Lemon8 carousel/card post
- Pilot: `content/001-keyboard-layout/`
- Deferred adapters: YouTube, TikTok, Instagram Reels, blog, podcast, and music

Video is deferred, not removed. The existing YouTube experiment and render tools
remain as reference material, but they do not drive v0 complexity.

## Architecture

```text
Idea → Canonical Content → Verification → Platform Adaptation → Production
                                      │
                                      └── Lemon8 (primary v0)
```

Every content item keeps this boundary:

```text
content/<id>-<slug>/
├── core/                 # platform-independent brief, research, narrative
└── outputs/<platform>/   # adaptation, production, package, review state
```

## Repository map

```text
channels/                 Channel identity, editorial rules, and design system
platforms/                Platform behavior profiles; no canonical content
workflows/                Repeatable production processes
templates/core/           Platform-independent starting documents
templates/lemon8/         Lemon8 adaptation and card/package templates
content/<id>-<slug>/       State and artifacts for one content item
assets/ and exports/       Existing production assets and generated exports
```

## Start a Lemon8 content item

1. Create `content/<id>-<slug>/core/` from `templates/core/`.
2. Complete the brief, research, and platform-independent canonical narrative.
3. Pass the verification gate before adapting the content.
4. Follow `workflows/lemon8-carousel.md` and `platforms/lemon8.yaml`.
5. Create `outputs/lemon8/` from `templates/lemon8/`; keep canonical card-facing
   content in `cards.json` and visual plans in `cards/`.
6. Run `npm run validate:lemon8 -- content/<id>-<slug>`; a human must make the
   final editorial decision before the state can become `ready-to-publish`.
7. After publishing, record observations and promote only durable findings to
   the existing `knowledge-base` creator namespace.

Generic repeatable capabilities should continue to come from `ai-skills` (for
example research, verification, adaptation, design review, and analytics review).
This repository has no dependency on `AI-office-agency`.

## Definition of a successful v0

The framework has succeeded when the pilot can move from a sourced canonical
narrative through verification into a complete, rights-reviewed Lemon8 carousel
package without putting Lemon8-specific rules into the core content.
