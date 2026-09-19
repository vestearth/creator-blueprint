# Storyboard and Asset Plan

Status: `visual-cut-v1-ready`

Target runtime: `9:15`

Script source: `script.md` status `approved-for-storyboard`

## Visual concept

ใช้ “แผนที่ของปุ่ม” เป็นภาษาภาพหลัก เราจะเริ่มจาก full-size แบบ top-down แล้วค่อย
ลบ บีบ หรือย้ายกลุ่มปุ่มให้เห็นการเปลี่ยนแปลงไปยัง 96/98, TKL, 75%, 65% และ 60%

- ใช้ keyboard diagrams ที่วาดขึ้นใหม่ ไม่มี logo หรือรูปทรงเฉพาะของสินค้า
- ใช้สีประจำกลุ่มปุ่มแบบคงที่ตลอดคลิป
- ให้ motion อธิบายการเปลี่ยนตำแหน่ง ไม่ใช้ animation เพื่อตกแต่งอย่างเดียว
- ตัวเลขจากรุ่นจริงแสดงเป็น “ตัวอย่าง” และมีคำกำกับว่าไม่ใช่มาตรฐานของทั้งกลุ่ม
- ใช้ภาพ 16:9 เป็น master และวางองค์ประกอบสำคัญในพื้นที่ที่ crop เป็น 9:16 ได้

## Key-group color system

| Group | Color role | Includes |
| --- | --- | --- |
| Core typing | Neutral light gray | Alphanumeric and modifiers |
| Function row | Blue | F1–F12 |
| Navigation | Amber | Insert, Delete, Home, End, Page Up, Page Down |
| Arrows | Green | Arrow cluster |
| Numpad | Magenta | Numeric keypad |
| Layer-only function | Purple outline/pulse | Function available through Fn/layer |

Final color values must pass contrast review against the chosen background before export.

## Scene plan

