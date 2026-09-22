# Research

Status: `complete-pending-human-verification`

Research completed: `2026-09-22`

## Research question

MCP ทำให้ AI application ค้นพบและใช้ Tools/ข้อมูลจากระบบภายนอกได้อย่างไร และขอบเขต
ความรับผิดชอบของ protocol ต่างจาก Agent runtime, authorization และ verification อย่างไร?

## Claim ledger

| ID | Claim | Source | Accessed | Source type | Confidence | Intended use |
| --- | --- | --- | --- | --- | --- | --- |
| C-001 | MCP เป็นมาตรฐานเปิดสำหรับเชื่อม AI applications กับระบบภายนอก เช่นแหล่งข้อมูล เครื่องมือ และ workflows | [MCP — What is MCP?](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro) | 2026-09-22 | Primary — official documentation | High | นิยามเปิดเรื่อง |
| C-002 | MCP ใช้สถาปัตยกรรม client-host-server; Host จัดการ clients, permission, security policy, user authorization และ context ขณะที่ client หนึ่งตัวสื่อสารกับ server หนึ่งตัว | [MCP 2026-07-28 — Architecture](https://modelcontextprotocol.io/specification/2026-07-28/architecture) | 2026-09-22 | Primary — protocol specification | High | แผนภาพ architecture และขอบเขตความรับผิดชอบ |
| C-003 | MCP servers expose สาม server primitives: Prompts, Resources และ Tools โดยเอกสารจัด prompts เป็น user-controlled, resources เป็น application-controlled และ tools เป็น model-controlled | [MCP 2026-07-28 — Server Features](https://modelcontextprotocol.io/specification/2026-07-28/server/index) | 2026-09-22 | Primary — protocol specification | High | การ์ดสาม primitives |
| C-004 | Tool definition มีชื่อ คำอธิบาย และ input schema; client ขอรายการได้ด้วย `tools/list` และเรียกด้วย `tools/call` พร้อม arguments | [MCP 2026-07-28 — Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) | 2026-09-22 | Primary — protocol specification | High | อธิบาย discovery และ invocation |
| C-005 | Tool result อาจเป็นข้อความ รูป เสียง resource link, embedded resource หรือ structured content และ output schema ช่วยให้ client ตรวจ structured result ได้ | [MCP 2026-07-28 — Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) | 2026-09-22 | Primary — protocol specification | High | อธิบาย result กลับเข้า Agent loop |
| C-006 | Tools ถูกออกแบบให้ model เลือกเรียกได้ แต่ protocol ไม่บังคับรูปแบบ UI; specification แนะนำให้ผู้ใช้เห็น Tool ที่เปิดให้ model และมีความสามารถปฏิเสธ/ยืนยันการเรียก | [MCP 2026-07-28 — Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) | 2026-09-22 | Primary — protocol specification | High | การ์ด control และ human approval |
| C-007 | Resources เป็นข้อมูล context ที่ server expose ด้วย URI; host/application เป็นผู้ตัดสินว่าจะนำ resource เข้า context อย่างไร | [MCP 2026-07-28 — Resources](https://modelcontextprotocol.io/specification/2026-07-28/server/resources) | 2026-09-22 | Primary — protocol specification | High | แยก Resource ออกจาก Tool |
| C-008 | MCP ใช้ JSON-RPC และกำหนด standard transports คือ stdio และ Streamable HTTP; semantics ของ protocol เหมือนกันข้าม transport | [MCP 2026-07-28 — Transports](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports) | 2026-09-22 | Primary — protocol specification | High | source note; ไม่ต้องลง transport detail บนการ์ด |
| C-009 | Authorization ของ MCP เป็น optional และ specification ส่วนนี้ครอบคลุม HTTP-based transports; stdio ใช้ credential จาก environment แทน | [MCP 2026-07-28 — Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization) | 2026-09-22 | Primary — protocol specification | High | ป้องกัน claim ว่า MCP แก้ permission/safety ทั้งหมด |
| C-010 | MCP ช่วยลดเวลาและความซับซ้อนในการเชื่อม AI application/agent และเปิดทางให้ใช้ ecosystem ของ data sources, tools และ apps ที่รองรับ | [MCP — What is MCP?](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro) | 2026-09-22 | Primary — official documentation | High | ประโยชน์ต่อ developer และผู้ใช้ |
| C-011 | “Agent เลือกขั้นถัดไป; Host คุมสิ่งที่เปิดและนโยบาย; MCP กำหนดรูปแบบ discovery/call/result” เป็นการสังเคราะห์จาก architecture และ tools specification | Inference from C-002, C-004–C-006 | 2026-09-22 | Editorial inference | High | Thesis และ recap |
| C-012 | MCP ไม่ใช่ Agent runtime และไม่ได้สร้าง planning, state, stopping condition หรือ verification ให้เอง เพราะ architecture กำหนด orchestration และ AI integration ไว้ที่ Host ส่วน server เน้น capabilities | Inference from C-002 and [MCP 2026-07-28 — Architecture](https://modelcontextprotocol.io/specification/2026-07-28/architecture) | 2026-09-22 | Scoped editorial inference | High | เชื่อมกลับตอน 002 และวางข้อจำกัด |

## Definitions used in this content

- **Host:** AI application ที่ประสาน model, context, clients, policy และการตัดสินใจของผู้ใช้
- **MCP client:** ส่วนใน Host ที่พูด protocol กับ MCP server หนึ่งตัว
- **MCP server:** โปรแกรมหรือ service ที่ประกาศ capabilities เช่น Tools, Resources และ Prompts
- **Tool:** function ที่ model อาจเลือกเรียกเพื่อดึงข้อมูล คำนวณ หรือทำ action
- **Resource:** ข้อมูลที่ application อาจนำเข้า context เช่นไฟล์หรือ schema
- **Prompt:** template/instruction ที่ผู้ใช้เลือกใช้ผ่าน client
- **External system:** ระบบจริงด้านหลัง server เช่น filesystem, database หรือ API

## How one tool call works

1. Host เชื่อม MCP client กับ server และรับ capability ที่ server รองรับ [C-002]
2. Client ขอรายการ Tool ด้วย `tools/list`; แต่ละ Tool บอกชื่อ คำอธิบาย และ input schema [C-004]
3. Host นำ Tool ที่อนุญาตให้ใช้ไปให้ model เห็นใน context [C-002, C-006]
4. Agent/model เลือก Tool และสร้าง arguments ตาม schema; Host อาจตรวจ policy หรือขอผู้ใช้ยืนยัน [C-004, C-006]
5. Client ส่ง `tools/call` ไป server; server ทำงานกับ external system แล้วคืน result [C-004, C-005]
6. Host นำ result กลับเข้า context ให้ Agent สังเกต ตรวจ และเลือกขั้นถัดไป [C-005, C-011; เชื่อมกับ loop จาก 002]

## What MCP helps with

- ใช้ contract เดียวสำหรับการประกาศและเรียก capability แทน integration เฉพาะคู่ทุกครั้ง [C-001, C-004, C-010]
- ทำให้ Tools/Resources มี metadata และ schema ที่ host/model ใช้ทำความเข้าใจได้ [C-003, C-004]
- แยก capability provider ออกจาก orchestration ทำให้ประกอบหลาย server ภายใต้ host ได้ [C-002]

## What MCP does not solve by itself

- ไม่ตัดสินว่า goal ควรแตกเป็นกี่ขั้น หรือเมื่อไรควรหยุด [C-012]
- ไม่รับประกันว่า model จะเลือก Tool ถูกหรือ argument ถูกเชิงความหมาย [C-004, C-011]
- ไม่แทน application permission policy, approval UI หรือ result verification [C-002, C-006, C-009]
- ไม่รับประกันว่า server ทุกตัวปลอดภัย เชื่อถือได้ หรือ compatible กับทุก host [C-006, C-009]

## Conflicting evidence or uncertainty

- เอกสาร introductory ใช้อุปมา USB-C และถ้อยคำ “build once and integrate everywhere” แต่ในทางปฏิบัติยังขึ้นกับ protocol revision, capabilities, transport, authorization และ host support จึงใช้ถ้อยคำว่า “นำกลับไปใช้กับ host ที่รองรับได้ง่ายขึ้น”
- คำว่า Agent และ Model มักถูกใช้แทนกันในบทสนทนา แต่โพสต์นี้แยก Agent loop ออกจากตัว model และแยก Host ออกจาก protocol เพื่อความแม่นยำ
- `model-controlled` ไม่ได้แปลว่า model มีสิทธิ์เด็ดขาด; specification เปิดให้ implementation ออกแบบ interaction และแนะนำ human-in-the-loop
- MCP revision `2026-07-28` เปลี่ยน architecture บางส่วนจากรุ่นก่อน เช่น per-request metadata และ stateless protocol จึงไม่ใช้ diagram ของ revision เก่าปนกัน

## Facts requiring a pre-publish freshness check

- ตรวจว่า stable MCP specification ยังเป็น `2026-07-28`
- ตรวจชื่อ server primitives และ method names `tools/list`, `tools/call`
- ตรวจ architecture และ authorization wording หากเผยแพร่หลัง 2026-10-22
- ไม่ใส่รายชื่อผลิตภัณฑ์หรือจำนวน integrations ที่เปลี่ยนเร็ว

## Sources considered but not used

- บทความ vendor/สื่อที่สรุป MCP แบบ USB-C โดยไม่แยก Host, Client และ Server
- รายการ MCP servers จาก community registry เพราะไม่จำเป็นต่อ promise ของโพสต์
- Tutorial SDK เพราะโพสต์นี้อธิบาย mental model ไม่ได้สอน implementation
