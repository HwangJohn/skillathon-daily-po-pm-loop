# Daily PO/PM Loop Skillthon Prototype

This workspace contains a Codex Skillthon prototype for a PO/PM daily operating loop.

## Concept

The demo shows a human-in-the-loop PO/PM workflow. Codex does not immediately generate an app. It first turns daily work signals into an operating board and editable opportunity cards. The PO/PM edits and approves one card, then Codex expands only that card into a PRD and Today Focus Todo mock.

```mermaid
flowchart LR
  A[Daily work signals<br/>Outlook, Jira, Calendar, Todo, Feedback] --> B[Codex Skill<br/>Daily PO/PM Loop]
  B --> C[Operating Board<br/>Today, Waiting, Risk, Stakeholder]
  C --> D[Product Opportunity Cards]
  D --> E{PO/PM HITL Review}
  E -->|edit/add/delete| D
  E -->|approve one card| F[Planning Artifact]
  F --> G[PRD Brief]
  F --> H[Today Focus Todo UI Mock]
  B --> I[Pet Prompt<br/>ambient cue]
  B --> J[Next Automation Prompt]
```

## Skill Structure

The Codex Skill is intentionally small in `SKILL.md` and keeps examples in `references/` so another Codex thread can load only what it needs.

```mermaid
flowchart TB
  S[skills/daily-po-pm-loop] --> M[SKILL.md<br/>workflow, guardrails, output contract]
  S --> R[references]
  R --> RS[sample-signals.md<br/>mock Outlook/Jira/Calendar/Todo/Feedback]
  R --> RO[output-examples.md<br/>pet prompts, opportunity card, PRD style]
  S --> A[agents/openai.yaml<br/>display metadata]
  M --> W[Morning Signal Triage]
  M --> F[Focus Commit]
  M --> O[Product Opportunity Triage]
  M --> H[Human Edit Loop]
  M --> P[Generate Selected PRD/UI Mock]
  M --> E[End-of-day Review<br/>skill evolution note]
```

## What is included

- `skills/daily-po-pm-loop/`: Codex Skill package
- `prototype/`: static local demo app
- `docs/`: summarized event-guide notes and submission strategy
- `SUBMISSION.md`: Skillathon submission summary

## Run the demo

Option 1: open this file in a browser:

```text
prototype/index.html
```

Option 2: run the local preview server:

```powershell
node server.js
```

Then open:

```text
http://127.0.0.1:4173/
http://127.0.0.1:4173/demo.html
```

Demo flow:

1. Click `Run Codex Triage`.
2. Review the operating board.
3. Edit or add a product opportunity card.
4. Click `Refine Card`.
5. Click `Generate Plan`.
6. Show the generated PRD and UI mock preview.

## Skillthon positioning

This is not a todo app. It is a Codex-native PO/PM workflow skill that turns daily signals into human-approved product opportunities and generates a planning mock only after the PO/PM selects a card.

## Submission links

For reviewers:

- Start here: `SUBMISSION.md`
- Skill: `skills/daily-po-pm-loop/SKILL.md`
- Demo: `http://127.0.0.1:4173/demo.html` after running `node server.js`
