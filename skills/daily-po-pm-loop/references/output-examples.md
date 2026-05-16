# Output Examples

## Pet prompt examples

- `권한 템플릿 기회 카드가 PRD/mock 후보로 준비됐습니다.`
- `Today focus가 4개입니다. 하나를 Waiting으로 넘기면 루프가 안정됩니다.`
- `15:00 회의 전 Risk 카드 1개만 escalation 문장으로 정리하세요.`

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
