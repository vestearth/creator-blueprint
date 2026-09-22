# Research

Status: `complete-pending-human-verification`

Research completed: `2026-09-21`; MCP claims refreshed: `2026-09-22`

## Research question

องค์ประกอบใดทำให้ระบบ AI ทำงานแบบ Agent แทนที่จะเป็นเพียงการตอบ prompt และ
ความซับซ้อนนี้เหมาะกับงานประเภทใด?

## Claim ledger

| ID | Claim | Source | Accessed | Source type | Confidence | Intended use |
| --- | --- | --- | --- | --- | --- | --- |
| C-001 | คำว่า “Agent” ไม่มีนิยามเดียวที่ทุกฝ่ายใช้เหมือนกัน; Anthropic แยก workflow ที่เดินตาม code path ที่กำหนดไว้ ออกจาก agent ที่ให้ LLM กำกับกระบวนการและการใช้เครื่องมือแบบยืดหยุ่น | [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 2026-09-21 | Primary — vendor engineering guidance | High | วาง caveat ว่าโพสต์ใช้นิยามเชิงปฏิบัติ ไม่ประกาศมาตรฐานสากล |
| C-002 | เอกสาร OpenAI อธิบายว่า Agent สามารถวางแผนและทำงานให้เสร็จโดยใช้ tools ทำงานกับ agent อื่น และรักษา context ข้ามขั้น | [OpenAI — Agents](https://developers.openai.com/api/docs/guides/agents) | 2026-09-21 | Primary — official documentation | High | นิยามแกนของ Agent และ card เปรียบเทียบ |
| C-003 | ตัวเลือก runtime ของ OpenAI แยกการเรียก model โดยตรงออกจาก runtime ที่จัดการ agent loop, tools, workflows และ state แสดงว่าตัว model/prompt ไม่ใช่ระบบ Agent ทั้งหมด | [OpenAI — Agents](https://developers.openai.com/api/docs/guides/agents), [OpenAI — Agents SDK](https://developers.openai.com/api/docs/guides/agents/sdk) | 2026-09-21 | Primary — official documentation | High | รองรับ thesis “Prompt เก่ง ≠ Agent” |
| C-004 | ผลลัพธ์ของ agent run อาจรวม history, continuation ID, interruptions และ resumable state ไม่ได้มีเพียง final answer | [OpenAI — Results and state](https://developers.openai.com/api/docs/guides/agents/results) | 2026-09-21 | Primary — official documentation | High | อธิบาย state/memory และการกลับมาทำต่อ |
| C-005 | Agent ที่กำลังทำงานต้องรับผลจริงจาก environment เช่นผล tool call หรือ code execution เพื่อประเมินความคืบหน้า และมักมีเงื่อนไขหยุดหรือจุดขอ human feedback | [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 2026-09-21 | Primary — vendor engineering guidance | High | วาด loop `Act → Observe → Verify → Continue/Stop` |
| C-006 | Agentic systems แลก latency และ cost กับความสามารถในงานที่ซับซ้อนขึ้น; หลายงานใช้ single LLM call พร้อม retrieval/examples ก็เพียงพอ และควรเพิ่มความซับซ้อนเมื่อจำเป็น | [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 2026-09-21 | Primary — vendor engineering guidance | High | การ์ด “เมื่อไรไม่ต้องใช้ Agent” |
| C-007 | Agent เหมาะกับโจทย์ปลายเปิดที่คาดจำนวนขั้นตอนไม่ได้หรือ hardcode เส้นทางตายตัวได้ยาก ขณะที่ workflow แบบกำหนดไว้เหมาะกับงานที่ต้องการความคาดเดาได้และสม่ำเสมอ | [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 2026-09-21 | Primary — vendor engineering guidance | High | เงื่อนไขเลือกใช้ Agent โดยไม่เหมารวม |
| C-008 | MCP server primitives ใน spec `2026-07-28` คือ Prompts, Resources และ Tools; Tasks อยู่ใน extensions framework ไม่ใช่ workflow primitive | [MCP 2026-07-28 — Server Features](https://modelcontextprotocol.io/specification/2026-07-28/server/index), [MCP — 2026-07-28 release](https://blog.modelcontextprotocol.io/posts/2026-07-28/) | 2026-09-22 | Primary — protocol specification and official release note | High | การ์ดสะพานใช้ RESOURCES / TOOLS / PROMPTS |
| C-009 | MCP `2026-07-28` มี authorization capabilities ระดับ transport สำหรับ HTTP และ authorization เป็น optional; MCP ยังไม่ใช่ Agent runtime และ application ต้องออกแบบ permission/verification ในระดับของตนเอง | [MCP 2026-07-28 — Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization), [MCP — 2026-07-28 release](https://blog.modelcontextprotocol.io/posts/2026-07-28/) | 2026-09-22 | Primary — protocol specification and official release note; final clause is scoped inference | High | แยก protocol authorization ออกจาก application-level control |
| C-010 | “Prompt กำหนดทิศ ส่วน tools, state และ feedback loop ทำให้งานเดินหน้า” เป็นการสังเคราะห์จากความต่างระหว่าง direct model response กับ agent runtime, state, tool use และ environmental feedback | Inference from C-002–C-005 | 2026-09-21 | Editorial inference | High | Thesis หลักและ cover promise |
| C-011 | ตัวอย่าง “หาข้อมูลแล้วทำรายงาน” สามารถแยกเป็น chat ที่ให้แนวทาง/ร่างจาก context ที่ส่งมา กับ agent ที่ค้นแหล่งข้อมูล บันทึกหลักฐาน สร้างไฟล์ ตรวจผล และวนแก้ตามเงื่อนไข | Editorial example derived from C-002–C-005 | 2026-09-21 | Editorial example/inference | Medium-high | การ์ดตัวอย่าง; ต้องไม่อ้างว่าทุกผลิตภัณฑ์ทำได้เหมือนกัน |
| C-012 | Verification และ human review ควรเป็นส่วนของ workflow โดยเฉพาะก่อนการกระทำที่มีผลข้างเคียง; OpenAI แยก guardrails/human review และ resumable approval state เป็นความสามารถของ runtime | [OpenAI — Agents SDK](https://developers.openai.com/api/docs/guides/agents/sdk), [OpenAI — Results and state](https://developers.openai.com/api/docs/guides/agents/results) | 2026-09-21 | Primary — official documentation | High | วาง verification เป็นองค์ประกอบ ไม่สื่อว่า Agent ควรทำทุกอย่างเอง |

## Definitions and comparisons

### Terms used in this content

- **Model:** ตัวสร้าง/ตีความข้อความและตัดสินใจจาก input ตามความสามารถของโมเดล
- **Chat assistant:** ประสบการณ์ถาม–ตอบที่เน้นตอบ turn ปัจจุบัน อาจมี context และ
  tools ได้ แต่การมีหน้าตาเป็นแชตเพียงอย่างเดียวไม่ได้บอกว่าเป็น Agent หรือไม่
- **Agent:** ในโพสต์นี้หมายถึงระบบที่รับ goal แล้วเลือกขั้นถัดไป ใช้ context/tools,
  สังเกตผล เก็บสถานะ ตรวจสอบ และทำต่อหรือหยุดตามเงื่อนไข
- **Tool:** ช่องทางให้ระบบค้นข้อมูล เรียก function ใช้ไฟล์ รันโค้ด หรือทำ action
- **State/memory:** ข้อมูลที่ทำให้ระบบรู้ว่างานทำถึงไหนและอะไรต้องส่งต่อข้ามขั้น/รอบ
- **Workflow/orchestration:** กติกาและ runtime ที่จัดลำดับงาน การวนซ้ำ approval และ stopping condition
- **MCP:** มาตรฐานการเชื่อมต่อที่ expose Resources, Tools และ Prompts; ไม่ใช่ Agent runtime

### Practical comparison

| Dimension | Chat-style interaction | Agent-style system |
| --- | --- | --- |
| Input | คำถามหรือ instruction ของ turn | Goal และเงื่อนไขความสำเร็จ |
| Typical path | Prompt → response | Decide → act → observe → verify → continue/stop |
| External action | ไม่มี หรือเรียก tool เป็นครั้ง ๆ | Tools/actions เป็นส่วนของ workflow |
| State | Conversation context เท่าที่ระบบมี | เก็บความคืบหน้า ผลลัพธ์ และสถานะสำหรับทำต่อ |
| Control | ผู้ใช้มักเป็นคนสั่งทีละรอบ | Runtime/model ช่วยเลือก next step ภายใต้ข้อจำกัด |
| Verification | ผู้ใช้ตรวจคำตอบ | วาง check/approval/evaluation ใน loop ได้ |

คำว่า “Chat ทั่วไป” ในโพสต์หมายถึง interaction แบบที่จบเป็นรอบ ไม่ใช่ข้อจำกัดของ
ผลิตภัณฑ์แชตสมัยใหม่ซึ่งอาจมี tools หรือพฤติกรรมแบบ agentic ได้ เส้นแบ่งจึงอยู่ที่
workflow ของระบบ ไม่ใช่ชื่อแอปหรือหน้าตา UI

## Conflicting evidence or uncertainty

- นิยาม Agent แตกต่างกันระหว่างผู้ให้บริการและงานวิจัย จึงใช้คำว่า “ในโพสต์นี้”
  และอธิบายพฤติกรรมแทนการอ้างนิยามตายตัว
- Chat assistant บางตัวมี web search, file tools, memory หรือ background execution;
  การ์ดเปรียบเทียบเป็น mental model ไม่ใช่ตาราง feature ของผลิตภัณฑ์ใด
- Memory อาจหมายถึง conversation history, durable memory หรือ resumable task state;
  โพสต์ใช้คำว่า `state / memory` และเน้น “งานทำถึงไหน” เพื่อเลี่ยงการเหมารวม
- Tool access ไม่รับประกันความถูกต้อง การตรวจสอบและ permission ยังจำเป็น
- ตัวอย่างรายงานเป็นภาพเชิงแนวคิด ไม่รับรองว่าผลิตภัณฑ์ทุกตัวจะสร้างไฟล์หรือเข้าถึงแหล่งข้อมูลได้

## Facts requiring a pre-publish freshness check

- เปิดเอกสาร OpenAI, Anthropic และ MCP ทั้งหมดอีกครั้งหากเผยแพร่หลัง 2026-10-21
- ตรวจถ้อยคำเกี่ยวกับ MCP primitives, extensions และ authorization หาก specification เปลี่ยน
- ไม่ใส่ชื่อรุ่นโมเดล ราคา หรือ feature plan ที่เปลี่ยนเร็ว

## Sources considered but not used

- บทความรวมศัพท์จากสื่อและ vendor ที่ไม่ได้อธิบาย runtime/loop โดยตรง
- โพสต์ social media ที่ใช้ “Agent” เป็นคำการตลาดโดยไม่มีนิยาม
- หน้า product comparison เพราะโพสต์นี้อธิบายแนวคิด ไม่จัดอันดับสินค้า
