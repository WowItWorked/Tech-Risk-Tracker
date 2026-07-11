# Update runbook

Runs hourly, 6:00 AM through 6:00 PM America/New_York, on weekdays. The **6 AM run opens
the day's edition** (new issue number); each later run the same day is an **intraday
update** that appends newly admitted items to the open edition and refreshes it in place.
An intraday run that admits nothing commits nothing and logs nothing. The agent executing
this runbook must have read [EDITORIAL.md](EDITORIAL.md) first — it is binding. All output
paths are relative to the repo root.

## Steps

1. **Read state.** Load `data/record.json` — note `meta.lastRun`, `meta.issueNo`, and
   existing item ids.

2. **Fetch.** Retrieve every feed in `sources.json` (curl with a descriptive User-Agent,
   15s timeout; note failures — a failed feed is reported in the run log, never guessed).
   If a feed returns 403 with the descriptive User-Agent, retry once with a standard
   browser User-Agent and count it OK if that returns 200, noting the fallback in the
   run log (the FTC feed is known to require this). For `type: "page"` sources, fetch
   the page and read only what is on it.

3. **Select candidates.** Items published since `meta.lastRun` minus an overlap
   (12 hours for the day-opening run; 2 hours for intraday runs). Apply the relevance
   gate (EDITORIAL §3). For each candidate capture verbatim: origTitle, origExcerpt
   (≤60 words from the feed), sourceUrl, publishedAt, fetchedAt. **Intraday early
   exit:** if no candidate survives the relevance gate, stop here — no commit, no log.

4. **Admission** (EDITORIAL §1): every relevant item from an allowlisted source enters
   the record on a single report, in the same format as every other item — the allowlist
   itself is the gate. There is no pending state.

5. **Write the record** — regenerate `data/record.json`:
   - `wire`: every item admitted today (ET), newest first, triaged
     flash (active exploitation / sector-wide impact) · priority (regulatory action,
     major vendor incident) · routine. The day-opening run starts the wire fresh;
     intraday runs keep the day's existing wire items and add the new ones.
   - `diffPool`: append all new items (id `L-####`, sequential). The diff pool is the
     record's running memory — it feeds the site's Archive page — so existing entries
     are never removed, renumbered, or rewritten (corrections follow EDITORIAL §9).
   - `riskAreas[pillar].events`: append new items, bump the dossier version
     (vN → vN+1 per event). Update `p1`/`p2`/`assess` prose ONLY from cited items
     (EDITORIAL §4–6). Citation lists obey EDITORIAL §2 citation limits: at most
     three sources per unit, no source cited twice in the same unit.
   - `lead`: top 3 by triage, each with a "why it matters" line obeying the
     entailment constraint. **Headline rule:** if the lead items are one connected story,
     the headline may narrate it; otherwise (the usual case) the headline opens with
     "Leading stories:" and lists the items separated by **semicolons**, never commas —
     e.g. "Leading stories: X; Y; and Z" — so each story reads as its own item, never a
     blended sentence that reads as a single event. The dek says how many items were
     recorded in the edition; it must not characterize the lead stories as "unrelated"
     or otherwise remark on their variety — the list format already carries that.
   - `takeaways`: only where a recorded item changes what an executive should do.
   - `publications.dailies`: the day-opening run prepends today's issue (next
     `issueNo`); intraday runs update that same issue's counts in place — one issue
     number per day, aggregating everything admitted that day even after items roll
     off the board (the diff pool preserves them permanently regardless).
   - Fridays (day-opening run only): prepend a weekly digest entry (count from the
     week's recorded items). First business day of the month (day-opening run only):
     draft the monthly report from that month's recorded items.
   - `meta`: `generatedAt` (ISO, ET), `lastRun`, `issueNo`, `recordHash` (first 7 hex
     chars of SHA-256 of the record content), counts.

6. **Verification pass** (EDITORIAL §7). Re-read every new/changed sentence against its
   cited excerpts. Fix or cut failures. Log to `data/run-log.md`:
   `date · feeds ok/failed · candidates · recorded · verify: checked/edited/cut`.
   The day-opening run always logs its line; an intraday run logs a compact line only
   when it admitted at least one item (`date HH:MM ET intraday · +N items · verify: …`).

7. **Sanity checks before publish:**
   - `data/record.json` parses as valid JSON.
   - Every `sourceUrl` is https and its host appears in `sources.json` (or is a direct
     subpage of one).
   - No item lacks origTitle/origExcerpt/publishedAt.
   - Rendered counts are plausible (0 is fine; 500 is a bug).

8. **Publish.** Day-opening run: commit `record: daily update YYYY-MM-DD (N items)`.
   Intraday run: commit `record: intraday update YYYY-MM-DD HH:MM ET (+N items)`.
   Push to main. GitHub Pages serves the update; no build step exists.

## Failure mode

If fewer than half the feeds respond, or the verification pass cuts more than a third of
drafted lines, do not publish a partial record — commit only the run log with the failure
noted, so the site keeps yesterday's record and the gap is visible in the log.
