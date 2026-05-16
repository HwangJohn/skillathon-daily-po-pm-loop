# Skillthon Requirements Summary

## What the guides say

Skillthon is about turning a repeatable task into a reusable Codex Skill. A good submission includes:

- A clear problem and target user
- Mock data or sample input
- A repeatable execution prompt
- `SKILL.md`
- Expected output shape
- Validation checklist
- Known limits and next expansion ideas

The recommended flow is:

1. Define the problem and user.
2. Create mock data.
3. Produce an example result.
4. Convert the successful process into `SKILL.md`.
5. Add a validation checklist.

## What this means for Daily PO/PM Loop

The submission should not be positioned as a todo app. It should be positioned as:

> A reusable Codex Skill that guides a PO/PM through daily signal triage, HITL opportunity selection, and product-planning mock generation.

## In scope

- Mock Outlook/Jira/Calendar/Todo/Stakeholder signals
- Daily triage workflow
- Product opportunity cards
- Human edits before generation
- PRD and UI mock generated from one selected opportunity
- Pet prompt and automation prompt outputs

## Out of scope

- Real Outlook/Jira/Slack API integration
- Real push notifications
- Production-grade product design
- Multi-user persistence
- Enterprise security model

## Submission checklist

- Problem statement is easy to say in 30 seconds.
- Mock data is included.
- Skill folder is included.
- Prototype can run locally by opening `prototype/index.html`.
- Demo script shows HITL decision points.
- Validation criteria are explicit.
