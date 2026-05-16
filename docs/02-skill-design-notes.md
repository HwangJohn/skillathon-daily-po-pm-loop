# Skill Design Notes

## Skill name

`daily-po-pm-loop`

## Trigger intent

Use this skill when a PO/PM wants to turn daily work signals into:

- Focus priorities
- Risk and stakeholder actions
- Product opportunity cards
- A selected planning artifact with PRD and UI mock

## Design principles

- Ask short decision questions instead of dumping a long briefing.
- Keep the user in the loop before generating product plans.
- Treat external systems as signal sources, not the source of truth.
- Use mock data first.
- Preserve user edits when refining opportunity cards.
- Generate a full planning mock only for one selected card.

## Progressive disclosure

`SKILL.md` should contain the operating workflow and output contract. Detailed sample data and examples live in `references/`.

## Reusability criteria

The skill is reusable if another PO/PM can provide a similar signal bundle and get:

1. A concise daily board
2. Three or fewer focus items
3. Opportunity cards
4. A selected PRD/mock artifact
5. A next automation prompt

## Quality checks

- The skill should not make up facts that are not in the signal bundle.
- It should separate evidence from assumptions.
- It should ask the user before turning an opportunity into a product plan.
- It should include non-goals in the PRD to prevent overbuilding.
