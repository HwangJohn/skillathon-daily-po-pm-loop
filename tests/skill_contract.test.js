const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const skill = read("skills/daily-po-pm-loop/SKILL.md");
const sampleSignals = read("skills/daily-po-pm-loop/references/sample-signals.md");
const outputExamples = read("skills/daily-po-pm-loop/references/output-examples.md");
const app = read("prototype/app.js");
const data = read("prototype/data.js");

function includesAll(source, required, label) {
  for (const item of required) {
    assert(
      source.includes(item),
      `${label} should include "${item}"`
    );
  }
}

includesAll(
  skill,
  [
    "name: daily-po-pm-loop",
    "Morning Signal Triage",
    "Focus Commit",
    "Product Opportunity Triage",
    "Human Edit Loop",
    "Generate Planning Artifact",
    "pet_prompt",
    "next_automation_prompt",
    "opportunity_cards",
    "selected_artifact",
    "Generate a PRD and UI mock only for the selected card"
  ],
  "SKILL.md"
);

includesAll(
  skill,
  [
    "title",
    "problem",
    "target_user",
    "evidence",
    "impact",
    "confidence",
    "suggested_solution",
    "open_questions",
    "recommended_next_step"
  ],
  "opportunity card contract"
);

includesAll(
  sampleSignals,
  ["Outlook", "Jira", "Calendar", "Todo", "Stakeholder feedback"],
  "sample-signals.md"
);

includesAll(
  outputExamples,
  ["Pet prompt examples", "Opportunity card example", "PRD brief example"],
  "output-examples.md"
);

includesAll(
  app,
  [
    "runTriage",
    "renderOpportunities",
    "refineCard",
    "generateArtifact",
    "runGuidedDemo",
    "Today Focus",
    "카드 다듬기",
    "기획안 생성"
  ],
  "prototype/app.js"
);

includesAll(
  data,
  ["Outlook", "Jira", "Calendar", "Todo", "Feedback"],
  "prototype/data.js"
);

assert(
  app.indexOf("refineCard(first)") < app.indexOf("generateArtifact(first)"),
  "guided demo should refine the human-edited card before generating the artifact"
);

assert(
  skill.indexOf("Product Opportunity Triage") < skill.indexOf("Generate Planning Artifact"),
  "skill should propose opportunity cards before generating a planning artifact"
);

console.log("skill_contract.test.js: all checks passed");
