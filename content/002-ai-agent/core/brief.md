---
id: "002"
title: "Prompt เก่งแค่ไหน ก็ยังไม่ใช่ AI Agent"
channel: tech
state: core-draft
owner: vestearth
created: "2026-09-21"
---

# Content Brief

## Objective

อธิบายความต่างเชิงพฤติกรรมระหว่างการคุยกับผู้ช่วย AI แบบถาม–ตอบ กับระบบที่
ทำงานแบบ Agent โดยให้คนดูเห็นว่า “วงจรการลงมือทำและตรวจผล” คือชิ้นส่วนที่
prompt ยาวหรือเขียนดีเพียงอย่างเดียวทดแทนไม่ได้

## Target audience and question

คนไทยที่ใช้ ChatGPT หรือผู้ช่วย LLM อยู่แล้ว ทั้งผู้ใช้ทั่วไป คนทำงานความรู้ และ
developer แต่ยังไม่ชัดว่า AI Agent คืออะไร ต่างจาก chat อย่างไร และควรใช้ตอนไหน

## Audience promise

เมื่อดูจบ เราจะแยกได้ว่าโจทย์ไหนแค่ถามให้ตอบก็พอ และโจทย์ไหนได้ประโยชน์จากระบบ
ที่วางขั้นตอน ใช้เครื่องมือ เก็บสถานะ ดูผล แล้วทำต่อจนถึงเงื่อนไขหยุด

## Original angle

ไม่เริ่มจากศัพท์หรือระดับ “ความฉลาด” แต่เทียบโครงสร้างการทำงานสองแบบ:

- Chat ทั่วไป: `Prompt → Answer`
- Agent: `Goal → Decide → Act → Observe → Verify → Continue/Stop`

แกนบรรณาธิการคือ “Prompt กำหนดทิศ ส่วน tools, state และ feedback loop ทำให้งาน
เดินหน้า” พร้อมกรอบตัดสินใจง่าย ๆ ว่าเมื่อไรควรเริ่มด้วย Chat, Workflow หรือ Agent

## Scope

### Included

- ความหมายเชิงปฏิบัติของ chat assistant และ AI agent
- บทบาทของ goal, context, tools, state/memory, workflow และ verification
- เหตุผลที่ prompt ยาวไม่เท่ากับระบบที่ลงมือทำและรับ feedback จาก environment
- ตัวอย่างเดียวกัน: “หาข้อมูลแล้วทำรายงาน” ในโหมด chat เทียบกับ agent
- งานที่ chat ธรรมดาเหมาะกว่า และงานที่ agent มีประโยชน์
- MCP เป็นสะพานเชื่อม Agent กับระบบภายนอกแบบเกริ่นนำ

### Excluded

- สอนสร้าง Agent หรือเขียนโค้ด
- ลงรายละเอียดสถาปัตยกรรม multi-agent
- อธิบาย MCP เชิงลึก
- จัดอันดับผลิตภัณฑ์หรือโมเดล
- อ้างว่า Agent ทำงานอัตโนมัติได้สมบูรณ์หรือเหมาะกับทุกงาน

## Key questions

1. การทำงานแบบ Chat ทั่วไปหรือ single-turn มีรูปแบบอย่างไร?
2. อะไรเปลี่ยนไปเมื่อระบบทำงานเป็น Agent?
3. ทำไม prompt ละเอียดจึงยังไม่ใช่ execution loop?
4. Context, tools, state, workflow และ verification ทำหน้าที่อะไร?
5. งานแบบไหนควรใช้ chat และงานแบบไหนเหมาะกับ Agent?
6. MCP เชื่อมเข้ากับภาพนี้อย่างไร?

## Expected platform outputs

Canonical content ที่ไม่ผูกกับแพลตฟอร์ม และ Lemon8 carousel 10 ใบพร้อม caption,
source notes, package metadata, visual plans และไฟล์ PNG 1080×1440 สำหรับ human review

## Rights-safe production approach

ใช้ตัวอักษร รูปทรง ไอคอน และ diagram ที่สร้างด้วย HTML/CSS ใน repository เท่านั้น
ไม่มีภาพบุคคล โลโก้ product screenshot เพลง หรือ asset จากบุคคลภายนอก ฟอนต์ใช้
Noto Sans Thai และ JetBrains Mono จาก dependency ที่มีใบอนุญาต OFL-1.1

## Success hypothesis

การให้คนดู “เห็น loop” ก่อนเจอรายการส่วนประกอบ จะช่วยลดความเข้าใจผิดว่า Agent
คือแค่แชตที่ใช้ prompt ซับซ้อน และคำถามท้ายโพสต์จะเปิดทางสู่ตอน MCP อย่างเป็นธรรมชาติ

## Validation decision

- [x] Specific audience
- [x] One clear promise
- [x] Original contribution
- [x] Feasible production
- [x] Rights-safe direction

Decision: `validated-for-draft`
