# Keyboard Layout Visual System v0

Status: `production-ready-for-animatic`

## Purpose

This visual system supports the first keyboard-layout video with reusable,
brandless diagrams. It is intentionally small: one keyboard language, one color
system, and four core compositions.

## Canvas

- Master frame: `1920 × 1080`, 16:9
- Mobile-safe content area: center `1080 × 1080`
- Outer safe margin: `96 px`
- Background: dark navy gradient with subtle grid; no photographic texture

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| `bg-900` | `#080D19` | Main background |
| `surface-800` | `#121A2B` | Cards and keyboard chassis |
| `surface-700` | `#1C2940` | Neutral keys |
| `text-100` | `#F4F7FB` | Primary text |
| `text-400` | `#9AABC2` | Supporting text |
| `function` | `#4DA3FF` | F-row |
| `navigation` | `#FFB84D` | Navigation cluster |
| `arrows` | `#58D68D` | Arrow cluster |
| `numpad` | `#E879F9` | Numpad |
| `layer` | `#A78BFA` | Fn/layer-only access |
| `danger` | `#FF6B6B` | Removed or caution state |

Color is always paired with a label or icon. Meaning must not rely on color alone.

## Typography

- Preview fallback: `Tahoma, Segoe UI, sans-serif`
- Production target: one Thai/Latin family with a documented commercial-use license
- Headline: bold, short, sentence case
- Labels: medium weight, never smaller than the equivalent of `32 px` at 1080p
- Avoid all caps for Thai copy

The final font asset and license must be recorded before final export.

## Shapes and motion

- Corner radius: `18–28 px` for cards, `8–12 px` for keys
- Stroke: `2–4 px`, low-contrast unless indicating a layer
- Layout transitions: keys move, fade, or collapse from the full-size master
- Layer state: purple outline plus a soft pulse; never use opacity alone
- Recommended transition duration: `350–600 ms`
- Avoid camera shake, fake depth, and photorealistic product styling

## Core assets

| File | Storyboard mapping | Purpose |
| --- | --- | --- |
| `keyboard-master.svg` | S03–S06 | Full-size key-group map |
| `layout-family.svg` | S07–S17, S24 | Compare all six layout groups |
| `width-comparison.svg` | S06, S10, S17 | Show example widths without implying standards |
| `decision-framework.svg` | S18–S24 | Five-question selection flow |
| `animatic-preview.html` | Production gate | Review visual sequence and mobile crop |

## Usage rules

1. Keep every diagram generic; do not trace a branded keyboard or reproduce logos.
2. Display `ตัวอย่าง ไม่ใช่ขนาดมาตรฐาน` whenever model dimensions appear.
3. Display `ตำแหน่งปุ่มต่างกันตามรุ่น` on family comparisons.
4. Preserve the same group colors across every asset and scene.
5. Record any later-added icon, font, music, SFX, or generated image in
   `storyboard.md` before use.