| Scene | Time | Narration beat | Visual and motion | On-screen text | Assets | Usage basis | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S01 | 0:00–0:12 | Keyboard สองตัวใช้ชื่อ 98% เหมือนกัน | Brandless compact-full diagrams สองตัวเลื่อนเข้าคนละฝั่ง | `98% = 97 ปุ่ม?` / `98% = 99 ปุ่ม?` | A-002 | Original diagram derived from sourced facts C-009 | Planned |
| S02 | 0:12–0:35 | เปอร์เซ็นต์ไม่ใช่มาตรฐานตายตัว | เครื่องหมาย `%` ขยายแล้วแตกเป็น label `ชื่อกลุ่มโดยประมาณ` | `อย่าดูแค่เปอร์เซ็นต์` | A-002, G-001 | Original graphic; no third-party imagery | Planned |
| S03 | 0:35–0:55 | คำถามที่ควรถามก่อนเลือก | Keyboard silhouette อยู่กลางจอ ปุ่มที่ไม่ใช้ค่อย ๆ จาง | `ปุ่มไหนที่เราใช้จริง?` | A-001, G-001 | Original diagram and typography | Planned |
| S04 | 0:55–1:15 | แบ่งคีย์บอร์ดเป็นห้ากลุ่ม | Full-size diagram เติมสีทีละกลุ่มตาม legend | `Core · F-row · Navigation · Arrows · Numpad` | A-001, A-003 | Original diagram | Planned |
| S05 | 1:15–1:35 | Full-size เป็นแผนที่ตั้งต้น | Full-size แสดงช่องว่างระหว่างแต่ละ cluster ชัดเจน | `Full-size / 100%` | A-004 | Original generic layout | Planned |
| S06 | 1:35–2:05 | ปุ่มครบ แลกกับพื้นที่แนวนอน | เส้นวัดความกว้างขึ้นใต้ keyboard พร้อมโต๊ะและพื้นที่เมาส์แบบ abstract | `ตัวอย่าง: 104 ปุ่ม · กว้าง ≈ 435 มม.` | A-005, G-002 | Original graphic using C-002; label as example | Planned |
| S07 | 2:05–2:30 | 96/98/1800 เก็บ numpad แล้วบีบ layout | Full-size morph เป็น compact-full; ช่องว่างหดและ nav keys เคลื่อน | `เก็บ Numpad · ลดช่องว่าง` | A-004, M-001 | Original diagram based on category pattern C-008 | Planned |
| S08 | 2:30–3:00 | ชื่อเดียวกันไม่ได้แปลว่าปุ่มเหมือนกัน | วาง compact-full สามแบบ 97/98/99 ปุ่ม แล้ว spotlight ตำแหน่ง nav ที่ต่างกัน | `ดู Physical Layout ของรุ่นจริง` | A-002, A-006 | Original diagrams; counts sourced from C-009 | Planned |
| S09 | 3:00–3:25 | TKL ตัด numpad | Numpad สี magenta แยกออกจาก full-size แล้วพื้นที่ด้านขวาหดเข้ามา | `TKL = Tenkeyless` | A-004, M-002 | Original diagram | Planned |
| S10 | 3:25–3:55 | ได้พื้นที่คืนประมาณ 8 ซม. ในตัวอย่าง | Full-size และ TKL วางบน baseline เดียวกัน พร้อม dimension arrows | `≈ 435 มม. → ≈ 354 มม.` / `คืนพื้นที่ราว 8 ซม.` | A-005 | Original graphic using C-002 and C-003; example qualifier visible | Planned |
| S11 | 3:55–4:20 | 75% เก็บ F-row และ arrows | TKL morph เป็น 75%; gaps หายและ navigation เหลือน้อยลง | `F-row ✓  Arrows ✓  Numpad ✕` | A-004, M-003 | Original generic layout | Planned |
| S12 | 4:20–4:55 | จำนวนและตำแหน่งยังต่างกัน | 75% สองแบบสลับกัน พร้อม ghost outline แสดงตำแหน่งที่ย้าย | `82 ปุ่ม ≠ 84 ปุ่ม` / `ลองตำแหน่งก่อนซื้อ` | A-006 | Original diagrams using C-001 and C-004 | Planned |
| S13 | 4:55–5:20 | 65% ตัด dedicated F-row แต่เก็บ arrows | แถว F สีน้ำเงินยุบเข้า number row เป็น purple layer; arrows สีเขียวยังอยู่ | `F-row → Fn layer` / `Arrows ยังอยู่` | A-004, A-007, M-004 | Original diagram based on C-005 | Planned |
| S14 | 5:20–6:00 | ประเมินต้นทุนของ Fn จาก workflow | UI จำลอง IDE แบบ generic; key chips F5, F10, F11, Home, End, Delete แสดงจำนวนการกด | `เราใช้ปุ่มเหล่านี้บ่อยแค่ไหน?` | A-008, G-001 | Original abstract UI; no software brand or screenshot | Planned |
| S15 | 6:00–6:25 | 60% เหลือแกนหลัก | 65% morph เป็น 60%; arrows และ nav เปลี่ยนจาก solid เป็น purple outline | `60% · Core typing` | A-004, M-005 | Original generic layout | Planned |
| S16 | 6:25–6:50 | ปุ่มไม่หาย แต่อยู่บน layer | มือแบบ abstract กด Fn; key legends เปลี่ยนเป็น arrows และ F1–F12 | `Dedicated key ✕` / `Function ผ่าน Layer ✓` | A-007, G-003 | Original animation based on C-006 and C-007 | Planned |
| S17 | 6:50–7:05 | ขนาดเล็กลง แลกกับ learning curve | Keyboard lineup ตาม scale: 435, 354, 313 และ 293 มม. | `เล็กลง ≠ เหมาะขึ้นเสมอ` | A-005 | Original graphic using C-010; examples clearly labelled | Planned |
| S18 | 7:05–7:25 | เริ่ม decision framework | Decision card เปิดด้วยคำถาม numpad | `1 · เราใช้ Numpad บ่อยไหม?` | A-009 | Original decision graphic | Planned |
| S19 | 7:25–7:40 | ถามเรื่อง F-row | เส้นทางแยก dedicated กับ Fn | `2 · ต้องกด F1–F12 แบบปุ่มเดียวไหม?` | A-009 | Original decision graphic | Planned |
| S20 | 7:40–7:55 | ถามเรื่อง navigation | ปุ่ม Home/End/PgUp/PgDn/Ins/Del เรียงแล้วเลือกเฉพาะที่ใช้ | `3 · Navigation ปุ่มไหนขาดไม่ได้?` | A-009 | Original decision graphic | Planned |
| S21 | 7:55–8:10 | ถามเรื่อง muscle memory | Layer overlay เปิดและปิด พร้อม meter จาก `ไม่อยากจำเพิ่ม` ถึง `ปรับได้เต็มที่` | `4 · เรายอมใช้ Layer แค่ไหน?` | A-007, A-009 | Original graphic | Planned |
| S22 | 8:10–8:25 | ถามเรื่องโต๊ะและการพกพา | Keyboard, mouse และ bag icons เปลี่ยนสัดส่วน | `5 · พื้นที่และการพกพาสำคัญแค่ไหน?` | A-008, A-009 | Original icons and graphic | Planned |
| S23 | 8:25–8:45 | ก่อนซื้อให้ดูรุ่นจริง | Checklist card ซ้อนบน generic product-layout sheet | `ภาพ Layout · Keymap · Manual · จำนวนปุ่ม` | A-006, A-009 | Original checklist; no product screenshot | Planned |
| S24 | 8:45–9:05 | สรุปคำแนะนำแต่ละกลุ่ม | Layout ladder เรียงจาก 100% ถึง 60%; highlight ตามเงื่อนไขทีละแถว | `Numpad → 100/96/98` · `คุ้นมือ → TKL` · `F-row → 75` · `Arrows → 65` · `Layer → 60` | A-010 | Original summary graphic | Planned |
| S25 | 9:05–9:15 | CTA ชวนแชร์ปุ่มที่ขาดไม่ได้ | Layouts รวมเป็นวงรอบข้อความกลาง พร้อม comment icon | `เราใช้ Layout อะไรอยู่?` / `ปุ่มไหนขาดไม่ได้?` | A-011 | Original end card | Planned |

