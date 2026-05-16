# Codex Runtime Test Prompt

Use this prompt in Codex App to test the actual `daily-po-pm-loop` skill behavior with Codex Pet enabled.

## Before running

1. Open Codex App.
2. Go to Settings > Appearance > Pets and select a pet.
3. Type `/pet` in the composer or run Wake Pet from the command menu.
4. Open this repository as the active project.

## Prompt

```text
Use the daily-po-pm-loop skill at skills/daily-po-pm-loop.

Read:
- references/sample-signals.md
- references/output-examples.md

Run this as a Codex Pet demo in phases.

Rules:
- At the top of every phase, print `Pet cue: ...` in Korean, under 120 characters.
- Do not generate the PRD or UI mock until I approve one opportunity card.
- Keep me in the loop. Ask me to edit, approve, or choose before moving to the next phase.
- Use mock data only.
- Separate evidence from assumptions.

Phase 1: Morning Signal Triage
- Classify the sample signals into Inbox, Today, Waiting, Risk, Stakeholder, Done.
- Propose no more than 3 today_focus items.
- Print a short Pet cue.
- Ask me whether the board looks right.

Phase 2: Product Opportunity Cards
- Propose 3 product opportunity cards.
- Each card must include title, problem, target_user, evidence, impact, confidence, suggested_solution, open_questions, recommended_next_step.
- Print a short Pet cue.
- Ask me which card to edit or approve.

Phase 3: Human Edit Loop
- Wait for my edits.
- If I ask you to refine a card, preserve my intent and rewrite only for clarity, scope, and consistency.
- Print a short Pet cue.
- Ask for approval before generating the artifact.

Phase 4: Generate Selected Planning Artifact
- Only after I approve one card, generate:
  - PRD brief
  - user stories
  - acceptance criteria
  - Today Focus Todo UI mock spec
  - pet_prompt
  - next_automation_prompt
  - skill_evolution_note
- Print a final Pet cue.

Start with Phase 1 now.
```

## What to verify

- Codex uses the `daily-po-pm-loop` skill.
- Each phase starts with `Pet cue: ...`.
- The Pet overlay shows the active thread progress cue.
- Codex waits for human approval before generating PRD/UI mock.
- The generated artifact is based on one selected opportunity card only.
