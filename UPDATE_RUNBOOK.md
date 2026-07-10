# Daily update runbook

Run every weekday at 6:00 AM America/New_York. The agent executing this runbook must have
read [EDITORIAL.md](EDITORIAL.md) first — it is binding. All output paths are relative to
the repo root.

## Steps

1. **Read state.** Load `data/record.js` — note `meta.lastRun`, `meta.issueNo`, and
   existing item ids.

2. **Fetch.** Retrieve every feed in `sources.json` (curl with a descriptive User-Agent,
   15s timeout; note failures — a failed feed is reported in the run log, never guessed).
   For `type: "page"` sources, fetch the page and read only what is on it.

3. **Select candidates.** Items published since `meta.lastRun` minus a 12-hour overlap.
   Apply the relevance gate (EDITORIAL §3). For each candidate capture verbatim:
   origTitle, origExcerpt (≤60 words from the feed), sourceUrl, publishedAt, fetchedAt.

4. **Admission** (EDITORIAL §1): every relevant item from an allowlisted source enters
   the record on a single report, in the same format as every other item — the allowlist
   itself is the gate. There is no pending state.

5. **Write the record** — regenerate `data/record.js`:
   - `wire`: today's items, newest first, triaged
     flash (active exploitation / sector-wide impact) · priority (regulatory action,
     major vendor incident) · routine.
   - `diffPool`: append confirmed items only (id `L-####`, sequential).
   - `riskAreas[pillar].events`: append confirmed items, bump the dossier version
     (vN → vN+1 per event). Update `p1`/`p2`/`assess` prose ONLY from cited items
     (EDITORIAL §4–6).
   - `lead`: top 3 confirmed by triage, each with a "why it matters" line obeying the
     entailment constraint. **Headline rule:** if the lead items are one connected story,
     the headline may narrate it; if they are unrelated stories (the usual case), the
     headline must present them as an explicit list the reader can count — e.g.
     "Three stories lead today: X, Y, and Z" — never a blended sentence that reads as
     a single event. The dek says how many items were recorded in the edition.
   - `takeaways`: only where a confirmed item changes what an executive should do.
   - `publications.dailies`: prepend today's issue (next `issueNo`).
   - Fridays: prepend a weekly digest entry (count from the week's confirmed items).
     First business day of the month: draft the monthly report from that month's
     confirmed items only.
   - `meta`: `generatedAt` (ISO, ET), `lastRun`, `issueNo`, `recordHash` (first 7 hex
     chars of SHA-256 of the record content), counts.

6. **Verification pass** (EDITORIAL §7). Re-read every new/changed sentence against its
   cited excerpts. Fix or cut failures. Log to `data/run-log.md`:
   `date · feeds ok/failed · candidates · recorded · verify: checked/edited/cut`.

7. **Sanity checks before publish:**
   - `node --check data/record.js` passes.
   - Every `sourceUrl` is https and its host appears in `sources.json` (or is a direct
     subpage of one).
   - No item lacks origTitle/origExcerpt/publishedAt.
   - Rendered counts are plausible (0 is fine; 500 is a bug).

8. **Publish.** Commit `record: daily update YYYY-MM-DD (N items)` and push
   to main. GitHub Pages serves the update; no build step exists.

## Failure mode

If fewer than half the feeds respond, or the verification pass cuts more than a third of
drafted lines, do not publish a partial record — commit only the run log with the failure
noted, so the site keeps yesterday's record and the gap is visible in the log.
