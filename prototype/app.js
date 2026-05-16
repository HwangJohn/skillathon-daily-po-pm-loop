const columns = ["Inbox", "Today", "Waiting", "Risk", "Stakeholder", "Done"];

let boardCards = [];
let opportunities = [];

const board = document.getElementById("board");
const opportunityList = document.getElementById("opportunities");
const petPrompt = document.getElementById("petPrompt");
const prd = document.getElementById("prd");
const uiMock = document.getElementById("uiMock");
const artifactState = document.getElementById("artifactState");

function announcePet(message) {
  window.currentPetCue = message;
  window.petCueLog = [...(window.petCueLog || []), message];
  petPrompt.textContent = message;
  document.dispatchEvent(new CustomEvent("daily-po-pm-pet-cue", { detail: { message } }));
}

function classifySignal(signal) {
  if (signal.type === "risk") return "Risk";
  if (signal.type === "stakeholder") return "Stakeholder";
  if (signal.type === "decision" || signal.priority === "High") return "Today";
  if (signal.type === "todo") return "Waiting";
  return "Inbox";
}

function runTriage() {
  boardCards = window.DEMO_SIGNALS.map((signal) => ({
    ...signal,
    status: classifySignal(signal),
    nextAction: nextActionFor(signal),
    petPrompt: petPromptFor(signal)
  }));

  opportunities = [
    {
      id: crypto.randomUUID(),
      title: "Today Focus Todo 보드",
      problem: "사용자가 매일 많은 브리핑과 todo를 받지만 오늘 반드시 처리할 핵심 3개를 고르기 어렵습니다.",
      targetUser: "업무 todo가 여러 도구에 흩어진 PO/PM과 팀 리드",
      evidence: "브리핑 미확인 피드백, TODO-101, 데일리 스탠드업 일정",
      impact: "하루 시작 시 우선순위 결정을 빠르게 만들고 불필요한 todo 확인 시간을 줄입니다.",
      confidence: "High",
      solution: "오늘 focus 3개, 대기 중인 일, 위험한 일을 한 화면에 보여주는 개인 운영 보드를 만듭니다.",
      openQuestions: "focus 3개는 사용자가 직접 고르나요, Codex가 먼저 추천하나요?"
    },
    {
      id: crypto.randomUUID(),
      title: "회의록 액션아이템 변환",
      problem: "회의 후 액션아이템이 Jira나 개인 todo에 등록되지 않아 후속 작업이 누락됩니다.",
      targetUser: "회의를 자주 진행하는 PM과 팀 리드",
      evidence: "회의 후 액션아이템 누락 메일, 회의록 추출 todo",
      impact: "회의 직후 담당자와 마감일이 있는 todo 초안을 빠르게 생성합니다.",
      confidence: "Medium",
      solution: "회의록 텍스트에서 액션아이템 후보를 카드로 만들고 사용자가 승인한 것만 todo로 등록합니다.",
      openQuestions: "담당자와 마감일이 없는 항목은 질문으로 되물어야 하나요?"
    },
    {
      id: crypto.randomUUID(),
      title: "행동 중심 알림 cue",
      problem: "알림은 많지만 사용자가 실제로 지금 무엇을 결정해야 하는지 알기 어렵습니다.",
      targetUser: "마감과 blocker가 많은 지식근로자",
      evidence: "알림 피드백, TODO-103, 16:30 팀 마감 체크",
      impact: "알림을 줄이고 '지금 결정할 것 하나'를 보여줘 실행 가능성을 높입니다.",
      confidence: "Medium",
      solution: "위험한 todo에 대해 한 문장 cue와 done/defer/escalate 선택지를 제공합니다.",
      openQuestions: "cue는 하루 몇 번까지 허용해야 방해가 되지 않나요?"
    }
  ];

  artifactState.textContent = "선택 대기 중";
  prd.innerHTML = "";
  uiMock.className = "ui-mock empty";
  uiMock.textContent = "기획 후보 카드를 선택하고 기획안 생성을 누르세요.";
  render();
  announcePet("운영 보드 업데이트: 업무 신호 12개를 Today, Waiting, Risk, Stakeholder로 분류했습니다.");
}

