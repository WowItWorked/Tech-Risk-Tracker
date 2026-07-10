// Screen: Component sheet & tokens (reachable at #components — the design system's own documentation page).
import { html } from './ui.js';

const KICKER = "font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #10314F;";
const SPEC = "flex: 0 0 210px; font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 10.5px; line-height: 1.6; color: #6B747C;";
const ROW = "display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 24px; padding: 14px 0; border-bottom: 1px solid #E9EBED;";
const TRYROW = "display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 24px; padding: 12px 0; border-bottom: 1px solid #E9EBED;";
const SUBHEAD = "font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #6B747C;";
const NOTE = "margin: 0; font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; line-height: 1.5; color: #6B747C; text-wrap: pretty;";

export function Components(v) {
  return html`
  <div style="padding-top: 26px; animation: hzIn 200ms cubic-bezier(0.2, 0, 0, 1);">
    <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px 16px;">
      <span style=${KICKER}>Component sheet & tokens</span>
      <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 11px; color: #6B747C;">horizon v0.4-demo · for implementation</span>
    </div>
    <h2 style="margin: 10px 0 6px 0; font-family: 'Source Serif 4', Georgia, serif; font-size: clamp(28px, 4vw, 38px); line-height: 1.15; font-weight: 600; letter-spacing: -0.015em; color: #14171A;">Editorial dress, visible machinery</h2>
    <p style="margin: 0; font-size: 16px; line-height: 1.55; color: #4D555C; max-width: 68ch; text-wrap: pretty;">Every surface is built from these parts. Serif carries the reading; sans carries the agate; mono carries the machinery. One accent, and red belongs to flash alone.</p>

    <section style="border-top: 2px solid #14171A; margin-top: 30px; padding-top: 10px;">
      <span style=${KICKER}>Palette</span>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; margin-top: 14px;">
        ${v.palette.map((p) => html`
          <div>
            <div style="height: 52px; background: ${p.hex}; border: 1px solid rgba(20, 23, 26, 0.14);"></div>
            <div style="margin-top: 6px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; font-weight: 700; color: #14171A;">${p.name}</div>
            <div style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 11px; color: #4D555C;">${p.hex}</div>
            <div style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; line-height: 1.45; color: #6B747C; text-wrap: pretty;">${p.use}</div>
          </div>
        `)}
      </div>
    </section>

    <section style="border-top: 2px solid #14171A; margin-top: 34px; padding-top: 10px;">
      <span style=${KICKER}>Type scale</span>
      <div style="margin-top: 6px;">
        <div style=${ROW}>
          <span style=${SPEC}>nameplate<br/>Source Serif 4 · 600 · 34–56/1.0 · -0.02em</span>
          <span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 38px; font-weight: 600; letter-spacing: -0.02em; line-height: 1; color: #14171A;">Tech Risk Horizon</span>
        </div>
        <div style=${ROW}>
          <span style=${SPEC}>headline-xl<br/>Source Serif 4 · 600 · 30–43/1.12 · -0.015em</span>
          <span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 34px; font-weight: 600; letter-spacing: -0.015em; line-height: 1.12; color: #14171A;">File-transfer attacks breach the sector’s edge</span>
        </div>
        <div style=${ROW}>
          <span style=${SPEC}>headline-md<br/>Source Serif 4 · 600 · 20–22/1.3 · -0.01em</span>
          <span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 21px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.3; color: #14171A;">Inventories move from expectation to instruction</span>
        </div>
        <div style=${ROW}>
          <span style=${SPEC}>dek<br/>Public Sans · 400 · 19/1.5 · gray-600</span>
          <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 19px; line-height: 1.5; color: #4D555C;">Three items cleared the delta gate this morning.</span>
        </div>
        <div style=${ROW}>
          <span style=${SPEC}>body<br/>Public Sans · 400 · 16.5/1.62 · max 76ch</span>
          <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 16.5px; line-height: 1.62; color: #14171A;">We assess with moderate confidence that examiners request remediation evidence at the next cycle.</span>
        </div>
        <div style=${ROW}>
          <span style=${SPEC}>agate-label<br/>Public Sans · 700 · 11/1.3 · +0.18em · caps</span>
          <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #10314F;">The daily brief</span>
        </div>
        <div style=${ROW}>
          <span style=${SPEC}>agate-text<br/>Public Sans · 400 · 12/1.45 · ink-600</span>
          <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 12px; line-height: 1.45; color: #4D555C;">1. CISA, Known Exploited Vulnerabilities catalog — Jul 9, 2026</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 24px; padding: 14px 0;">
          <span style=${SPEC}>data<br/>IBM Plex Mono · 400–600 · 11–12/1.5 · tnum</span>
          <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 12px; color: #4D555C;">checked 14:30 et · record version a41f2c9 · CVE-2026-31207</span>
        </div>
      </div>
    </section>

    <section style="border-top: 2px solid #14171A; margin-top: 34px; padding-top: 10px;">
      <span style=${KICKER}>Machinery font — tryouts</span>
      <p style="margin: 8px 0 0 0; font-family: 'Public Sans', system-ui, sans-serif; font-size: 12px; line-height: 1.5; color: #6B747C; max-width: 72ch; text-wrap: pretty;">The machinery face carries timestamps, version hashes, record ids, and CVEs. Four alternatives to the current face, same specimen — say the word and one becomes system-wide.</p>
      <div style="margin-top: 6px;">
        <div style=${TRYROW}>
          <span style=${SPEC}>ibm plex mono — current<br/>typewriter DNA · most technical</span>
          <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 12.5px; color: #14171A;">checked 16:30 et · record a41f2c9 · CVE-2026-31207</span>
        </div>
        <div style=${TRYROW}>
          <span style=${SPEC}>jetbrains mono<br/>taller x-height · softer on paper</span>
          <span style="font-family: 'JetBrains Mono', Menlo, monospace; font-size: 12.5px; color: #14171A;">checked 16:30 et · record a41f2c9 · CVE-2026-31207</span>
        </div>
        <div style=${TRYROW}>
          <span style=${SPEC}>spline sans mono<br/>humanist · least terminal</span>
          <span style="font-family: 'Spline Sans Mono', Menlo, monospace; font-size: 12.5px; color: #14171A;">checked 16:30 et · record a41f2c9 · CVE-2026-31207</span>
        </div>
        <div style=${TRYROW}>
          <span style=${SPEC}>fragment mono<br/>grotesk · closest to newsprint agate</span>
          <span style="font-family: 'Fragment Mono', Menlo, monospace; font-size: 12.5px; color: #14171A;">checked 16:30 et · record a41f2c9 · CVE-2026-31207</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 24px; padding: 12px 0;">
          <span style=${SPEC}>public sans · tabular figures<br/>no mono at all · pure newspaper agate</span>
          <span style="font-family: 'Public Sans', system-ui, sans-serif; font-feature-settings: 'tnum' 1; font-size: 12.5px; color: #14171A;">checked 16:30 et · record a41f2c9 · CVE-2026-31207</span>
        </div>
      </div>
    </section>

    <section style="border-top: 2px solid #14171A; margin-top: 34px; padding-top: 10px;">
      <span style=${KICKER}>Badges — agate furniture</span>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr)); gap: 20px 32px; margin-top: 14px;">
        <div>
          <div style="${SUBHEAD} border-bottom: 1px solid #E9EBED; padding-bottom: 5px;">Status</div>
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 14px; padding: 12px 0;">
            <span style="display: inline-flex; align-items: center; gap: 5px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #14171A;"><span style="width: 5px; height: 5px; background: #14171A;"></span>Confirmed</span>
            <span style="display: inline-flex; align-items: center; gap: 5px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; font-style: italic; color: #6B747C;"><span style="width: 5px; height: 5px; border: 1px solid #97A0A8;"></span>pending</span>
          </div>
          <p style=${NOTE}>Confirmed is upright small caps with a filled tick; pending is muted italic with a hollow tick — distinct at a glance, no color spent.</p>
        </div>
        <div>
          <div style="${SUBHEAD} border-bottom: 1px solid #E9EBED; padding-bottom: 5px;">Triage</div>
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 12px 0;">
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #FFFFFF; background: #8E1B12; border: 1px solid #8E1B12; border-radius: 4px; padding: 2px 6px;">Flash</span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #10314F; border: 1px solid #10314F; border-radius: 4px; padding: 2px 6px;">Priority</span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #6B747C; border: 1px solid transparent; padding: 2px 0;">Routine</span>
          </div>
          <p style=${NOTE}>Flash carries the only red on any page. Priority takes the accent outline. Routine is unboxed text.</p>
        </div>
        <div>
          <div style="${SUBHEAD} border-bottom: 1px solid #E9EBED; padding-bottom: 5px;">Category tags</div>
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 6px 14px; padding: 12px 0;">
            ${v.pillarTags.map((pt) => html`<span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #4D555C;">${pt.label}</span>`)}
          </div>
          <p style=${NOTE}>Eight categories, plain small caps — tags identify, they don’t decorate.</p>
        </div>
        <div>
          <div style="${SUBHEAD} border-bottom: 1px solid #E9EBED; padding-bottom: 5px;">Confidence</div>
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 12px 0;">
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #4D555C; border: 1px solid #D7DBDF; border-radius: 4px; padding: 1px 5px;">high confidence</span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #4D555C; border: 1px solid #D7DBDF; border-radius: 4px; padding: 1px 5px;">moderate confidence</span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #4D555C; border: 1px solid #D7DBDF; border-radius: 4px; padding: 1px 5px;">low confidence</span>
          </div>
          <p style=${NOTE}>Every assessment wears one, inline at the end of the sentence it qualifies.</p>
        </div>
        <div>
          <div style="${SUBHEAD} border-bottom: 1px solid #E9EBED; padding-bottom: 5px;">Version marker</div>
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 12px 0;">
            <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 10.5px; font-weight: 600; color: #10314F; border: 1px solid #10314F; border-radius: 4px; padding: 1px 6px;">v14</span>
            <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 10.5px; font-weight: 600; color: #10314F;">v13 → v14</span>
          </div>
          <p style=${NOTE}>Risk-area dossiers version like documents; every confirmed change advances the version.</p>
        </div>
      </div>
    </section>

    <section style="border-top: 2px solid #14171A; margin-top: 34px; padding-top: 10px;">
      <span style=${KICKER}>Machinery line — collection status</span>
      <p style="margin: 8px 0 0 0; font-family: 'Public Sans', system-ui, sans-serif; font-size: 12px; line-height: 1.5; color: #6B747C; max-width: 72ch; text-wrap: pretty;">Lives in the Next update rail on the front page. IBM Plex Mono 11/1.5, values in ink at 500, labels in agate gray, separators in rule-1. The live countdown is the tell that this is a running system, not a newsletter. Version hashes live on the documents themselves — dossiers, briefs, and issues.</p>
      <div style="margin-top: 12px; border-top: 1px solid #D7DBDF; border-bottom: 1px solid #D7DBDF; padding: 7px 0; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; column-gap: 14px; row-gap: 3px; font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 11px; color: #6B747C;">
        <span style="display: inline-block; width: 6px; height: 6px; background: #F58025; animation: hzPulse 2.8s ease-in-out infinite;"></span>
        <span>sources last checked <span style="color: #14171A; font-weight: 500;">14:30 et</span></span>
        <span style="color: #BCC2C8;">·</span>
        <span>next check <span style="color: #14171A; font-weight: 500;">15:00 et</span> — in 14:12</span>
        <span style="color: #BCC2C8;">·</span>
        <span>today: <span style="color: #14171A; font-weight: 600;">3 changes confirmed</span>, <span style="font-style: italic; color: #6B747C;">1 awaiting verification</span></span>
      </div>
      <div style="display: flex; flex-wrap: wrap; justify-content: center; column-gap: 14px; row-gap: 2px; margin-top: 6px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 9.5px; letter-spacing: 0.06em; text-transform: uppercase; color: #97A0A8;">
        <span>heartbeat</span><span>· collection cadence ·</span><span>today’s gate</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr)); gap: 24px 32px; margin-top: 24px;">
        <div>
          <div style=${SUBHEAD}>Masthead — shared across all pages (footer meta shown compact)</div>
          <div style="margin-top: 10px; border: 1px solid #E9EBED; padding: 0 16px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 6px 18px; padding: 12px 0 9px 0;">
              <span style="display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap;"><span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 19px; font-weight: 600; letter-spacing: -0.02em; color: #14171A;">Tech Risk Horizon</span></span>
              <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 10px; color: #6B747C;">Thursday, July 9, 2026</span>
            </div>
            <div style="border-top: 1px solid #D7DBDF; padding: 6px 0 8px 0; font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 10px; color: #6B747C;">checked <span style="color: #14171A;">14:30 et</span> · 3 confirmed / <span style="font-style: italic; color: #6B747C;">1 pending</span></div>
          </div>
        </div>
        <div>
          <div style=${SUBHEAD}>Masthead — publication head</div>
          <div style="margin-top: 10px; border: 1px solid #E9EBED; padding: 18px 16px; text-align: center;">
            <div style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 9.5px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #10314F;">Tech Risk Horizon — monthly</div>
            <div style="margin: 7px auto 0 auto; width: 44px; border-top: 1px solid #14171A;"></div>
            <div style="margin-top: 8px; font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 10px; color: #6B747C;">No. 6 — June 2026</div>
            <div style="margin-top: 8px; font-family: 'Source Serif 4', Georgia, serif; font-size: 19px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.25; color: #14171A;">Model inventories move from expectation to instruction</div>
          </div>
        </div>
      </div>
    </section>

    <section style="border-top: 2px solid #14171A; margin-top: 34px; padding-top: 10px;">
      <span style=${KICKER}>Timeline entry · inline source</span>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr)); gap: 24px 32px; margin-top: 14px;">
        <div>
          <div style="display: grid; grid-template-columns: 76px 18px 1fr; column-gap: 12px;">
            <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 11px; color: #6B747C; text-align: right; padding-top: 2px;">Jul 8, 26</span>
            <span style="position: relative; display: block;"><span style="position: absolute; left: 8px; top: 6px; bottom: -6px; width: 1px; background: #D7DBDF;"></span><span style="position: absolute; left: 4.5px; top: 5px; width: 8px; height: 8px; background: #10314F; border: 1px solid #10314F;"></span></span>
            <div style="padding-bottom: 20px;">
              <div style="font-size: 16px; line-height: 1.5; color: #14171A;">OCC model-risk FAQ supplement published; generative AI scoped in.</div>
              <div style="display: flex; flex-wrap: wrap; gap: 4px 10px; margin-top: 4px; align-items: center;"><span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 10.5px; font-weight: 600; color: #10314F;">v13 → v14</span><span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #14171A;">confirmed</span><a href="https://www.occ.gov/news-issuances/bulletins/" target="_blank" rel="noopener" style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; color: #0069AA; text-decoration: underline; text-decoration-color: #C5E2F0; text-underline-offset: 2px;">— OCC FAQ supplement ↗</a></div>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 76px 18px 1fr; column-gap: 12px;">
            <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 11px; color: #6B747C; text-align: right; padding-top: 2px;">Jul 9, 26</span>
            <span style="position: relative; display: block;"><span style="position: absolute; left: 4.5px; top: 5px; width: 8px; height: 8px; background: #FFFFFF; border: 1px solid #97A0A8;"></span></span>
            <div>
              <div style="font-size: 16px; line-height: 1.5; font-style: italic; color: #6B747C;">Trade-press report of an examination pilot — awaiting verification.</div>
              <div style="display: flex; flex-wrap: wrap; gap: 4px 10px; margin-top: 4px; align-items: center;"><span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; font-style: italic; color: #6B747C;">pending</span></div>
            </div>
          </div>
        </div>
        <div>
          <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #14171A; max-width: 60ch;">We assess as likely that exploitation extends to financial-sector targets within two weeks.</p>
          <div style="margin-top: 12px; border-top: 1px solid #D7DBDF; padding-top: 8px;">
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #6B747C;">Sources</span>
            <div style="padding-top: 5px;"><a href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog" target="_blank" rel="noopener" style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 12px; color: #0069AA; text-decoration: underline; text-decoration-color: #C5E2F0; text-underline-offset: 2px;">CISA, Known Exploited Vulnerabilities catalog — Jul 9, 2026 ↗</a></div>
          </div>
        </div>
      </div>
    </section>

    <section style="border-top: 2px solid #14171A; margin-top: 34px; padding-top: 10px;">
      <span style=${KICKER}>Utility furniture — nav · filters · switcher</span>
      <div style="margin-top: 14px;">
        <div style=${SUBHEAD}>Persistent nav — active underline · global search rides inline, press / anywhere</div>
        <div style="margin-top: 8px; border-bottom: 2px solid #14171A; display: flex; justify-content: space-between; align-items: center; gap: 16px; max-width: 640px;">
          <div style="display: flex; gap: 26px; overflow-x: auto; overflow-y: hidden;">
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.03em; padding: 10px 0 8px 0; color: #14171A; border-bottom: 2px solid #F58025; margin-bottom: -2px;">Today</span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.03em; padding: 10px 0 8px 0; color: #6B747C;">Risk Areas</span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.03em; padding: 10px 0 8px 0; color: #6B747C;">Publications</span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.03em; padding: 10px 0 8px 0; color: #6B747C;">Meeting Prep</span>
          </div>
          <span style="display: inline-flex; align-items: center; gap: 6px; font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 11px; color: #97A0A8; border-bottom: 1px solid #BCC2C8; padding: 3px 2px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B747C" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line></svg>Search</span>
        </div>
        <div style="margin-top: 22px; ${SUBHEAD}">Filter bar — quiet small caps, hairline search</div>
        <div style="margin-top: 8px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px 18px; padding: 8px 0; border-top: 1px solid #E9EBED; border-bottom: 1px solid #D7DBDF; max-width: 640px;">
          <div style="display: flex; flex-wrap: wrap; gap: 2px 14px;">
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #14171A; border-bottom: 2px solid #F58025; padding: 3px 0 2px 0;">All</span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #6B747C; padding: 3px 0;">Cyber</span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #6B747C; padding: 3px 0;">Fraud</span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #6B747C; padding: 3px 0;">AI</span>
          </div>
          <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 11.5px; color: #97A0A8; border-bottom: 1px solid #BCC2C8; padding: 3px 2px; width: 140px;">search the wire</span>
        </div>
        <div style="margin-top: 22px; ${SUBHEAD}">Quick switcher — press ⌘K (keyboard only, no chrome); ↑↓ · ↵ · 1–4 · esc</div>
        <div style="margin-top: 8px; max-width: 520px; background: #FFFFFF; border: 1px solid #BCC2C8; border-radius: 6px; box-shadow: 0 12px 28px rgba(16, 49, 79, 0.12), 0 4px 8px rgba(16, 49, 79, 0.06); overflow: hidden;">
          <div style="border-bottom: 1px solid #D7DBDF; padding: 11px 16px; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
            <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 13px; color: #97A0A8;">Go to…</span>
            <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 9.5px; color: #6B747C; border: 1px solid #BCC2C8; border-radius: 4px; padding: 1px 6px;">esc</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; padding: 11px 16px; background: #E9EBED;">
            <span style="display: flex; gap: 12px; align-items: baseline;"><span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 11px; color: #97A0A8;">1</span><span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 16px; font-weight: 600; color: #14171A;">Today</span></span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; color: #6B747C;">front page · daily delta · the wire</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; padding: 11px 16px;">
            <span style="display: flex; gap: 12px; align-items: baseline;"><span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 11px; color: #97A0A8;">2</span><span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 16px; color: #14171A;">Dossiers</span></span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; color: #6B747C;">entity pages · changelogs</span>
          </div>
          <div style="border-top: 1px solid #E9EBED; padding: 8px 16px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #97A0A8;">↑↓ navigate · ↵ open · esc close</div>
        </div>
      </div>
    </section>

    <section style="border-top: 2px solid #14171A; margin-top: 34px; padding-top: 10px;">
      <span style=${KICKER}>Token summary — for implementation</span>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); gap: 20px 32px; margin-top: 14px; font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 11.5px; line-height: 2; color: #4D555C;">
        <div>
          <div style="${SUBHEAD} border-bottom: 1px solid #E9EBED; padding-bottom: 5px; margin-bottom: 6px;">Faces — Google Fonts</div>
          <div>--serif: 'Source Serif 4' (opsz)</div>
          <div>--sans:  'Public Sans'</div>
          <div>--mono:  'IBM Plex Mono'</div>
          <div style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; line-height: 1.5; color: #6B747C; margin-top: 6px;">Public Sans carries all reading and utility text — sturdy, neutral, legible at small sizes. Source Serif 4’s optical axis keeps true display cuts for headlines and the nameplate. Plex Mono keeps timestamps, versions, and CVEs unmistakably machine.</div>
        </div>
        <div>
          <div style="${SUBHEAD} border-bottom: 1px solid #E9EBED; padding-bottom: 5px; margin-bottom: 6px;">Spacing · radii · rules</div>
          <div>space: 4 8 12 16 24 32 48 64 96</div>
          <div>radius: 2 (badges) · 3 (buttons) · 6 (overlay)</div>
          <div>rule-heavy: 2px #14171A</div>
          <div>rule-hair:  1px #D7DBDF</div>
          <div>rule-row:   1px #E9EBED</div>
          <div>measure: 66–70ch body · 1140px page</div>
        </div>
        <div>
          <div style="${SUBHEAD} border-bottom: 1px solid #E9EBED; padding-bottom: 5px; margin-bottom: 6px;">Motion · focus</div>
          <div>durations: 120–260ms</div>
          <div>ease: cubic-bezier(.2, 0, 0, 1)</div>
          <div>focus: 2px rgba(0,105,170,.6)</div>
          <div style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; line-height: 1.5; color: #6B747C; margin-top: 6px;">No bounce, no parallax. Motion confirms — the status-line pulse, the ledger-reference highlight. That’s all.</div>
        </div>
      </div>
    </section>
  </div>`;
}
