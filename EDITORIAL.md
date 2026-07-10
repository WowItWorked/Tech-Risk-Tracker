# Editorial policy — how the record stays accurate

This document is binding on every update run, whether performed by a human or an AI agent.
Its purpose is simple: **nothing appears on the site that cannot be traced to a fetched,
allowlisted source, and nothing is summarized beyond what those sources actually say.**

## 1. Source allowlist

Only the feeds in [sources.json](sources.json) may feed the record.
- **T1 — official/primary** (regulators, agencies, standards bodies, frontier labs' own
  publications): an item is **confirmed** on a single T1 source.
- **T2 — vetted press/trade**: an item is confirmed only when corroborated by a T1 source
  or a second independent T2 source; otherwise it enters as *pending — awaiting verification*
  (rendered italic with a hollow tick). Pending items are re-checked on every run and either
  promoted or dropped after 7 days.

Adding a source requires a human edit to sources.json — the update agent may never add one.

## 2. Grounding rule (no memory, no invention)

Every item in the record carries, verbatim from the fetched feed:
`sourceUrl`, `sourceName`, `tier`, `publishedAt`, `fetchedAt`, `origTitle`, and `origExcerpt`
(≤ 60 words copied from the feed's own title/summary). An item with no working allowlisted
URL does not exist for the purposes of this record. The update agent must never write an
item from its own background knowledge — if it wasn't fetched this run (or an earlier
logged run), it doesn't go in.

## 3. Relevance gate

The record covers technology risk to the financial sector across eight pillars:
cybersecurity, fraud, artificial intelligence, third-party risk, resilience, data risk,
physical security, insider threat. Classification must be justified by the excerpt text.
**When in doubt, exclude** — omission is cheap, a wrong inclusion is not.

## 4. Plain-language rules (executive audience)

Rewritten headlines and "why it matters" lines are for a non-technical executive:
- Say what happened and why a bank should care, in one breath each.
- Expand every acronym at first use ("the OCC — the bank's primary regulator —").
- Substitute jargon: "flaw" not "CVE/vulnerability" (keep the CVE id as machinery text),
  "criminals" not "threat actors", "backup payment routes" not "contingency rails".
- **Entailment constraint:** the rewrite may not introduce any entity, number, date,
  or causal claim absent from `origTitle`/`origExcerpt`. Adding context ("widely used
  in banking") requires a second cited source that says so.

## 5. Numbers and dates

Copied character-for-character from the source. Never computed, extrapolated, annualized,
or rounded up. If the source has no number, the summary has no number.

## 6. Assessments and confidence

Forward-looking judgments ("We assess as likely that…") are the only non-quoted content
allowed, and they must:
- cite at least one confirmed item id as basis (shown as Sources on the page),
- carry a confidence badge — high / moderate / low,
- use the probability ladder: *almost certain > likely > roughly even odds > unlikely*,
- be marked as drafted by the system (the site footer says so on every page).
No cited basis → no assessment. Confidence may never exceed what a single-source basis
supports (single T2 basis caps at low confidence; single T1 at moderate).

## 7. Verification pass (runs after drafting, every time)

A second pass re-reads every published sentence against the stored `origTitle`/`origExcerpt`
of its cited items and answers: *is every factual claim in this sentence present in the
excerpts?* Any sentence that fails is deleted or stripped to what the excerpts support.
The pass and its outcome (items checked / edited / dropped) are logged in
[data/run-log.md](data/run-log.md). A run that skips this pass is not published.

## 8. Honest emptiness

If a section has no qualifying real content yet (no weekly digest, no monthly report,
quiet news day), it shows an empty state. Fictional or backfilled history is never
published. Counts shown on the site ("N issues", "N confirmed") are computed from the
record, never typed by hand.

## 9. Corrections

A wrong item is never silently edited or deleted. It is marked `corrected` with a note
and a link to what replaced it, and the record hash advances. Challenged items are
re-verified against their primary source before any other action.