function nextActionFor(signal) {
  if (signal.type === "risk") return "에스컬레이션 문장 작성";
  if (signal.type === "stakeholder") return "이해관계자 업데이트 초안 작성";
  if (signal.type === "decision") return "의사결정 오너 확정";
  if (signal.type === "product_opportunity") return "기획 후보 카드로 전환";
  return "검토하거나 연기";
}

function petPromptFor(signal) {
  if (signal.priority === "High") return `${signal.title} 항목만 먼저 결정하세요.`;
  return `${signal.source} 신호를 Waiting 또는 Done으로 정리하세요.`;
}

function renderBoard() {
  board.innerHTML = "";
  columns.forEach((column) => {
    const columnEl = document.createElement("section");
    columnEl.className = "column";
    const cards = boardCards.filter((card) => card.status === column);
    columnEl.innerHTML = `<h3>${column}<span>${cards.length}</span></h3>`;
    cards.forEach((card) => {
      const cardEl = document.createElement("article");
      cardEl.className = "card";
      cardEl.innerHTML = `
        <div class="card-title">${escapeHtml(card.title)}</div>
        <div class="card-meta">
          <span class="tag">${escapeHtml(card.source)}</span>
          <span class="tag ${card.priority === "High" ? "high" : ""}">${escapeHtml(card.priority)}</span>
        </div>
        <p class="card-detail">${escapeHtml(card.detail)}</p>
        <p class="card-detail"><strong>다음 액션:</strong> ${escapeHtml(card.nextAction)}</p>
      `;
      columnEl.appendChild(cardEl);
    });
    board.appendChild(columnEl);
  });
}

function renderOpportunities() {
  opportunityList.innerHTML = "";
  opportunities.forEach((card) => {
    const el = document.createElement("article");
    el.className = "opp-card";
    el.innerHTML = `
      <label>제목</label>
      <input value="${escapeAttr(card.title)}" data-field="title" data-id="${card.id}">
      <label>문제</label>
      <textarea rows="3" data-field="problem" data-id="${card.id}">${escapeHtml(card.problem)}</textarea>
      <label>대상 사용자</label>
      <input value="${escapeAttr(card.targetUser)}" data-field="targetUser" data-id="${card.id}">
      <label>근거</label>
      <textarea rows="2" data-field="evidence" data-id="${card.id}">${escapeHtml(card.evidence)}</textarea>
      <label>임팩트</label>
      <textarea rows="2" data-field="impact" data-id="${card.id}">${escapeHtml(card.impact)}</textarea>
      <label>신뢰도</label>
      <select data-field="confidence" data-id="${card.id}">
        ${["Low", "Medium", "High"].map((value) => `<option ${value === card.confidence ? "selected" : ""}>${value}</option>`).join("")}
      </select>
      <label>제안 해결책</label>
      <textarea rows="2" data-field="solution" data-id="${card.id}">${escapeHtml(card.solution)}</textarea>
      <label>열린 질문</label>
      <textarea rows="2" data-field="openQuestions" data-id="${card.id}">${escapeHtml(card.openQuestions)}</textarea>
      <div class="opp-actions">
        <button class="secondary" data-action="refine" data-id="${card.id}">카드 다듬기</button>
        <button data-action="generate" data-id="${card.id}">기획안 생성</button>
        <button class="secondary" data-action="delete" data-id="${card.id}">삭제</button>
      </div>
    `;
    opportunityList.appendChild(el);
  });
}

function addOpportunity() {
  opportunities.unshift({
    id: crypto.randomUUID(),
    title: "새 제품 기획 후보",
    problem: "사용자 문제를 적어주세요.",
    targetUser: "대상 사용자를 정의해주세요.",
    evidence: "근거가 되는 업무 신호를 추가해주세요.",
    impact: "사용자 또는 비즈니스 영향을 적어주세요.",
    confidence: "Low",
    solution: "작고 검증 가능한 해결책을 적어주세요.",
    openQuestions: "가장 위험한 미확인 질문을 적어주세요."
  });
  renderOpportunities();
  announcePet("후보 카드 변경: 새 제품 기획 후보가 추가됐습니다. 문제, 사용자, 근거를 먼저 채우세요.");
}

