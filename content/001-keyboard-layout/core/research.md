# Research

Status: `complete`

Research completed: `2026-09-18`

## Research question

แต่ละ keyboard layout มีชุดปุ่มและ trade-off ใดที่ส่งผลต่อ workflow ของผู้ใช้จริง?

## Claim ledger

| ID | Claim | Source | Accessed | Source type | Confidence | Script use |
| --- | --- | --- | --- | --- | --- | --- |
| C-001 | เปอร์เซ็นต์ของ keyboard layout เป็นชื่อกลุ่มโดยประมาณ ไม่ใช่จำนวนปุ่มที่ตายตัว: ในตารางของ Keychron เอง 75% มีตัวอย่าง 82, 84 และ 89 ปุ่ม ขณะที่ 65% มี 67, 68 และ 73 ปุ่ม | [Keychron model comparison](https://www.keychron.com/blogs/news/difference-among-keychron-keyboards) | 2026-09-18 | Primary — manufacturer | High | ใช้เป็น disclaimer ช่วงต้น: ดู physical layout จริงก่อนซื้อ |
| C-002 | ตัวอย่าง full-size ANSI อย่าง Keychron K10 มี 104 ปุ่ม และกว้าง 434.97 มม. ในรุ่นกรอบพลาสติก | [Keychron K10 Version 2](https://www.keychron.com/products/keychron-k10-qmk-via-wireless-mechanical-keyboard-version-2) | 2026-09-18 | Primary — product specification | High for this model | ใช้แสดง baseline ไม่พูดว่า full-size ทุกตัวต้องมี 104 ปุ่ม |
| C-003 | ตัวอย่าง TKL/80% อย่าง Keychron K8 มี 87 ปุ่ม กว้าง 354.17 มม. และยังมี function row, arrow cluster และ navigation keys แบบ dedicated แต่ไม่มี numpad | [Keychron K8 Version 2](https://www.keychron.com/products/keychron-k8-qmk-wireless-mechanical-keyboard-version-2), [Keychron 80% collection guide](https://www.keychron.com/collections/80-layout-keyboards) | 2026-09-18 | Primary — manufacturer | High for model; medium for category wording | เปรียบเทียบกับ full-size โดยโฟกัส numpad ที่หายไป |
| C-004 | 75% โดยทั่วไปยังเก็บ function row และ arrow keys แต่บีบพื้นที่และ navigation cluster ให้ชิดขึ้น; จำนวนปุ่มต่างกันตามรุ่น เช่น Q1 82 ปุ่ม และ K2 Pro 84 ปุ่ม | [Keychron 65% vs 75% guide](https://www.keychron.com/blogs/news/65-vs-75-keyboard), [Keychron model comparison](https://www.keychron.com/blogs/news/difference-among-keychron-keyboards) | 2026-09-18 | Primary — manufacturer | Medium-high | อธิบายว่าได้ปุ่มสำคัญเกือบแบบ TKL แต่เสีย spacing และตำแหน่งที่คุ้นเคยบางส่วน |
| C-005 | ตัวอย่าง 65% อย่าง Keychron K6 มี 68 ปุ่มและ dedicated arrow keys; ไม่มี function row แบบ dedicated แต่เรียก multimedia/function keys ผ่าน key combinations | [Keychron K6](https://www.keychron.com/products/keychron-k6-wireless-mechanical-keyboard) | 2026-09-18 | Primary — product specification | High for this model | เน้นจุดเปลี่ยนสำคัญจาก 75%: F-row ย้ายไป layer แต่ลูกศรยังอยู่ |
| C-006 | ตัวอย่าง 60% อย่าง Keychron K12 มี 61 ปุ่ม; arrow keys, function keys และ multimedia keys ถูกเรียกผ่าน key combinations แทน dedicated keys | [Keychron K12](https://www.keychron.com/products/keychron-k12-wireless-mechanical-keyboard) | 2026-09-18 | Primary — product specification | High for this model | อธิบาย learning cost ของ layer โดยไม่เหมารวมว่า 60% ทุกตัวจัดปุ่มเหมือนกัน |
| C-007 | Firmware อย่าง QMK ใช้ layers เพื่อให้ปุ่มเดียวเข้าถึง keycode อื่นผ่านการกดแบบ momentary, toggle หรือ layer-tap ได้ คล้าย Fn layer บนแล็ปท็อป | [QMK Layers documentation](https://docs.qmk.fm/feature_layers) | 2026-09-18 | Primary — technical documentation | High | อธิบายว่า “ปุ่มหาย” มักหมายถึงไม่ dedicated ไม่ได้แปลว่าฟังก์ชันใช้ไม่ได้ |
| C-008 | กลุ่ม compact full-size/1800 พยายามเก็บ numpad, F-row และ arrows ไว้ แต่ลดช่องว่างหรือบีบ navigation cluster; Keychron K4 เรียก 100 ปุ่มว่า 96% | [Keychron K4 Version 3](https://www.keychron.com/products/keychron-k4-qmk-wireless-mechanical-keyboard-version-3), [Keychron 96% collection guide](https://www.keychron.com/collections/96-layout-keyboards) | 2026-09-18 | Primary — manufacturer | High for model; medium for category wording | แนะนำให้เรียกเป็นกลุ่ม 96%/98%/1800 compact และให้ดูตำแหน่ง nav/numpad จริง |
| C-009 | คำว่า 98% ก็ไม่รับประกันจำนวนปุ่ม: AJAZZ AK980 ระบุ 97 ปุ่ม, GravaStar K98 Pro ระบุ 98 ปุ่ม และ YUNZII YZ98 ระบุ 99 ปุ่ม | [AJAZZ AK980](https://ajazzstore.com/products/ajazz-ak980), [GravaStar K98 Pro](https://www.gravastar.com/products/mercury-k98-pro-mechanical-gaming-keyboard-phantom-black), [YUNZII YZ98](https://www.yunzii.com/products/yunzii-yz98-mechanical-gaming-keyboard) | 2026-09-18 | Primary — product specifications | High | หลักฐานตรงสำหรับคำเตือนว่าอย่าซื้อจากชื่อเปอร์เซ็นต์อย่างเดียว |
| C-010 | ขนาดตัวอย่างแสดง trade-off ของพื้นที่โต๊ะ: K10 full-size กว้าง 434.97 มม., K8 TKL 354.17 มม., K6 65% 313 มม. และ K12 60% 293 มม. แต่เป็นเพียงตัวอย่างรุ่น ไม่ใช่ขนาดมาตรฐานของแต่ละกลุ่ม | [K10](https://www.keychron.com/products/keychron-k10-qmk-via-wireless-mechanical-keyboard-version-2), [K8](https://www.keychron.com/products/keychron-k8-qmk-wireless-mechanical-keyboard-version-2), [K6](https://www.keychron.com/products/keychron-k6-wireless-mechanical-keyboard), [K12](https://www.keychron.com/products/keychron-k12-wireless-mechanical-keyboard) | 2026-09-18 | Primary — product specifications | High for listed models | ใช้ diagram scale แบบ “ตัวอย่าง” เพื่อทำให้พื้นที่ที่ได้คืนมามองเห็นได้ |
| C-011 | การเลือก layout จากกลุ่มปุ่มที่ใช้บ่อยเหมาะสมกว่าการเริ่มจากเปอร์เซ็นต์ เพราะชื่อกลุ่มเดียวกันมีจำนวนและตำแหน่งปุ่มต่างกัน | Inference from C-001, C-004, C-008 and C-009 | 2026-09-18 | Editorial inference | High | เป็น thesis และ decision framework ของคลิป |
| C-012 | ภาพสินค้าจริงของ compact 1800/98% รักษา ANSI typing block ไว้ แล้วใช้พื้นที่ bridge ด้านล่างสำหรับลูกศรก่อนถึง numpad: AULA F99 ใช้ 99 ปุ่ม ส่วน AJAZZ AK980 ใช้ 97 ปุ่มพร้อมจอ/knob ในพื้นที่ด้านขวาบน | [EPOMAKER AULA F99](https://epomaker.com/products/epomaker-aula-f99), [AJAZZ AK980](https://ajazzstore.com/products/ajazz-ak980) | 2026-09-19 | Primary — official product photos and specifications | High for these models | ใช้เป็น geometry reference ของ G-005/G-007; ไม่คัดลอก branding หรือรายละเอียดตกแต่งของสินค้า |
| C-014 | ถ้าป้อนตัวเลขต่อเนื่องบ่อย dedicated numpad ลดการพึ่ง layer; ถ้าแทบไม่ใช้ numpad การตัดออกคืนพื้นที่แนวนอนให้เมาส์และโต๊ะ | Inference from physical key availability and dimensions in C-002, C-003, C-008 and C-010 | 2026-09-18 | Editorial inference | Medium-high | Recommendation ต้องพูดแบบมีเงื่อนไข ไม่อ้างว่า layout ใดเร็วหรือ ergonomic กว่าเสมอ |
| C-013 | สำหรับ developer ประเด็นที่ต้องทดลองจริงคือความถี่ของ F-row, arrows, Home/End, Page Up/Down, Insert/Delete และ numpad รวมถึงความยอมรับต่อ key combinations | Creator validation required | 2026-09-18 | Experience hypothesis | Pending | ใช้เป็น checklist ให้ผู้ชม ไม่ใช้เป็นข้อเท็จจริงจนเจ้าของช่องเติมประสบการณ์จริง |

## Definitions and comparisons

| Layout group | Dedicated groups typically present | Main compromise to explain | Example evidence |
| --- | --- | --- | --- |
| Full-size / 100% | Alphanumeric, F-row, arrows, navigation cluster, numpad | Largest horizontal footprint | K10: 104 keys, 434.97 mm wide |
| 96% / 98% / 1800 compact | Nearly full-size set including numpad, compressed arrangement | Navigation keys and spacing vary substantially | K4: 100 keys at 96%; other 98% examples have 97–99 keys |
| TKL / 80% | Alphanumeric, F-row, arrows, navigation cluster | No dedicated numpad | K8: 87 keys, 354.17 mm wide |
| 75% | Alphanumeric, F-row, arrows, reduced/condensed navigation | Less separation and fewer navigation keys than TKL | Keychron examples: 82 or 84 keys; special variants can differ |
| 65% | Alphanumeric, dedicated arrows, limited navigation | No dedicated F-row or numpad | K6: 68 keys; function access through combinations |
| 60% | Core alphanumeric block; other functions through layers/combinations | Arrows, F-row and navigation may not be dedicated | K12: 61 keys; arrows/functions through combinations |

คำอธิบายในบทควรใช้คำว่า “โดยทั่วไป” และแสดง layout diagram ของรุ่นตัวอย่างเสมอ
เพราะผู้ผลิตสามารถเพิ่ม knob, macro keys, split spacebar หรือจัด navigation cluster ต่างกัน
โดยยังใช้ชื่อเปอร์เซ็นต์เดียวกันได้

## Decision framework for the script

ให้ผู้ชมไล่คำถามตามลำดับนี้ แทนการเริ่มจากคำว่า 60% หรือ 75%:

1. ใช้ numpad ป้อนตัวเลขต่อเนื่องบ่อยแค่ไหน?
2. ต้องกด F1–F12 แบบปุ่มเดี่ยวใน IDE, debugger, เกม หรือโปรแกรมเฉพาะหรือไม่?
3. ใช้ arrows และ navigation keys ใดบ่อย: Home, End, Page Up, Page Down, Insert, Delete?
4. ยอมรับการกด Fn/layer และการเปลี่ยน muscle memory ได้มากเพียงใด?
5. พื้นที่แนวนอนสำหรับเมาส์และการพกพาสำคัญแค่ไหน?
6. ก่อนซื้อ ให้ตรวจภาพ physical layout, keymap/manual และจำนวนปุ่มของรุ่นจริง ไม่ใช้ชื่อเปอร์เซ็นต์อย่างเดียว

## Recommended narrative

1. เปิดด้วย keyboard สองตัวที่ใช้ชื่อ “98%” แต่มีจำนวนปุ่มต่างกัน เพื่อทำลายความเข้าใจว่าเปอร์เซ็นต์คือมาตรฐานตายตัว
2. ตั้ง full-size เป็นแผนที่เริ่มต้น แล้วค่อยไฮไลต์สิ่งที่ถูกตัดหรือบีบเมื่อไป 98/96, TKL, 75, 65 และ 60
3. ทุกครั้งที่ปุ่ม dedicated หาย ให้แสดงว่าฟังก์ชันนั้นหายจริงหรือเพียงย้ายไป layer
4. ปิดด้วย decision tree จาก workflow ของผู้ชม ไม่ประกาศ layout ที่ “ดีที่สุด” เพียงหนึ่งแบบ

## Conflicting evidence or uncertainty

- ไม่มีมาตรฐานเดียวในแหล่งข้อมูลที่ตรวจพบซึ่งผูก 60/65/75/96/98/100% เข้ากับจำนวนปุ่มตายตัว
- 96%, 98% และ 1800 compact ถูกใช้กับแนวคิดใกล้กัน แต่จำนวนปุ่มและตำแหน่ง navigation cluster ต่างกันตามรุ่น
- ANSI/ISO และภาษา keycap เป็นอีกแกนหนึ่งจากเปอร์เซ็นต์ขนาด; อย่าปนสองเรื่องนี้ในคำอธิบาย
- ประโยชน์ด้าน productivity, gaming หรือ ergonomics บนหน้าผู้ผลิตเป็น marketing claims จึงไม่ใช้เป็นหลักฐานว่ากลุ่มใดดีกว่าเสมอ
- คำแนะนำสำหรับ developer ใน C-013 ต้องให้เจ้าของช่องเติมตัวอย่าง workflow จริงก่อนเข้าบท

## Facts requiring a pre-publish freshness check

- ตรวจ product pages อีกครั้งหากบทอ้างชื่อรุ่น, key count หรือขนาดเป็นตัวเลข
- ตรวจว่า URL และคู่มือของรุ่นตัวอย่างยังเข้าถึงได้
- ไม่ต้องอ้างราคา เพราะไม่จำเป็นต่อ viewer promise และเปลี่ยนเร็ว

## Sources considered but not used

- Reddit, forum posts และบทความรีวิวทั่วไป: ใช้เป็น lead ได้แต่ไม่จำเป็นต่อ claim หลัก
- คำกล่าวเชิง “เพิ่ม productivity”, “เหมาะกับ gamer” หรือ “ergonomic” จากหน้าการตลาด: ไม่ใช้เป็นข้อเท็จจริงเชิงสากล
- ประวัติ keyboard layout, switch type, mounting style และ keycap profile: อยู่นอก scope ของคลิป
- รายละเอียดราคา, wireless latency, polling rate, RGB และวัสดุ: ไม่ช่วยตอบคำถามเรื่อง layout
