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

Use Codex Pet through the active Codex thread. Codex Pet does not expose a public push-notification API; it shows the active thread state and short progress prompts in the floating overlay. Therefore, every major workflow phase must emit a short `Pet cue:` line in the Codex response so the active thread has a glanceable progress prompt.

- Keep `pet_prompt` under 120 characters.
- Mention one action or decision.
- Avoid generic status text.
- Put the current `pet_prompt` near the top of each phase response as `Pet cue: ...`.
- When waiting for user input, make the Pet cue describe the next human decision.
- In demo mode, update the Pet cue at least for triage, opportunity review, card refinement, and selected artifact generation.
- Example: `릴리즈 리스크 1건만 결정하면 오늘 focus가 잠깁니다.`

### Codex App Pet Demo Procedure

When the user wants to demonstrate this skill with Codex Pet:

1. Ask the user to enable Codex Pets in Settings > Appearance > Pets if it is not already enabled.
2. Ask the user to type `/pet` or run Wake Pet from the command menu.
3. Run this skill in the active thread.
4. At each phase, start with `Pet cue: ...`.
5. Keep the active thread waiting for the user's edit/approval decision before generating the PRD/UI mock.

Demo Pet cues:

- `Pet cue: 업무 신호를 Today, Waiting, Risk로 정리했습니다.`
- `Pet cue: 기획 후보 3개가 준비됐습니다. 하나를 고쳐 승인하세요.`
- `Pet cue: 카드 문장을 다듬었습니다. 선택하면 PRD/mock을 만듭니다.`
- `Pet cue: 승인된 카드 1개에서 PRD와 Today Focus mock을 만들었습니다.`

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