function updateField(event) {
  const target = event.target;
  const id = target.dataset.id;
  const field = target.dataset.field;
  if (!id || !field) return;
  const card = opportunities.find((item) => item.id === id);
  if (card) {
    card[field] = target.value;
    announcePet(`후보 카드 변경: '${fieldLabel(field)}' 항목이 수정됐습니다. 승인 전 카드에만 반영됩니다.`);
  }
}

async function handleOpportunityAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const id = button.dataset.id;
  const action = button.dataset.action;
  const card = opportunities.find((item) => item.id === id);
  if (!card) return;

  if (action === "delete") {
    opportunities = opportunities.filter((item) => item.id !== id);
    renderOpportunities();
    announcePet("후보 카드 변경: 카드가 삭제됐습니다. 남은 후보 중 하나만 PRD/mock으로 확장하세요.");
    return;
  }

  if (action === "refine") {
    refineCard(card);
    renderOpportunities();
    announcePet("후보 카드 변경: 카드 다듬기로 문제, 임팩트, 해결책 문장을 정리했습니다.");
    return;
  }

  if (action === "generate") {
    await generateArtifact(card, { progress: true });
  }
}

function fieldLabel(field) {
  return {
    title: "제목",
    problem: "문제",
    targetUser: "대상 사용자",
    evidence: "근거",
    impact: "임팩트",
    confidence: "신뢰도",
    solution: "제안 해결책",
    openQuestions: "열린 질문"
  }[field] || field;
}

function refineCard(card) {
  card.problem = tighten(card.problem, "사용자 문제");
  card.impact = tighten(card.impact, "기대 임팩트");
  card.solution = tighten(card.solution, "작은 첫 해결책");
  if (!card.openQuestions.includes("?") && !card.openQuestions.includes("나요")) {
    card.openQuestions = `${card.openQuestions} 구현 전에 반드시 검증할 가정은 무엇인가요?`;
  }
}

function tighten(text, prefix) {
  const trimmed = text.trim().replace(/\s+/g, " ");
  if (trimmed.startsWith(`${prefix}:`)) return trimmed;
  return `${prefix}: ${trimmed}`;
}

