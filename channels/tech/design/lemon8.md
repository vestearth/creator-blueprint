# Tech Lemon8 Visual System v0

## Direction

Clear technical field notes: calm, diagram-led, specific, and useful. The system
creates family resemblance without forcing every post into an identical layout.

## Canvas and grid

- Working canvas: `1080 × 1440` (3:4), pending a pre-publish platform check.
- Safe margin: `72 px`; keep essential text and marks inside it.
- Grid: 6 columns, `24 px` gutters; base spacing unit `8 px`.
- Typical vertical spacing: `16 / 24 / 32 / 48 / 72 px`.

## Color

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#F4F1E8` | Primary background |
| `ink` | `#111827` | Main text and line work |
| `muted` | `#5F6B7A` | Supporting copy |
| `signal` | `#2457FF` | Primary emphasis and progress |
| `function` | `#2478D4` | F-row |
| `navigation` | `#D98217` | Navigation cluster |
| `arrows` | `#1B8A5A` | Arrow cluster |
| `numpad` | `#A13DB5` | Numpad |
| `layer` | `#6D55C7` | Fn/layer access |
| `warning` | `#C83C3C` | Removed/caution state |

Color must always be paired with a label, shape, or icon.

## Typography

- Thai/Latin production family: Noto Sans Thai (OFL-1.1; bundled dependency).
- Code/key labels: JetBrains Mono (OFL-1.1; bundled dependency).
- Cover headline: 72–92 px, bold, no more than 3 short lines.
- Card headline: 52–64 px, bold.
- Body: 34–40 px with generous line height.
- Labels: at least 28 px. Avoid dense footnotes; move source detail to package notes.

## Reusable compositions

1. **Cover:** short promise + one dominant diagram/object + small series marker.
2. **Explainer:** headline + annotated diagram + up to three takeaways.
3. **Comparison:** aligned columns/rows with one stable comparison axis.
4. **Recommendation:** user need on the left, conditional choice on the right.
5. **Checklist:** numbered decisions with a clear final action.
6. **Recap:** compact decision map + conversation CTA.

## Keyboard-specific treatment

- Use original, brandless keyboard diagrams for category explanations.
- Keep key-group colors stable across every card.
- Show `ตัวอย่าง ไม่ใช่มาตรฐานตายตัว` when using model dimensions/counts.
- Show `ตำแหน่งปุ่มต่างกันตามรุ่น` on category comparisons.
- Prefer real, rights-cleared product photos only for product-specific claims.
- Never use an AI-generated keyboard as evidence of real geometry or features.

## Image and screenshot treatment

- Use a 2 px `ink` border, 20–28 px radius, and a plain caption with source/basis.
- Crop for the claim being made; do not remove context that changes meaning.
- AI imagery is decorative or conceptual and must be recorded as generated.

## Continuity and review

- Put `n/total` in the same corner on cards 2 onward.
- Repeat one visual anchor between adjacent cards when the explanation continues.
- Test every card at phone size and in sequence, not only as isolated artwork.
- Allow a different composition when the content demands it; preserve tokens,
  hierarchy, and semantic colors rather than copying a fixed template.
