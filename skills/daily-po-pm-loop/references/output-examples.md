# Output Examples

## Pet prompt examples

- `권한 템플릿 기회 카드가 PRD/mock 후보로 준비됐습니다.`
- `Today focus가 4개입니다. 하나를 Waiting으로 넘기면 루프가 안정됩니다.`
- `15:00 회의 전 Risk 카드 1개만 escalation 문장으로 정리하세요.`

## Demo page Pet cue state examples

Use these as the prototype's internal cue state when the workflow is shown on the standalone page. The page should not show these as a fake Pet notification by default; the real Pet should surface `Pet cue: ...` from the active Codex thread.

- `운영 보드 업데이트: 업무 신호 12개를 Today, Waiting, Risk, Stakeholder로 분류했습니다.`
- `후보 카드 변경: 첫 번째 카드의 대상 사용자, 해결책, 열린 질문을 사람이 수정했습니다.`
- `후보 카드 변경: 카드 다듬기로 문제, 임팩트, 해결책 문장을 정리했습니다.`
- `산출물 생성 중: 승인된 카드 1개만 PRD 초안으로 확장합니다.`
- `산출물 생성 중: Today Focus Todo mock의 섹션과 우선순위 상태를 구성합니다.`
- `산출물 생성 완료: PRD와 Today Focus Todo mock이 승인된 카드에서 생성됐습니다.`

## Skill Pet cue examples

Use these when the `daily-po-pm-loop` skill is actually running in a Codex thread.

- `Pet cue: 운영 보드 업데이트: 업무 신호를 Today, Waiting, Risk로 정리했습니다.`
- `Pet cue: 후보 카드 변경: 카드 문장을 다듬었습니다. 선택하면 PRD/mock을 만듭니다.`
- `Pet cue: 산출물 생성 중: 승인된 카드 1개로 PRD 초안을 작성합니다.`
- `Pet cue: 산출물 생성 완료: PRD와 Today Focus mock이 준비됐습니다.`

## Opportunity card example

```json
{
  "title": "Admin permission templates",
  "problem": "Enterprise admins repeat the same permission setup during onboarding and miss required settings.",
  "target_user": "Workspace admin at enterprise customers",
  "evidence": ["Customer escalation", "Jira PROD-422", "CS feedback"],
  "impact": "Reduce onboarding delay and support tickets",
  "confidence": "Medium",
  "suggested_solution": "Reusable permission template picker in onboarding",
  "open_questions": ["Which roles need templates first?", "Who can edit templates?"],
  "recommended_next_step": "Generate PRD and low-fidelity settings mock"
}
```

## PRD brief example

Include:

- Problem
- Target user
- Evidence
- Goals
- Non-goals
- User stories
- Acceptance criteria
- UI mock spec
- Risks
