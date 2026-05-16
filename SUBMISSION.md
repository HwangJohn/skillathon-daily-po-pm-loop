# Skillathon Submission

## Project

**Daily PO/PM Loop Skill**

A Codex Skillthon prototype for PO/PMs who need to turn scattered daily work signals into a human-in-the-loop decision flow. The workflow triages mock Outlook/Jira/Calendar/Todo/Feedback signals, proposes product opportunity cards, lets the human edit/refine them, and generates a PRD plus Today Focus Todo mock only from one selected card.

## Problem

Daily briefings collect information but often fail to help PO/PMs decide what to do next. The useful loop is not "show more information"; it is:

1. Identify the signals that need judgment.
2. Convert them into editable opportunity cards.
3. Let the PO/PM refine and approve one card.
4. Generate a planning artifact and screen mock from the approved card.

## Main Artifacts

| Artifact | Path |
| --- | --- |
| Codex Skill | `skills/daily-po-pm-loop/SKILL.md` |
| Skill references | `skills/daily-po-pm-loop/references/` |
| Local prototype | `prototype/index.html` |
| Auto demo page | `prototype/demo.html` |
| Local preview server | `server.js` |
| Guide notes | `docs/` |

## How to Run

Run the local preview server:

```powershell
node server.js
```

Open the manual demo:

```text
http://127.0.0.1:4173/
```

Open the auto demo:

```text
http://127.0.0.1:4173/demo.html
```

The prototype can also be opened directly from `prototype/index.html`, but the local server is better for Codex App / Computer Use demos.

## Demo Flow

1. Click `Codex Triage 실행`.
2. Review the operating board built from mock work signals.
3. Review product opportunity cards.
4. Edit the first card or click `천천히 데모 실행`.
5. Click `카드 다듬기`.
6. Click `기획안 생성`.
7. Confirm that the selected card generates a PRD and Today Focus Todo screen mock.

## Codex Skill Prompt

```text
Use the daily-po-pm-loop skill. Read the sample signals, produce an operating board, propose 3 opportunity cards, wait for my edits, then generate a PRD and UI mock spec only for the selected card.
```

## Codex Pet Demo Prompt

Codex Pet is integrated through the active Codex thread rather than a separate push API. Enable Codex Pet in Settings > Appearance > Pets, then type `/pet` or use Wake Pet. Run this prompt in the active thread:

```text
Use the daily-po-pm-loop skill at skills/daily-po-pm-loop.
Read references/sample-signals.md.
Run the demo in phases. At the top of every phase, print `Pet cue: ...` in under 120 characters so Codex Pet can show the active progress prompt.
First triage the signals, then propose opportunity cards and wait for my edits. Do not generate the PRD/UI mock until I approve one card.
```

## Validation

- `node --check prototype/app.js`: passed.
- `node --check server.js`: passed.
- `node tests/skill_contract.test.js`: passed.
- `http://127.0.0.1:4173/demo.html`: returned HTTP 200.
- Secret scan by filename patterns for key/token/secret/env/pem/p12/credentials: no matching files found.

## Guardrails

- Uses mock data only.
- Does not connect to Outlook, Jira, Slack, or internal systems.
- Does not include API keys, tokens, webhook URLs, customer data, or company-private data.
- Generates a PRD/mock only after a user-approved opportunity card.

## Limits and Next Steps

- Replace mock signals with MCP or CLI adapters for real systems.
- Codex Pet uses active-thread progress prompts; this submission emits `Pet cue:` lines from the skill and mirrors them in the visual prototype.
- Add Codex automation prompts for morning triage, midday replan, and end-of-day review.
- Add eval prompts for common PO/PM scenarios.
- Add screenshots or a short screen recording before final GitHub submission if required by the event form.
