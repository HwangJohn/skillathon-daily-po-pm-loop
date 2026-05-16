---
name: daily-po-pm-loop
description: Use when a PO/PM needs to triage daily work signals from email, Jira, calendar, todos, or stakeholder feedback into a human-in-the-loop operating board, product opportunity cards, stakeholder actions, Pet prompts, automation prompts, and one selected PRD/UI mock planning artifact.
---

# Daily PO/PM Loop

Guide a PO/PM through a decision-first daily operating loop. Do not produce a long briefing by default. Ask short questions, preserve user edits, and generate product planning artifacts only after the user selects an opportunity card.

## Inputs

Accept any of:

- Signal bundle from Outlook, Jira, Calendar, Todo, Slack, customer feedback, or stakeholder notes
- Mock signal data
- Existing operating board cards
- User-edited product opportunity cards

When real connectors are unavailable, proceed with mock data and state that the result is a demo workflow.

## Core Workflow

1. **Morning Signal Triage**
   - Classify signals as `info`, `decision`, `risk`, `stakeholder`, `todo`, or `product_opportunity`.
   - Remove duplicates and low-value noise.
   - Ask the user to confirm ambiguous items instead of deciding silently.

2. **Focus Commit**
   - Select no more than 3 `today_focus` items.
   - Each focus item needs a completion criterion, next action, owner, and stakeholder impact.

3. **Product Opportunity Triage**
   - Propose 3 to 5 opportunity cards from risk, stakeholder, Jira, and feedback signals.
   - Keep evidence and assumptions separate.
   - Do not generate a PRD or UI mock yet.

4. **Human Edit Loop**
   - Let the user add, delete, merge, and edit opportunity cards.
   - When asked to refine a card, preserve the user's intent and rewrite only for clarity, scope, and consistency.
   - Ask one clarifying question if a card lacks a target user, problem, or evidence.

5. **Generate Planning Artifact**
   - Generate a PRD and UI mock only for the selected card.
   - Include problem, target user, evidence, goals, non-goals, user stories, acceptance criteria, risks, and UI sections.
   - Keep the first mock narrow enough to validate the idea.

6. **End-of-day Review**
   - Summarize done, waiting, risk, and carry-over items.
   - Produce one `skill_evolution_note` that improves tomorrow's workflow.

## Output Contract

Return structured Markdown or JSON with these sections when relevant:

```json
{
  "board_update": {
    "columns": ["Inbox", "Today", "Waiting", "Risk", "Stakeholder", "Done"],
    "cards": []
  },
  "today_focus": [],
  "opportunity_cards": [],
  "selected_artifact": {
    "prd_brief": {},
    "user_stories": [],
    "acceptance_criteria": [],
    "ui_mock_spec": {}
  },
  "pet_prompt": "",
  "next_automation_prompt": "",
  "skill_evolution_note": ""
}
```

## Opportunity Card Shape

Each card should contain:

- `title`
- `problem`
- `target_user`
- `evidence`
- `impact`
- `confidence`
- `suggested_solution`
- `open_questions`
- `recommended_next_step`

## Pet Prompt Rules

Treat Codex Pet as an ambient cue surface, not a guaranteed push notification API.

- Keep `pet_prompt` under 120 characters.
- Mention one action or decision.
- Avoid generic status text.
- Example: `릴리즈 리스크 1건만 결정하면 오늘 focus가 잠깁니다.`

## Automation Prompt Rules

Create a prompt the user could schedule later.

- Include when to run.
- Include which board slices to inspect.
- Include what question to ask the PO/PM.

Example:

`오늘 13:00에 Waiting과 Risk 카드만 다시 보고, done/defer/escalate 중 하나를 고르게 질문해줘.`

## References

- Read `references/sample-signals.md` for demo input.
- Read `references/output-examples.md` for expected demo output style.
