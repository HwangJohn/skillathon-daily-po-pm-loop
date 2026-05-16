window.DEMO_SIGNALS = [
  { id: "mail-1", source: "Outlook", title: "팀 todo가 메일, Slack, Jira에 흩어져 있음", detail: "기획팀 리드가 오늘 해야 할 일을 한 화면에서 보고 싶다고 요청했습니다.", type: "stakeholder", priority: "High" },
  { id: "mail-2", source: "Outlook", title: "회의 후 액션아이템 누락", detail: "어제 회의에서 나온 후속 작업 3개가 Jira나 개인 todo에 등록되지 않았습니다.", type: "risk", priority: "High" },
  { id: "mail-3", source: "Outlook", title: "매일 아침 브리핑을 잘 안 보게 됨", detail: "정보는 많지만 오늘 무엇을 먼저 해야 하는지 결정하기 어렵다는 피드백이 있었습니다.", type: "product_opportunity", priority: "High" },
  { id: "jira-101", source: "Jira", title: "TODO-101 오늘 focus 3개만 보여주는 보드 요청", detail: "사용자가 하루에 실제로 처리할 핵심 업무를 3개로 제한하고 싶어합니다.", type: "product_opportunity", priority: "High" },
  { id: "jira-102", source: "Jira", title: "TODO-102 대기 중인 업무가 묻힘", detail: "다른 사람 답변을 기다리는 일이 개인 todo와 섞여 후속 확인이 늦어집니다.", type: "todo", priority: "Medium" },
  { id: "jira-103", source: "Jira", title: "TODO-103 위험한 todo를 따로 표시", detail: "마감이 임박했거나 blocker가 있는 업무를 일반 todo와 분리하고 싶습니다.", type: "risk", priority: "Medium" },
  { id: "cal-1", source: "Calendar", title: "10:00 데일리 스탠드업", detail: "오늘 focus와 blocker를 짧게 공유해야 합니다.", type: "decision", priority: "Medium" },
  { id: "cal-2", source: "Calendar", title: "16:30 팀 마감 체크", detail: "대기 중인 todo와 내일로 넘길 일을 정리해야 합니다.", type: "decision", priority: "Medium" },
  { id: "todo-1", source: "Todo", title: "회의록에서 액션아이템 추출", detail: "회의록을 읽고 담당자와 마감일이 있는 todo로 바꾸는 기능 아이디어입니다.", type: "product_opportunity", priority: "Medium" },
  { id: "todo-2", source: "Todo", title: "모바일에서 빠른 todo 추가", detail: "이동 중에도 10초 안에 오늘 할 일을 추가하고 싶다는 요청이 있었습니다.", type: "todo", priority: "Low" },
  { id: "fb-1", source: "Feedback", title: "알림은 많지만 행동으로 이어지지 않음", detail: "사용자는 알림보다 '지금 결정할 것 하나'를 원한다고 말했습니다.", type: "product_opportunity", priority: "High" },
  { id: "fb-2", source: "Feedback", title: "팀 공유용 상태판이 필요함", detail: "오늘 내가 하는 일, 대기 중인 일, 위험한 일을 팀원이 빠르게 보고 싶어합니다.", type: "stakeholder", priority: "Medium" }
];
