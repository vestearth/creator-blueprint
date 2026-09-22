# Lemon8 Source Notes

แผนที่จากข้อความสั้นบน card กลับไปยัง claim ledger ใน `../../core/research.md`

| Card | Material claims | Claim IDs | Publish note |
| ---: | --- | --- | --- |
| 1 | Agent ต่างที่ระบบเดินงาน ไม่ใช่เพียงชื่อหรือ prompt | C-001, C-002, C-010 | Headline เทียบ prompt กับระบบ ไม่จัดประเภทตามแบรนด์ |
| 2 | Direct/chat-style path เน้น response; prompt ไม่ใช่ runtime ทั้งหมด | C-001, C-003 | ไม่อ้างว่า chat product ไม่มี tools |
| 3 | Agent plans/acts with tools, observes and continues/stops | C-002, C-005 | Loop เป็น mental model แบบย่อ |
| 4 | Prompt sets goals/constraints; action, state and loop need system support | C-003, C-004, C-010 | Editorial phrase “บอกทาง/สร้างถนน” เป็นอุปมา |
| 5 | Context, tools, state and verification support multi-step work | C-002, C-004, C-005, C-012 | ไม่ประกาศว่าเป็น taxonomy มาตรฐาน |
| 6 | Report example contrasts advice/draft with tool-enabled execution | C-002, C-005, C-011, C-012 | คง conditional wording เรื่อง tools/permissions |
| 7 | Simpler calls can be enough and agentic systems add cost/latency | C-006 | ไม่แปลว่า single call คุณภาพต่ำกว่าเสมอ |
| 8 | Agents suit open-ended multi-step tasks; feedback and oversight matter | C-005, C-007, C-012 | Examples are categories, not guaranteed product features |
| 9 | MCP exposes Resources, Tools and Prompts; protocol authorization ≠ full application control | C-008, C-009 | MCP ≠ Agent runtime; keep application-level permission/verification caveat |
| 10 | Choose chat/workflow/agent based on task shape | C-001, C-006, C-007, C-010 | Three-way choice is editorial synthesis; real systems may mix all three |

## Freshness check before publish

- Reopen all four source pages if publishing after 2026-10-21.
- Confirm MCP server primitives remain Resources, Tools and Prompts in the target spec.
- Confirm authorization wording still separates protocol transport auth from application-level controls.
- Confirm OpenAI docs still describe tools, context/state and human review in the cited
  runtime surfaces.
