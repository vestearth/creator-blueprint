# Canonical Narrative

Status: `draft-complete-pending-human-verification`

## Working title

Agent ใช้ Tool ได้ยังไง? รู้จัก MCP

## Audience promise

เราจะตามหนึ่ง tool call ตั้งแต่ Agent เห็นความสามารถ เลือกใช้ ส่งข้อมูล รับผล แล้วกลับเข้า
loop พร้อมแยกได้ว่า MCP ช่วยตรงไหนและอะไรยังเป็นหน้าที่ของ Host/Agent

## Hook concept

จากตอน 002 เรารู้ว่า Agent ไม่ได้หยุดที่คำตอบ แต่วน `Decide → Act → Observe → Verify`
คำถามคือ ตอนจะ `Act` มันรู้จัก Tool ได้อย่างไร และผลจากโลกภายนอกกลับมาที่ `Observe`
ทางไหน?

MCP อยู่ตรงรอยต่อนี้ แต่ไม่ใช่สมองของ Agent และไม่ใช่ตัว Tool มันคือมาตรฐานเปิดที่
กำหนดว่าฝั่ง AI application กับฝั่งที่ให้ข้อมูล/ความสามารถจะประกาศ เรียก และส่งผลกลับ
หากันอย่างไร [C-001, C-011]

## Core explanation

ภาพระบบมีสี่บทบาทหลัก:

1. **Host** คือ AI application ที่ถือ conversation, model, context และนโยบายว่าจะเปิด
   capability ไหน ขออนุมัติเมื่อไร และส่งผลอะไรกลับให้ model [C-002]
2. **MCP client** อยู่ใน Host และคุยกับ MCP server แบบหนึ่ง client ต่อหนึ่ง server [C-002]
3. **MCP server** ประกาศ Resources, Tools และ Prompts ที่ตัวเองรองรับ [C-002, C-003]
4. **External system** คือของจริงหลัง server เช่นไฟล์ database, API หรือ calculator

เวลาจะใช้ Tool ไม่ใช่ Agent เดาชื่อ function เอง Client ขอรายการผ่าน `tools/list` ก่อน
Tool แต่ละตัวมีชื่อ คำอธิบาย และ `inputSchema` บอกว่าใช้ทำอะไรและรับ argument รูปแบบไหน
[C-004] Host เลือกเฉพาะ Tool ที่นโยบายอนุญาตไปให้ model เห็น จากนั้น model/Agent จึง
เลือก Tool ที่สัมพันธ์กับ goal และสร้าง arguments ตาม schema [C-002, C-006]

เมื่อจะลงมือ Client ส่ง `tools/call` ไปยัง server พร้อมชื่อ Tool และ arguments Server
เรียก external system แล้วคืน result กลับมาได้ทั้งข้อความ ข้อมูล structured หรือ content
ชนิดอื่น [C-004, C-005] Host นำผลนั้นกลับเข้า context ให้ Agent สังเกตและตัดสินใจว่า
สำเร็จแล้ว ต้องแก้ argument เรียก Tool อื่น หรือหยุดรอคน [C-011]

ดังนั้น MCP ไม่ได้เป็นคน “คิด” ว่าต้องทำอะไรต่อ มันทำให้ช่วงกลางของ loop มีสัญญาร่วม:

`discover capability → call/read → return result`

Server primitives สามแบบมีหน้าที่ไม่เหมือนกัน [C-003, C-007]:

- **Tools** — function สำหรับดึงข้อมูล คำนวณ หรือทำ action; model อาจเป็นผู้เลือกเรียก
- **Resources** — ข้อมูล context เช่นไฟล์หรือ schema; application เป็นผู้ตัดสินว่าจะนำเข้าอย่างไร
- **Prompts** — template/instruction ที่ผู้ใช้เลือกใช้

