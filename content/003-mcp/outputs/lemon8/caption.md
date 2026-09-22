# Caption

## Publish copy

จากตอนที่แล้ว เราเห็นว่า Agent เดินงานเป็น Loop:

`Decide → Act → Observe → Verify`

คำถามต่อมาคือ ตอนจะ **Act** มันรู้ได้ยังไงว่ามี Tool อะไร และผลจาก Tool กลับมาที่
**Observe** ทางไหน?

นี่คือจุดที่ MCP เข้ามาครับ

MCP ไม่ใช่สมองของ Agent และไม่ใช่ตัว Tool แต่มันเป็นมาตรฐานกลางที่ทำให้ AI application
กับฝั่งที่ให้ข้อมูลหรือความสามารถคุยกันรู้เรื่อง

Flow แบบย่อ:

1. MCP Client ขอรายการ Tool จาก Server ด้วย `tools/list`
2. Tool บอกชื่อ คำอธิบาย และ input schema
3. Host เลือก Tool ที่อนุญาตให้ model เห็น
4. Agent เลือก Tool และสร้าง arguments
5. Client ส่ง `tools/call` ให้ Server ไปทำงานกับไฟล์ ฐานข้อมูล หรือ API
6. Result กลับเข้า context ให้ Agent ดูผลและเลือกขั้นถัดไป

นอกจาก Tools แล้ว MCP Server ยัง expose ได้อีกสองอย่าง:

- Resources — ข้อมูล context เช่นไฟล์หรือ schema
- Prompts — template/instruction ที่ผู้ใช้เลือกใช้

ประโยชน์คือเราไม่ต้องออกแบบภาษาสำหรับเชื่อม AI กับทุกระบบใหม่เป็นรายคู่ และผู้สร้าง
capability สามารถแยก Server ออกจาก AI application ได้

แต่ต้องจำไว้ว่า **Connection ≠ Permission**

MCP ไม่ได้สร้าง planning, memory, stopping condition หรือ verification ให้ Agent และ
ไม่ได้แปลว่า model มีสิทธิ์ทำทุกอย่าง Host/application ยังต้องจำกัดสิทธิ์ ขอ approval
ใน action สำคัญ และตรวจผลก่อนเดินต่อ

สรุปต่อจากตอน 002:

**Prompt กำหนดทิศ · Agent เลือกขั้นถัดไป · Host คุมขอบเขต · MCP เชื่อม · Tool ลงมือ**

ตอนต่อไปอยากดูอะไรมากกว่ากัน: “ข้างใน MCP Server มีอะไร?” หรือ “Permission/Approval
ควรวางตรงไหน?”

## Content detail

- **Hook:** Agent ใช้ Tool ได้ยังไง?
- **Audience promise:** ตามหนึ่ง tool call ได้ตั้งแต่ discovery ถึง result
- **Original model:** Agent / Host / MCP / Tool responsibility map
- **Safety takeaway:** การเชื่อมต่อได้ไม่เท่ากับได้รับสิทธิ์
- **Series continuity:** เติมรายละเอียดตรง `ACT → OBSERVE` จาก 002-ai-agent

## Hashtags

#MCP #ModelContextProtocol #AIAgent #AIสำหรับคนทำงาน #DeveloperWorkflow #GenerativeAI #TechExplained

## Claim/source notes

พฤติกรรม protocol และ architecture อ้างอิง MCP specification `2026-07-28` ที่เปิดอ่าน
เมื่อ 2026-09-22 รายละเอียดและ caveat อยู่ใน `../../core/research.md`.

## Disclosure or attribution copy

ภาพทั้งหมดเป็น diagram สร้างใหม่ด้วย HTML/CSS ไม่มี realistic synthetic media หรือ
asset ภายนอก ให้ตรวจข้อกำหนด disclosure ล่าสุดของ Lemon8 อีกครั้งก่อนเผยแพร่