## Asset manifest

| ID | Deliverable | Planned location | Source or creation method | Usage basis | Gate before use |
| --- | --- | --- | --- | --- | --- |
| A-001 | Master full-size keyboard vector | `assets/001-keyboard-layout/keyboard-master.svg` | Drawn in-house from generic key units | Original | Must not trace a branded product image |
| A-002 | 97/98/99-key comparison diagrams | `assets/001-keyboard-layout/compact-full-variants.svg` | Original diagrams informed by C-009 | Original expression; facts cited separately | Keep diagrams generic and label counts as examples |
| A-003 | Five-group legend | `assets/001-keyboard-layout/key-group-legend.svg` | Derived from A-001 | Original | Contrast and color-blind readability check |
| A-004 | Layout family vectors | `assets/001-keyboard-layout/layout-family.svg` | Variants derived from A-001 | Original | Validate visible key groups against research before animation |
| A-005 | Width comparison graphic | `assets/001-keyboard-layout/width-comparison.svg` | Original scale illustration using C-002, C-003 and C-010 | Original expression; factual attribution in description | Show `ตัวอย่าง` on screen; do not imply category standard |
| A-006 | Key-position spotlight overlays | `assets/001-keyboard-layout/key-spotlights.svg` | Derived from layout vectors | Original | Use only positions verified in chosen example diagrams |
| A-007 | Fn/layer animation | `assets/001-keyboard-layout/layer-animation.*` | Animated from original vectors | Original | Match behavior described by C-006 and C-007 |
| A-008 | Workflow and desk icons | `assets/001-keyboard-layout/workflow-icons.svg` | Drawn in-house or from one documented icon library | Original or licensed | Record library URL and license if not original |
| A-009 | Five-question decision graphic | `assets/001-keyboard-layout/decision-framework.svg` | Original diagram from script | Original | Keep text readable on mobile and 9:16 crop |
| A-010 | Layout recommendation ladder | `assets/001-keyboard-layout/layout-ladder.svg` | Derived from A-004 | Original | Use conditional wording; no universal “best” badge |
| A-011 | End card | `assets/001-keyboard-layout/end-card.*` | Original channel graphic | Original | Leave room for YouTube end-screen elements |
| G-001 | Thai/Latin typeface | Project-wide asset location TBD | Choose an OFL or otherwise licensed family | Licensed | Record font name, source URL and license file |
| G-002 | Desk/mouse abstract graphic | `assets/001-keyboard-layout/desk-space.svg` | Drawn in-house | Original | No branded device silhouettes |
| G-003 | Hand/key press graphic | `assets/001-keyboard-layout/key-press.svg` | Drawn in-house or generated as a non-realistic graphic | Original or generated | No real-person likeness; record generation method if used |
| R-001 | TKL reference render | `assets/001-keyboard-layout/reference-tkl-v1.png` | Copied from the owner-provided earlier draft in `import/assets` | Owner-provided | Use only as a generic product illustration; no third-party logo shown |
| R-002 | 75% reference render | `assets/001-keyboard-layout/reference-75-v1.png` | Copied from the owner-provided earlier draft in `import/assets` | Owner-provided | Use only as a generic product illustration; no third-party logo shown |
| G-004 | Full-size keyboard render | `assets/001-keyboard-layout/keyboard-fullsize-v2.png` | OpenAI ImageGen; top-down studio product render, warm ivory/charcoal/orange, guided by R-001/R-002 | Generated | Confirm navigation-cluster alignment; treat legends and key count as illustrative |
| G-005 | Compact-full 97-key example | `assets/001-keyboard-layout/keyboard-97-v3.svg` | Deterministic SVG generated from an explicit 97-key map by `tools/generate-keyboard-99-v3.mjs`; key-count basis C-009 and compact geometry reference C-012 | Original diagram | Generator asserts 97 keys, in-bounds geometry and no overlaps; ANSI block stays intact while arrows occupy the lower bridge before the numpad |
| G-006 | Compact-full 98-key example | `assets/001-keyboard-layout/keyboard-98-v2.png` | OpenAI ImageGen; top-down studio product render, burgundy/cream/coral, guided by R-001/R-002 | Generated | Generic product only; treat legends and key count as illustrative |
| G-007 | Compact-full 99-key example | `assets/001-keyboard-layout/keyboard-99-v3.svg` | Deterministic SVG generated from an explicit 99-key map by `tools/generate-keyboard-99-v3.mjs`; key-count basis C-009 and compact geometry reference C-012 | Original diagram | Generator asserts 99 keys, in-bounds geometry and no overlaps; ANSI block stays intact while arrows occupy the lower bridge before the numpad |
| G-008 | 65% keyboard render | `assets/001-keyboard-layout/keyboard-65-v2.png` | OpenAI ImageGen; top-down studio product render, forest green/cream/amber, guided by R-001/R-002 | Generated | Generic product only; visually confirm arrows and right column before publish |
| G-009 | 60% keyboard render | `assets/001-keyboard-layout/keyboard-60-v2.png` | OpenAI ImageGen; top-down studio product render, silver/lavender/violet, guided by R-001/R-002 | Generated | Generic product only; visually confirm omitted dedicated clusters before publish |
| G-010 | Short-specific 97-key example | `assets/001-keyboard-layout/keyboard-97-short-v4.svg` | Deterministic SVG generated from a dedicated 97-key physical map by `tools/generate-keyboard-99-v3.mjs`; basis C-009/C-012 | Original diagram | Uses a three-key vertical navigation bridge and non-key display/knob; not derived by deleting keys from the 99-key map |
| G-011 | Short-specific 99-key example | `assets/001-keyboard-layout/keyboard-99-short-v4.svg` | Deterministic SVG generated from the AULA F99-style physical map in `tools/generate-keyboard-99-v3.mjs`; basis C-009/C-012 | Original diagram | Uses five navigation keys in the top row; generator asserts 99 keys, bounds and non-overlap |
| F-001 | Noto Sans Thai | npm `@fontsource/noto-sans-thai@5.3.0` | Fontsource package, SIL Open Font License | Licensed | Version locked in `package-lock.json` |
| F-002 | JetBrains Mono | npm `@fontsource/jetbrains-mono@5.3.0` | Fontsource package, SIL Open Font License | Licensed | Version locked in `package-lock.json` |
| M-001–M-005 | Layout morph transitions | Editing project outside Git; path to be recorded | Built from A-004 vectors | Original | Confirm transition matches the narrated removal/movement |
| V-001 | Narration | Not used in `keyboard-layout-master-v1.mp4` | Intentionally omitted after owner review | Not applicable | Do not add synthetic narration without a new owner review |
| B-001 | Background music | `assets/001-keyboard-layout/audio/midnight-jay-someday.m4a`; final mix in `exports/001-keyboard-layout/keyboard-layout-master-v1.mp4` | `Midnight` by Jay Someday; downloaded from the artist's SoundCloud track page on 2026-09-19 | CC BY 3.0 with attribution; full credit block and SHA-256 recorded beside the asset | Loop with two-second crossfades; include the recorded credit block in the YouTube description |
| SFX-001 | Chapter transition sounds | Final mix in `exports/001-keyboard-layout/keyboard-layout-master-v1.mp4` | Procedurally synthesized two-tone cues authored in `tools/render-001-master-v1.mjs` | Original | No third-party recording used |

