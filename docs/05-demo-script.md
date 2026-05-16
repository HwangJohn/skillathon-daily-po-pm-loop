# Demo Script

## Opening

Daily briefings fail when they only collect information. PO/PMs already have Outlook, Jira, calendars, and todos. The missing piece is the decision loop.

## Demo

1. Open `prototype/index.html`.
   - Better for Codex App / Computer Use: run `node server.js` and open `http://127.0.0.1:4173/demo.html`.
2. Point out the Codex Pet cue at the top right.
3. Click `Run Codex Triage`.
4. Explain that mock Outlook/Jira/Calendar/Todo/Feedback signals were converted into an operating board.
5. Move attention to Product Opportunity Cards.
6. Edit the first card:
   - Make the user narrower.
   - Adjust the solution.
   - Add an open question.
7. Click `Refine Card`.
8. Explain that this preserves PO/PM intent while normalizing the card.
9. Click `Generate Plan`.
10. Show the PRD and UI mock generated from the selected card only.

## Closing line

Codex is not replacing the PO/PM. It is preserving the judgment loop, asking for the right human decisions, and turning one approved opportunity into a planning artifact.

## Suggested Codex prompt

```text
Use the daily-po-pm-loop skill. Read the sample signals, produce an operating board, propose 3 opportunity cards, wait for my edits, then generate a PRD and UI mock spec only for the selected card.
```
