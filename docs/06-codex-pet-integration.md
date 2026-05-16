# Codex Pet Integration

## What is actually integrated

Codex Pet does not currently expose a public JavaScript, CLI, or HTTP API for arbitrary notification pushes. Per the Codex app settings docs, Pet is a floating overlay that shows the active Codex thread, whether Codex is running or waiting, and a short progress prompt.

Therefore this project integrates with Pet by making the Codex Skill emit short progress prompts in the active thread.

## Codex App vs CLI

- **Codex App**: use this for the real Pet overlay demo. Enable Pet and run the skill in the active thread.
- **Codex CLI**: can test the skill flow and `Pet cue: ...` text, but cannot display the Pet overlay.
- **Browser prototype**: visually mirrors Pet cues in the top-right area, but does not connect to the real Codex Pet.

## How to demo with real Codex Pet

1. Open Codex App.
2. Go to Settings > Appearance > Pets and select a pet.
3. Type `/pet` in the composer or run Wake Pet from the command menu.
4. Run the skill prompt:

```text
Use the daily-po-pm-loop skill at skills/daily-po-pm-loop.
Read references/sample-signals.md.
Run the demo in phases. At the top of every phase, print `Pet cue: ...` in under 120 characters so Codex Pet can show the active progress prompt.
First triage the signals, then propose opportunity cards and wait for my edits. Do not generate the PRD/UI mock until I approve one card.
```

## Expected Pet cues

- `Pet cue: 업무 신호를 Today, Waiting, Risk로 정리했습니다.`
- `Pet cue: 기획 후보 3개가 준비됐습니다. 하나를 고쳐 승인하세요.`
- `Pet cue: 카드 문장을 다듬었습니다. 선택하면 PRD/mock을 만듭니다.`
- `Pet cue: 승인된 카드 1개에서 PRD와 Today Focus mock을 만들었습니다.`

## Prototype behavior

The browser prototype mirrors those cues in the top-right Pet prompt area. That area is not the real Codex Pet; it is a visual mirror for the Skillthon demo.

## Boundary

This project does not claim to push notifications directly into Codex Pet. The real Pet integration path is active-thread progress prompting.
