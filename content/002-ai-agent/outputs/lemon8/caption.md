# Caption

## Publish copy

หลายคนคิดว่า AI Agent คือแชตที่ใส่ Prompt ยาวขึ้น

แต่สิ่งที่ทำให้มันเป็น Agent ไม่ใช่แค่ “คำสั่งที่ละเอียดกว่า” — คือระบบที่รับเป้าหมาย
แล้วเดินงานต่อเป็น Loop ได้ครับ

จำแบบสั้น ๆ:

- Chat ทั่วไป: `Prompt → Answer` เราเป็นคนพาคำตอบไปทำขั้นต่อไป
- Agent: `Goal → Decide → Act → Observe → Verify` ระบบดูผลจริง แล้วเลือกว่าจะทำต่อหรือหยุด

เช่น โจทย์ “หาข้อมูลแล้วทำรายงาน”

**Chat ทั่วไป**

“ช่วยหาข้อมูลเรื่อง X”
→ แนะนำข้อมูลหรือร่างรายงาน
→ เราเอาไปทำต่อ

**Agent**

“ทำรายงานเรื่อง X ให้เสร็จ”
→ แตกงาน
→ ค้นและเก็บ source
→ สร้างไฟล์
→ ตรวจ checklist
→ แก้จุดที่ไม่ผ่าน
→ ส่งผลลัพธ์

ทั้งหมดนี้ทำได้เท่าที่ tools, permissions และ environment อนุญาต

เพราะฉะนั้น Prompt ที่ดียังสำคัญมาก แต่ Prompt อย่างเดียวไม่ได้สร้าง tool access,
task state, feedback loop หรือ verification ขึ้นมาเอง

แล้วควรใช้แบบไหน?

- รู้คำตอบที่ต้องการ → Chat
- รู้ขั้นตอนที่ต้องทำ → Workflow
- รู้เป้าหมาย แต่ต้องตัดสินใจระหว่างทาง → Agent

โลกจริงทั้งสามแบบผสมกันได้ กรอบนี้มีไว้ช่วยเลือกจุดเริ่มต้น ไม่ใช่แบ่งผลิตภัณฑ์แบบตายตัว

สรุป: **Prompt กำหนดทิศ ส่วน Tools + State + Feedback Loop ทำให้งานเดินหน้า**

ตอนต่อไปอยากให้ผมแกะเรื่อง MCP ไหมครับ ว่ามันเชื่อม Agent กับ data และ tools อย่างไร?

## Content detail

- **Hook:** Prompt เก่งแค่ไหน ก็ยังไม่ใช่ AI Agent
- **Audience promise:** ดูจบแล้วแยกได้ว่างานไหนใช้ Chat, Workflow หรือ Agent
- **Core contrast:** Chat ทั่วไปที่จบเป็นรอบ เทียบกับระบบที่ลงมือ ดูผล เก็บ state และวนต่อ
- **Example:** โจทย์เดียวกัน “หาข้อมูลแล้วทำรายงาน” แต่ขอบเขตการลงมือไม่เท่ากัน
- **Decision takeaway:** เลือกจากลักษณะงาน ไม่เลือกเพราะกระแส
- **Next-post bridge:** MCP เชื่อม Agent เข้ากับ data, tools และ workflows อย่างไร

## Hashtags

#AIAgent #ChatGPT #GenerativeAI #PromptEngineering #AIสำหรับคนทำงาน #DeveloperWorkflow #TechExplained

## Claim/source notes

นิยามและ runtime behavior อ้างอิงเอกสาร OpenAI, Anthropic และ Model Context Protocol
ฉบับที่เปิดอ่านเมื่อ 2026-09-21 รายละเอียดและ caveat อยู่ใน `../../core/research.md`.

## Disclosure or attribution copy

ภาพทั้งหมดเป็น diagram สร้างใหม่ด้วย HTML/CSS และไม่มี realistic synthetic media
ให้ตรวจข้อกำหนด disclosure ล่าสุดของ Lemon8 อีกครั้งก่อนเผยแพร่
