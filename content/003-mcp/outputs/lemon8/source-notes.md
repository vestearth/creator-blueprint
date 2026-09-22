# Lemon8 Source Notes

แผนที่จากข้อความสั้นบน card กลับไปยัง claim ledger ใน `../../core/research.md`

| Card | Material claims | Claim IDs | Publish note |
| ---: | --- | --- | --- |
| 1 | MCP is a standard between AI applications and external capabilities | C-001, C-011 | “ภาษากลาง” เป็นอุปมา ไม่ใช่ programming language |
| 2 | MCP sits at the action/result boundary of the editorial Agent loop | C-011, C-012 | Loop มาจาก 002 และเป็น mental model |
| 3 | MCP is a protocol, not Agent brain or Tool itself | C-001, C-003, C-011, C-012 | ไม่ใช้ USB-C เป็นคำอธิบายหลัก |
| 4 | Host, client, server and external system have distinct roles | C-002 | Client-server 1:1; Host may manage multiple clients |
| 5 | Tool discovery exposes name, description and input schema | C-002, C-004, C-006 | Host controls which tools reach model context |
| 6 | `tools/call` sends arguments and results return to the Agent loop | C-004, C-005, C-011 | Agent-loop reinsertion is editorial system synthesis |
| 7 | Tools, Resources and Prompts have different control patterns | C-003, C-006, C-007 | model-controlled ≠ unlimited authority |
| 8 | Shared contract reduces integration glue and supports reuse | C-001, C-002, C-004, C-010 | Avoid universal “works everywhere” promise |
| 9 | Protocol connection/authorization does not replace application safety | C-006, C-009, C-012 | Keep connection ≠ permission wording |
| 10 | Responsibility map connecting Prompt, Agent, Host and MCP | C-002, C-011, C-012 | Editorial synthesis, not protocol taxonomy |

## Freshness check before publish

- Confirm stable revision is still `2026-07-28`.
- Confirm server primitives and `tools/list` / `tools/call` names.
- Confirm authorization remains optional and scoped by transport.
- Re-open sources if publishing after 2026-10-22.
