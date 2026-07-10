# Update run log

One line per run, per UPDATE_RUNBOOK.md step 6. Failures are recorded, never papered over.

| date (ET) | issue | feeds ok/failed | candidates | confirmed | pending | verify: checked/edited/cut | record |
|---|---|---|---|---|---|---|---|
| 2026-07-09 (first collection, run manually) | No. 1 | 15/2 — Nacha (malformed XML), NIST (empty feed); FinCEN & Anthropic are page-checked, not fetched this run | 238 | 29 | 13 | pass ran against stored feed excerpts; all published lines entailed by excerpts; JadePuffer "first LLM-driven" claim kept as attributed ("described as"), Accenture/Cash App/Helix/Forg365/crackdown/NetScaler/Patch-Tuesday/Scattered-Spider/AI-flaws/Anthropic-IBM/Cisco-SD-WAN/Paysafe-SDKs/Injective held at pending (single T2 source) | 8da0644 |

Notes 2026-07-09:
- Confirmation gate outcomes this run: RoguePlanet Defender zero-day confirmed on BleepingComputer + Dark Reading (2× independent T2); AssuranceAmerica breach confirmed on BleepingComputer + Cybersecurity Dive; FortiBleed→INC/Lynx confirmed on Cybersecurity Dive + Dark Reading; Russian-intel messaging advisory confirmed on FBI IC3 + CISA (2× T1). All other T2 single-source reports held at pending.
- DOJ feed is high-volume and mostly out of scope; only sector-relevant tech-risk items were taken (1 of 25).
- Physical security: no qualifying events in the window — dossier shows the empty state per EDITORIAL §8.

2026-07-10 editorial edit (no new collection): lead headline rewritten to present the three lead items as an explicit list ("Three stories lead today: …") after reader feedback that the blended sentence read as one story; dek adjusted to carry the confirmed/pending counts. No item content changed. Headline rule added to UPDATE_RUNBOOK.md step 5. Record 8da0644 → 68f9b91.

2026-07-10 editorial edit (no new collection): removed institution-specific voice — "the OCC — the bank's primary federal regulator" rewritten to "the federal regulator of national banks"; stablecoin takeaway now addresses "banks" generally. Standing rule added to EDITORIAL.md §4 (sector voice, never one institution's). Record 68f9b91 → 65cf7e6.

2026-07-10 editorial edit (no new collection): daily-brief OCC reference now names the agency in full with no regulator characterization ("The Office of the Comptroller of the Currency (OCC)"); EDITORIAL.md acronym and sector-voice examples updated to match. Record 65cf7e6 → 54d2c7d.
