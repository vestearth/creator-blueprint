# YouTube Long-form Workflow v0

## States

`idea → validated → researching → scripting → producing → reviewing → scheduled → published → measuring → completed`

## Workflow

### 1. Validate the idea

Input: an audience question or creator observation.

Complete the brief. Continue only when it identifies a specific viewer, a single
viewer promise, an original angle, and a feasible rights-safe visual approach.

Output: `brief.md`, state `validated`.

### 2. Research

Collect only what is required to support the promise. Record each important claim,
source, access date, and confidence. Prefer primary sources.

Output: `research.md`, state `researching` then `scripting`.

### 3. Outline and script

Build the explanation around the viewer's decision or question. The opening should
state why the answer matters; each section should advance that answer.

Output: `script.md`, state `scripting`.

Gate: every material factual claim is traceable, and the conclusion fulfills the
brief without padding.

### 4. Storyboard and asset plan

Map narration to visuals. Record whether each asset is original, generated,
licensed, or used under another documented basis.

Output: `storyboard.md`, state `producing`.

### 5. Produce

Create narration, visuals, edit, captions, title candidates, thumbnail concept,
description, and chapters. Preserve editable source files outside the repository
when binary size makes Git unsuitable; record their location in the storyboard.

Output: review export and publishing package, state `reviewing`.

### 6. Review

Run the QA checklist. Resolve failed checks or document why the video must not be
published yet. The final editorial review must be human.

Output: completed `qa-checklist.md`, state `scheduled`.

### 7. Publish and measure

Record the final URL and packaging. After a meaningful observation window, record
analytics and production lessons. Avoid drawing strong conclusions from tiny
samples.

Output: `analytics-review.md`, states `published → measuring → completed`.

### 8. Learn

Keep video-specific observations here. Promote a lesson to `knowledge-base` only
when it is durable, supported by evidence, and useful beyond this content item.
Propose a reusable `ai-skill` only after the same capability is needed repeatedly.