## Rights and disclosure plan

- Third-party product photos, website screenshots, logos, review footage, and advertisement clips are not planned.
- Manufacturer pages in `research.md` support factual claims; they are not an asset license.
- Keyboard layouts shown on screen use owner-provided references or newly generated, brandless product illustrations.
- Generated keyboard prompts specify a strict top-down orthographic product view, transparent background, realistic switches/keycaps, a distinct palette for each size, and the intended physical clusters; R-001/R-002 supplied the visual-quality reference.
- Do not clone or imitate the voice of another person. Record the narration source and commercial-use terms.
- Choose music, fonts, icons, and sound effects only after their usage basis is documented in this manifest.
- Re-evaluate the platform's synthetic-content disclosure at pre-publish QA; the current plan does not require realistic synthetic people or events.
- Audio production decision recorded on `2026-09-19`: narration was removed after owner review; `Midnight` by Jay Someday is used under CC BY 3.0, and chapter cues remain original procedural audio. No realistic person, cloned voice, or real event is represented.

## Shorts candidates

| Candidate | Source scenes | Hook | Target length |
| --- | --- | --- | --- |
| SH-01 | S01–S02, S08 | `ทำไม Keyboard 98% ถึงมีทั้ง 97 และ 99 ปุ่ม?` | 42 seconds (produced as `keyboard-layout-short-v1.mp4`) |
| SH-02 | S05, S09, S11, S13, S15 | `Keyboard เล็กลงแต่ละขั้น ปุ่มไหนหายไป?` | 35–45 seconds |
| SH-03 | S18–S24 | `ตอบ 5 คำถามนี้ก่อนเลือก Keyboard Layout` | 45–60 seconds |