async function generateArtifact(card, options = {}) {
  if (options.progress) {
    artifactState.textContent = "PRD 초안 작성 중";
    announcePet("산출물 생성 중: 승인된 카드 1개만 PRD 초안으로 확장합니다.");
    await wait(900);

    artifactState.textContent = "화면 mock 구성 중";
    announcePet("산출물 생성 중: Today Focus Todo mock의 섹션과 우선순위 상태를 구성합니다.");
    await wait(900);
  }

  artifactState.textContent = "선택된 카드에서 생성됨";
  announcePet("산출물 생성 완료: PRD와 Today Focus Todo mock이 승인된 카드에서 생성됐습니다.");

  prd.innerHTML = `
    <h3>${escapeHtml(card.title)}</h3>
    <p><strong>문제:</strong> ${escapeHtml(card.problem)}</p>
    <p><strong>대상 사용자:</strong> ${escapeHtml(card.targetUser)}</p>
    <p><strong>근거:</strong> ${escapeHtml(card.evidence)}</p>
    <p><strong>목표:</strong> ${escapeHtml(card.impact)}</p>
    <p><strong>비목표:</strong> 전체 업무 자동화, 모든 외부 도구 연동, 팀 단위 권한 관리는 이번 범위에서 제외합니다.</p>
    <h4>사용자 스토리</h4>
    <ul>
      <li>${escapeHtml(card.targetUser)}로서, 오늘 반드시 처리할 focus를 빠르게 고를 수 있습니다.</li>
      <li>PO/PM으로서, Waiting과 Risk todo를 일반 todo와 분리해서 볼 수 있습니다.</li>
      <li>팀 리드로서, 데일리 전에 blocker와 follow-up 대상을 확인할 수 있습니다.</li>
    </ul>
    <h4>인수 기준</h4>
    <ul>
      <li>화면은 Today focus를 최대 3개까지만 보여줍니다.</li>
      <li>사용자는 todo를 Today, Waiting, Risk, Done 중 하나로 옮길 수 있습니다.</li>
      <li>Risk todo는 다음 행동 cue와 함께 표시됩니다.</li>
    </ul>
  `;

  uiMock.className = "ui-mock";
  uiMock.innerHTML = `
    <section class="todo-shell">
      <div class="todo-topbar">
        <div>
          <h3>Today Focus</h3>
          <p>Codex가 추천하고 PO/PM이 승인한 오늘의 핵심 업무</p>
        </div>
        <span class="todo-pill">Focus 3/3</span>
      </div>
      <div class="todo-add">
        <input value="새 todo를 10초 안에 추가하기" aria-label="quick add">
        <button>추가</button>
      </div>
      <div class="todo-sections">
        <section class="todo-section">
          <h4>오늘 focus</h4>
          <div class="todo-item">
            <span class="todo-check"></span>
            <div>
              <strong>${escapeHtml(card.title)}</strong>
              <span>${escapeHtml(card.solution)}</span>
            </div>
            <span class="todo-pill">PM</span>
          </div>
          <div class="todo-item">
            <span class="todo-check"></span>
            <div>
              <strong>회의록 액션아이템 정리</strong>
              <span>담당자와 마감일이 있는 항목만 todo 후보로 변환</span>
            </div>
            <span class="todo-pill">30m</span>
          </div>
          <div class="todo-item">
            <span class="todo-check"></span>
            <div>
              <strong>데일리 전 blocker 공유</strong>
              <span>Risk todo 1개를 팀 채널에 공유</span>
            </div>
            <span class="todo-pill">10:00</span>
          </div>
        </section>
        <section class="todo-section">
          <h4>Waiting / Risk</h4>
          <div class="todo-item waiting">
            <span class="todo-check"></span>
            <div>
              <strong>Jira 업데이트 대기</strong>
              <span>개발 리드 답변 후 Done 또는 Risk로 이동</span>
            </div>
            <span class="todo-pill">대기</span>
          </div>
          <div class="todo-item risk">
            <span class="todo-check"></span>
            <div>
              <strong>액션아이템 누락 위험</strong>
              <span>지금 결정할 것 하나: 담당자 없는 항목 처리 방식</span>
            </div>
            <span class="todo-pill">cue</span>
          </div>
        </section>
      </div>
    </section>
  `;
}

async function runGuidedDemo() {
  runTriage();
  announcePet("운영 보드 업데이트: 업무 신호를 실행 가능한 Today, Waiting, Risk 항목으로 정리했습니다.");
  highlight(".board");
  await wait(1800);

  const first = opportunities[0];
  first.targetUser = "매일 여러 도구에서 todo를 확인하는 PO/PM";
  first.solution = "오늘 focus 3개를 상단에 고정하고, Waiting과 Risk todo를 아래에서 분리해 보여줍니다.";
  first.openQuestions = "focus 3개 초안은 Codex가 추천하고 사용자가 승인하는 흐름이 맞나요?";
  renderOpportunities();
  announcePet("후보 카드 변경: 첫 번째 카드의 대상 사용자, 해결책, 열린 질문을 사람이 수정했습니다.");
  highlight(".opportunity-list");
  await wait(2200);

  refineCard(first);
  renderOpportunities();
  announcePet("후보 카드 변경: 카드 다듬기로 문제, 임팩트, 해결책 문장을 정리했습니다.");
  highlight(".opportunity-list");
  await wait(2200);

  await generateArtifact(first, { progress: true });
  highlight(".mock");
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function highlight(selector) {
  document.querySelectorAll(".demo-highlight").forEach((el) => el.classList.remove("demo-highlight"));
  const el = document.querySelector(selector);
  if (!el) return;
  el.classList.add("demo-highlight");
  el.scrollIntoView({ behavior: "smooth", block: "center" });
}

function render() {
  renderBoard();
  renderOpportunities();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

document.getElementById("runTriage").addEventListener("click", runTriage);
document.getElementById("runDemo").addEventListener("click", runGuidedDemo);
document.getElementById("addCard").addEventListener("click", addOpportunity);
opportunityList.addEventListener("input", updateField);
opportunityList.addEventListener("click", handleOpportunityAction);

runTriage();

if (window.AUTO_DEMO || new URLSearchParams(window.location.search).get("demo") === "1") {
  setTimeout(runGuidedDemo, 700);
}
