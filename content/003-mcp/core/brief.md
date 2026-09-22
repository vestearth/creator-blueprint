---
id: "003"
title: "Agent ใช้ Tool ได้ยังไง? รู้จัก MCP"
channel: tech
state: core-draft
owner: vestearth
created: "2026-09-22"
follows: "002-ai-agent"
---

# Content Brief

## Objective

ตอบคำถามต่อจากตอน 002 ว่า Agent ไปใช้ Tool ได้อย่างไร โดยอธิบาย MCP ในฐานะ
มาตรฐานการเชื่อมต่อระหว่าง AI application กับระบบที่ให้ข้อมูลหรือความสามารถ และแยก
บทบาทของ Agent, Host, MCP client, MCP server และ Tool ให้ไม่ปนกัน

## Target audience and question

คนไทยที่เข้าใจภาพรวม AI Agent จากตอน 002 แล้ว แต่ยังสงสัยว่า Agent รู้ได้อย่างไรว่า
มี Tool อะไร เรียกด้วยข้อมูลแบบไหน และรับผลกลับมาเดินงานต่ออย่างไร

## Audience promise

เมื่อดูจบ เราจะตามเส้นทางหนึ่ง tool call ได้ตั้งแต่ค้นพบ Tool เลือกใช้ ส่ง argument
รับผล แล้วกลับเข้า Agent loop พร้อมรู้ว่า MCP ช่วยตรงไหนและเรื่องใดที่ระบบยังต้อง
ออกแบบเอง

## Original angle

ไม่อธิบาย MCP ด้วยคำเปรียบเทียบ “USB-C ของ AI” เพียงอย่างเดียว แต่ผ่าเส้นทางจริงเป็น
สามความรับผิดชอบ:

- `Agent loop` เลือกขั้นถัดไปจาก goal และผลที่สังเกตได้
- `Host / application` เลือกว่าเปิดอะไรให้ model เห็น คุมสิทธิ์ ขออนุมัติ และจัด context
- `MCP` กำหนดภาษากลางสำหรับ discover, call/read และส่งผลลัพธ์กลับ

แกนบรรณาธิการคือ “MCP ไม่ใช่สมองของ Agent และไม่ใช่ตัว Tool; มันทำให้ระบบคุยกัน
รู้เรื่องด้วยสัญญากลาง”

## Scope

### Included

- MCP คืออะไรในระดับใช้งาน
- โครงสร้าง Host → Client ↔ Server → external system
- Resources, Tools และ Prompts ต่างกันอย่างไร
- เส้นทาง `tools/list` → เลือก Tool → `tools/call` → result
- MCP ช่วยลดงาน integration และทำให้ capability นำกลับไปใช้กับ host ที่รองรับได้
- สิ่งที่ MCP ไม่ได้แก้: การตัดสินใจของ model, agent loop, permission policy และ verification
- ความสัมพันธ์โดยตรงกับ `002-ai-agent`

### Excluded

- Tutorial เขียน MCP server/client
- รายละเอียด JSON-RPC, transport และ OAuth เชิง implementation
- จัดอันดับ MCP client/server หรือแนะนำ marketplace
- อ้างว่า MCP ทำให้ทุก integration ใช้ได้ทันทีโดยไม่ต้องตั้งค่าและตรวจ compatibility

## Key questions

1. MCP คืออะไร และอยู่ตรงไหนในระบบ Agent?
2. Agent รู้ได้อย่างไรว่ามี Tool อะไรและต้องส่ง argument แบบไหน?
3. เมื่อเรียก Tool แล้วผลกลับเข้า loop อย่างไร?
4. Resources, Tools และ Prompts มีหน้าที่ต่างกันอย่างไร?
5. MCP ช่วยทีมพัฒนาและผู้ใช้เรื่องใด?
6. Permission, approval และ verification เป็นหน้าที่ของใคร?

## Expected platform outputs

Canonical content และ Lemon8 carousel 10 ใบพร้อม caption, source notes, package metadata,
visual plans และ PNG 1080×1440 สำหรับ human review

## Rights-safe production approach

ใช้ตัวอักษร รูปทรง ลูกศร และ protocol diagram ที่สร้างด้วย HTML/CSS ใน repository
ไม่ใช้โลโก้ product, screenshot หรือ asset ภายนอก ฟอนต์ใช้ Noto Sans Thai และ
JetBrains Mono จาก dependency ที่มีใบอนุญาต OFL-1.1

## Success hypothesis

การวาง MCP ลงใน `ACT → OBSERVE` ของ loop จากตอน 002 และตามหนึ่ง tool call ตั้งแต่
discovery ถึง result จะช่วยให้คนดูเข้าใจมากกว่านิยามเชิงเปรียบเทียบ และลดความเข้าใจผิด
ว่า MCP คือ Agent หรือทำให้ AI มีสิทธิ์ทำอะไรก็ได้โดยอัตโนมัติ

## Validation decision

- [x] Specific audience
- [x] One clear promise
- [x] Original contribution
- [x] Feasible production
- [x] Rights-safe direction

Decision: `validated-for-draft`
