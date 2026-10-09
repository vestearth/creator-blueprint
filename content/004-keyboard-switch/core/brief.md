---
id: "004"
title: "Linear / Tactile / Clicky ต่างกันยังไง?"
channel: tech
state: verified
owner: vestearth
created: "2026-09-23"
issue: "https://github.com/vestearth/creator-blueprint/issues/5"
---

# Content Brief

## Objective

ช่วยคนที่กำลังเลือก mechanical keyboard switch ใช้สามประเภทเป็นจุดเริ่มต้น แล้วตรวจแรงกด ระยะกด โครงสร้าง switch และคีย์บอร์ดจริงก่อนตัดสินใจ

## Target audience and question

คนไทยที่เห็นคำว่า Linear / Tactile / Clicky และศัพท์เสียง Creamy / Thock / Clack ในรีวิวหรือหน้าสินค้า แต่ยังไม่รู้ว่าข้อมูลเหล่านี้ช่วยเลือก switch ได้แค่ไหน

## Audience promise

เมื่อดูจบ เราจะแยก feedback ทั้งสามแบบได้ รู้ว่า spec ไหนควรเช็กต่อ และไม่คาดหวัง feel หรือเสียงจากชื่อประเภทเพียงคำเดียว

## Original angle

ใช้ **ประเภท switch เป็นตัวกรองแรก ไม่ใช่คำตอบสุดท้าย**: feedback → force/travel → รายละเอียดรุ่น → build ทั้งตัว → ความชอบและสภาพแวดล้อมของเรา รวมศัพท์เสียงที่พบจริงเป็นกรณีตัวอย่างว่าคำบรรยายเสียงไม่ใช่สเปกของ switch

## Scope

### Included

- Mechanical switch แบบสัมผัสไฟฟ้าทั่วไป: Linear, Tactile, Clicky
- Operating/actuation force, pre-travel, total travel, spring, bump/click mechanism, factory lube, stem/housing
- ผลของ keycaps, plate, mount, case และ foam ต่อประสบการณ์รวม โดยไม่กำหนดสูตรเสียงตายตัว
- วิธีเลือกจาก feedback ที่ชอบ งาน สภาพแวดล้อม และโอกาสทดลองจริง
- ความหมายเชิงใช้งานของ Creamy / Thock / Clack ว่าเป็นคำบรรยายเชิงความรู้สึก ไม่ใช่ประเภท switch หรือสเปกมาตรฐาน
- สีแดง/น้ำตาล/น้ำเงินเป็นภาพจำเริ่มต้น แต่มี switch สีอื่นในแต่ละประเภท; ใช้ภาพประกอบสวิตช์ทั่วไปเพื่อช่วยอ่าน ไม่ใช่ภาพสินค้า

### Excluded

- จัดอันดับรุ่นหรือแบรนด์, tutorial mod/lube, deep acoustics และ keyboard profile deep dive
- Hall Effect/magnetic, optical และ low-profile compatibility deep dive
- สูตรว่า Linear = gaming หรือ Tactile = typing

## Key questions

1. สามประเภทให้ feedback ต่างกันอย่างไร?
2. ทำไม switch ประเภทเดียวกันจึงให้ feel ต่างกัน?
3. Pre-travel ต่างจาก total travel อย่างไร และแรงกดบอกอะไรได้บ้าง?
4. ทำไมคำว่า Creamy / Thock / Clack หรือ sound test เดียวจึงไม่รับประกันเสียง build ของเรา?
5. เราควรลองและเทียบอะไรบ้างก่อนซื้อ?

## Expected platform outputs

Canonical narrative ที่ไม่ผูกแพลตฟอร์ม แล้วจึงดัดแปลงเป็น Lemon8 carousel 10 ใบ พร้อม source notes, caption, package และภาพ export หลังผ่าน verification gate

## Rights-safe production approach

ใช้ diagram, force/travel illustration และตัวอักษรที่สร้างเองใน repo; ไม่ต้องใช้ภาพสินค้า โลโก้ คลิปเสียง หรือ sound test ของบุคคลอื่น หากจะใช้ asset เพิ่มต้องบันทึกแหล่งและสิทธิ์ก่อน

## Success hypothesis

โมเดล “ประเภทเป็นตัวกรองแรก” ช่วยลดการเลือกจากสี/ป้าย gaming/typing และช่วยให้คนดูตั้งคำถามที่ตรวจสอบได้เมื่อเทียบสินค้า

## Validation decision

- [x] Specific audience
- [x] One clear promise
- [x] Original contribution
- [x] Feasible production
- [x] Rights-safe direction

Decision: `validated-for-draft`
