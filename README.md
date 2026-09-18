# Creator Blueprint

`creator-blueprint` is the operating system for an AI-assisted creator workflow.
It owns channel direction, production workflows, content templates, and the working
state of each content item.

It does **not** own reusable AI capabilities or durable cross-project knowledge:

- Reusable capability belongs in `ai-skills`.
- Validated, reusable knowledge belongs in `knowledge-base`.
- Drafts, production notes, and publishing state stay here.

## Version 0 scope

Version 0 supports one channel and one production path:

- Channel: Tech
- Pillars: AI/developer workflow and mechanical keyboards
- Format: YouTube long-form
- Pilot: `001-keyboard-layout`

Shorts, music, automation, dashboards, and multi-agent orchestration are deferred
until production evidence shows they are needed.

## Repository map

```text
channels/                  Channel identity and editorial constraints
workflows/                 Repeatable production processes
templates/                 Starting documents for each production stage
content/<id>-<slug>/       State and artifacts for a specific content item
```

## Start a content item

1. Copy the relevant files from `templates/` into `content/<id>-<slug>/`.
2. Complete `brief.md` and validate the idea before researching deeply.
3. Follow `workflows/youtube-long-form.md` in order.
4. Keep sources and claim status in `research.md`.
5. Run `qa-checklist.md` before publishing.
6. Complete `analytics-review.md` after enough data has accumulated.
7. Promote only durable, reusable lessons to `knowledge-base`.

## Definition of a successful v0

The framework has succeeded when the pilot can move from idea to published video
without inventing a new process mid-production, and the post-publish review exposes
which parts of the workflow should be changed for the next video.