ประโยชน์คือผู้สร้าง AI application ไม่ต้องประดิษฐ์รูปแบบประกาศ Tool และรับผลใหม่ทุกคู่
และผู้สร้าง capability แยก server ออกจาก Host ได้ จึงนำไปใช้กับ application ที่รองรับ
protocol และ capability เดียวกันได้ง่ายขึ้น [C-001, C-002, C-010] จุดสำคัญคือ “ง่ายขึ้น”
ไม่ใช่ “ต่อครั้งเดียวใช้ได้ทุกที่โดยไม่ต้องตั้งค่า”

## Boundary and safety

การเชื่อมต่อได้ไม่เท่ากับได้รับอนุญาตให้ทำทุกอย่าง Tools ถูกออกแบบให้ model เลือกเรียกได้
แต่ Host/application ยังควรทำให้ผู้ใช้เห็นว่าเปิด Tool อะไร แจ้งเมื่อเรียก และเปิดทางให้
ปฏิเสธหรือยืนยัน action โดยเฉพาะงานที่มีผลข้างเคียง [C-006]

MCP มี authorization สำหรับบาง transport แต่เป็น optional และไม่ได้แทน policy ทั้งระบบ
[C-009] ต่อให้การเชื่อมต่อและตัวตนถูกต้อง ระบบยังต้องออกแบบ least privilege, approval,
validation และ verification เอง

MCP จึงไม่สร้าง planning, state, memory, stopping condition หรือ Agent loop ให้เรา และ
ไม่รับประกันว่า model จะเลือก Tool ถูกหรือเชื่อ result ได้ทันที [C-012] มันแก้ปัญหา
integration contract ไม่ได้แก้ปัญหา judgment ทั้งหมด

## Connection to 002-ai-agent

ตอน 002 ให้ภาพนี้:

`Goal → Decide → Act → Observe → Verify → Continue/Stop`

ตอนนี้เติมรายละเอียดที่รอยต่อ:

`Decide → [Host policy] → MCP call → Tool/System → MCP result → Observe`

Prompt ยังบอกทิศ, Agent loop ยังเป็นคนเดินงาน, Host ยังควบคุมขอบเขต ส่วน MCP ทำให้
การคุยกับ capability ภายนอกมีรูปแบบกลาง นี่คือเหตุผลที่ MCP “ต่อยอด” Agent แต่ไม่ใช่
คำพ้องความหมายของ Agent

## Recommendation or conclusion

เวลาเห็นคำว่า MCP ให้ถามสี่ข้อ:

1. Host คือแอปอะไร และเปิด capability ไหนให้ model?
2. Server expose Tool, Resource หรือ Prompt อะไร?
3. Action ไหนต้องยืนยัน และใช้สิทธิ์แค่ไหน?
4. Result กลับมาแล้วระบบตรวจอย่างไรก่อนเดินต่อ?

กรอบจำสั้นที่สุด:

**Agent เลือกว่าจะทำอะไรต่อ · Host คุมขอบเขต · MCP ทำให้คุยกับ Tool เป็นภาษาเดียวกัน**

## Caveats

- MCP เป็น protocol ไม่ใช่ product และไม่ใช่ชื่อเรียก Tool ทุกชนิด
- Model อาจเลือก Tool แต่ Host/application ยังเป็นผู้จัด exposure, policy และ interaction
- MCP server อาจเป็น local process หรือ remote service; รายละเอียด transport ไม่จำเป็นต่อ mental model นี้
- Compatibility ขึ้นกับ revision, capabilities และ implementation ของทั้งสองฝั่ง
- ใช้ server จากแหล่งที่เชื่อถือได้และจำกัดสิทธิ์ตามงาน

## CTA intent

ชวนคนดูเลือกตอนต่อระหว่าง “ข้างใน MCP Server มีอะไร?” กับ “Permission/Approval ควรวาง
ตรงไหน?” เพื่อวัดว่าคนดูต้องการ implementation หรือ safety ต่อ

## Claim references

Material claims use C-001 through C-012 from `research.md`. Editorial synthesis is
explicitly labeled in C-011 and C-012.