Shorts must be edited as complete standalone answers, not raw excerpts that depend on the long-form introduction.

## Production gate

Visual pack progress:

- [x] Visual tokens and usage rules documented.
- [x] A-001 master keyboard diagram created and rendered at 1920 × 1080.
- [x] A-004 layout family diagram created and rendered at 1920 × 1080.
- [x] A-005 width comparison created and rendered at 1920 × 1080.
- [x] A-009 decision framework created and rendered at 1920 × 1080.
- [x] Ten-beat browser animatic preview created and visually inspected.
- [x] Twenty-five-scene visual cut v1 created and visually inspected at 1920 × 1080.
- [x] Hallmark 58-gate slop review completed for the fixed 16:9 canvas.
- [x] Owner approved the scene order and visual language.
- [x] Instrumental-only audio was fitted to the 9:15 visual timeline after owner review.
- [x] Typeface, music and SFX are selected with usage records; narration is intentionally omitted.
- [x] Rough animatic and final visual cut confirmed pacing before audio master production.
- [x] Synthetic-content disclosure decision recorded for pre-publish QA.
- [x] SH-01 produced as a standalone 9:16 Short with instrumental music and no narration.

- [ ] Every asset has a final file location and usage basis.
- [ ] Layout diagrams are checked against the claim ledger.
