// Screens: Publications archive, Monthly report, and Meeting Prep (the catch-up brief).
import { html } from './ui.js';

const KICKER = "font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #10314F;";
const SRC_CHIP = "font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 600; color: #0069AA; background: #F4F9FC; border: 1px solid #C5E2F0; border-radius: 999px; padding: 2px 9px; line-height: 1.4; white-space: nowrap; text-decoration: none;";
const NBSP2 = '  ';

export function Publications(v) {
  return html`
  <div style="padding-top: 26px; animation: hzIn 200ms cubic-bezier(0.2, 0, 0, 1);">
    <span style=${KICKER}>Publications — the archive</span>
    <h2 style="margin: 10px 0 6px 0; font-family: 'Source Serif 4', Georgia, serif; font-size: clamp(28px, 4vw, 38px); line-height: 1.15; font-weight: 600; letter-spacing: -0.015em; color: #14171A;">Back issues</h2>
    <p style="margin: 0; font-size: 16px; line-height: 1.55; color: #4D555C; max-width: 90ch; text-wrap: pretty;">Every issue the system has published, in one place. Daily briefs cover what changed overnight, weekly digests pull the week together, and monthly reports read the longer arc — all drawn from the same confirmed record.</p>

    <section data-pub-sec="monthly" style="border-top: 2px solid #14171A; margin-top: 28px; padding-top: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px 16px;">
        <span style=${KICKER}>Monthly reports</span>
        <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">Depth · Twelve a Year · ${v.mTotal} ${v.mTotal === 1 ? 'Issue' : 'Issues'}</span>
      </div>
      ${v.mTotal === 0 ? html`<p style="margin: 0; padding: 14px 0; font-size: 14.5px; font-style: italic; color: #6B747C; border-bottom: 1px solid #E9EBED;">No monthly report yet — the first issue is expected ${v.nextMonthly}, drawn from the month’s confirmed record.</p>` : null}
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(460px, 100%), 1fr)); column-gap: 56px; align-items: start;">
      ${v.monthlies.map((m) => html`
        <div style="display: grid; grid-template-columns: 92px 1fr auto; gap: 8px 18px; align-items: baseline; padding: 16px 0; border-bottom: 1px solid #E9EBED;">
          <span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 30px; font-weight: 600; letter-spacing: -0.01em; color: ${m.numColor};">No. ${m.no}</span>
          <div style="min-width: 0;">
            ${m.linked
              ? html`<button onClick=${m.open} class="hv-ul-gray" style="font-family: 'Source Serif 4', Georgia, serif; font-size: 20px; line-height: 1.3; font-weight: 600; color: #14171A; text-wrap: pretty;">${m.title}</button>`
              : html`<span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 20px; line-height: 1.3; font-weight: 600; color: #14171A; text-wrap: pretty;">${m.title}</span>`}
            <div style="margin-top: 4px; font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">${m.month} · Issued ${m.issued} · ${m.changes} Confirmed Changes · Record ${m.commit}</div>
          </div>
          ${m.linked
            ? html`<button onClick=${m.open} class="hv-ul" style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0069AA; white-space: nowrap;">Read →</button>`
            : html`<span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-style: italic; color: #97A0A8; white-space: nowrap;">archived</span>`}
        </div>
      `)}
      </div>
    </section>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(430px, 100%), 1fr)); gap: 0 56px; align-items: start;">
    <section data-pub-sec="weekly" style="border-top: 2px solid #14171A; margin-top: 34px; padding-top: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px 16px;">
        <span style=${KICKER}>Weekly digests</span>
        <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">Synthesis · Fridays · Showing ${v.wkShowingLabel} of ${v.wkTotal}</span>
      </div>
      ${v.wkTotal === 0 ? html`<p style="margin: 0; padding: 14px 0; font-size: 14.5px; font-style: italic; color: #6B747C; border-bottom: 1px solid #E9EBED;">No weekly digest yet — the first publishes ${v.nextWeekly}, pulling the week’s confirmed items together.</p>` : null}
      ${v.weeklies.map((wk) => html`
        <div style="display: grid; grid-template-columns: 92px 1fr auto; gap: 8px 18px; align-items: baseline; padding: 10px 0; border-bottom: 1px solid #E9EBED;">
          <span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 17px; font-weight: 600; color: #14171A;">No. ${wk.no}</span>
          <span style="min-width: 0;"><span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 13.5px; color: #4D555C;">${wk.range}</span> <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">· ${wk.meta}</span></span>
          <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-style: italic; color: #97A0A8; white-space: nowrap;">archived</span>
        </div>
      `)}
      ${v.wkHasMore ? html`<button onClick=${v.wkToggle} class="hv-ul" style="margin-top: 10px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0069AA;">${v.wkMoreLabel}</button>` : null}
    </section>

    <section data-pub-sec="daily" style="border-top: 2px solid #14171A; margin-top: 34px; padding-top: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px 16px;">
        <span style=${KICKER}>Daily briefs</span>
        <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">Speed · Weekdays 6:00 AM ET · Showing ${v.dShowingLabel} of ${v.dTotal}</span>
      </div>
      ${v.dailies.map((d) => html`
        <div style="display: grid; grid-template-columns: 92px 1fr auto; gap: 8px 18px; align-items: baseline; padding: 10px 0; border-bottom: 1px solid #E9EBED;">
          <span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 17px; font-weight: 600; color: #14171A;">No. ${d.no}</span>
          <span style="min-width: 0;"><span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 13.5px; color: #4D555C;">${d.date}</span> <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">· ${d.confirmed} items${d.hasFlash ? html`<span style="color: #8E1B12;"> · ${d.flash} flash</span>` : null}</span></span>
          ${d.linked
            ? html`<button onClick=${d.open} class="hv-ul" style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0069AA; white-space: nowrap;">Open →</button>`
            : html`<span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-style: italic; color: #97A0A8; white-space: nowrap;">archived</span>`}
        </div>
      `)}
      ${v.dHasMore ? html`<button onClick=${v.dToggle} class="hv-ul" style="margin-top: 10px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0069AA;">${v.dMoreLabel}</button>` : null}
    </section>
    </div>

    <section data-pub-sec="catchup" style="border-top: 2px solid #14171A; margin-top: 34px; padding-top: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px 16px;">
        <span style=${KICKER}>Catch-up briefs</span>
        <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">Saved Renders from Meeting Prep · Retrievable Any Time</span>
      </div>
      ${v.savedBriefs.length === 0 ? html`<p style="margin: 0; padding: 14px 0; font-size: 14.5px; font-style: italic; color: #6B747C;">No saved briefs yet — render one in Meeting Prep and it will be kept here.</p>` : null}
      ${v.savedBriefs.map((cb) => html`
        <div style="display: grid; grid-template-columns: 92px 1fr auto; gap: 8px 18px; align-items: baseline; padding: 10px 0; border-bottom: 1px solid #E9EBED;">
          <span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 17px; font-weight: 600; color: #14171A;">No. ${cb.no}</span>
          <span style="min-width: 0;"><span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 13.5px; color: #4D555C;">since ${cb.sinceStr} — ${cb.count} confirmed changes</span> <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">· ${cb.id} · saved ${cb.ts}</span></span>
          <button onClick=${cb.open} class="hv-ul" style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0069AA; white-space: nowrap;">Open →</button>
        </div>
      `)}
    </section>
  </div>`;
}

export function Monthly(v) {
  if (!v.hasMonthly) {
    return html`
    <div style="padding-top: 30px; animation: hzIn 200ms cubic-bezier(0.2, 0, 0, 1);">
      <div style="text-align: center; max-width: 760px; margin: 40px auto 0 auto;">
        <div style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #10314F;">Tech Risk Tracker — monthly</div>
        <div style="margin: 8px auto 0 auto; width: 56px; border-top: 1px solid #14171A;"></div>
        <h2 style="margin: 14px auto 10px auto; font-family: 'Source Serif 4', Georgia, serif; font-size: clamp(26px, 4vw, 36px); line-height: 1.15; font-weight: 600; letter-spacing: -0.015em; color: #14171A; max-width: 24ch; text-wrap: pretty;">No monthly report yet</h2>
        <p style="margin: 0 auto; font-size: 16px; line-height: 1.55; color: #4D555C; max-width: 52ch; text-wrap: pretty;">The first issue is expected ${v.nextMonthly}, drawn entirely from the month’s confirmed record. Until then, the daily brief and the risk-area dossiers carry the record.</p>
        <button onClick=${v.goPublications} class="hv-ul" style="margin-top: 18px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0069AA;">Back to publications →</button>
      </div>
    </div>`;
  }
  const r = v.monthlyReport;
  return html`
  <div style="padding-top: 30px; animation: hzIn 200ms cubic-bezier(0.2, 0, 0, 1);">
    <div style="text-align: center; max-width: 760px; margin: 0 auto;">
      <div style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #10314F;">Tech Risk Tracker — monthly</div>
      <div style="margin: 8px auto 0 auto; width: 56px; border-top: 1px solid #14171A;"></div>
      <div style="margin-top: 10px; font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11.5px; color: #6B747C;">No. ${r.no} — ${r.month}</div>
      <h2 style="margin: 12px auto 10px auto; font-family: 'Source Serif 4', Georgia, serif; font-optical-sizing: auto; font-size: clamp(30px, 4.5vw, 42px); line-height: 1.14; font-weight: 600; letter-spacing: -0.015em; color: #14171A; max-width: 22ch; text-wrap: pretty;">${r.title}</h2>
      <p style="margin: 0 auto; font-size: 17.5px; line-height: 1.5; color: #4D555C; max-width: 54ch; text-wrap: pretty;">${r.dek}</p>
      <div style="margin-top: 16px; padding: 8px 0; border-top: 1px solid #D7DBDF; border-bottom: 1px solid #D7DBDF; display: flex; flex-wrap: wrap; justify-content: center; column-gap: 18px; row-gap: 3px; font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">
        <span>issued ${r.issued}</span><span style="color: #BCC2C8;">·</span><span>covers ${r.covers}</span><span style="color: #BCC2C8;">·</span><span><span style="color: #14171A; font-weight: 600;">${r.changes}</span> confirmed changes</span><span style="color: #BCC2C8;">·</span><span>record ${r.hash}</span>
      </div>
      <button onClick=${v.printMonthly} title="Open this report as a printable page" class="hv-ul" style="margin-top: 12px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0069AA;">Print / save PDF</button>
    </div>

    <div style="max-width: 1040px; margin: 0 auto;">
      ${(r.sections || []).map((ms) => html`
        <section style="margin-top: 34px;">
          <div style="border-top: 2px solid #14171A; padding-top: 8px; display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px 16px;">
            <span style=${KICKER}>${ms.pillar}</span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">${ms.count} confirmed items</span>
          </div>
          <h3 style="margin: 10px 0 0 0; font-family: 'Source Serif 4', Georgia, serif; font-size: 22px; line-height: 1.3; font-weight: 600; letter-spacing: -0.01em; color: #14171A; text-wrap: pretty;">${ms.head}</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(360px, 100%), 1fr)); gap: 8px 56px; align-items: start;">
            <div>
              ${ms.grafs.map((g) => html`<p style="margin: 10px 0 0 0; font-size: 16.5px; line-height: 1.62; color: #14171A; max-width: 70ch; text-wrap: pretty;">${g.t}</p>`)}
            </div>
            <div style="border-left: 1px solid #E9EBED; padding-left: 24px;">
              <div style="margin-top: 12px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #6B747C;">Implications for controls posture</div>
              ${ms.imps.map((im) => html`
                <div style="display: flex; gap: 10px; padding: 7px 0 0 0; align-items: baseline;">
                  <span style="width: 5px; height: 5px; background: #14171A; flex-shrink: 0; position: relative; top: -2px;"></span>
                  <p style="margin: 0; font-size: 15.5px; line-height: 1.55; color: #14171A; max-width: 66ch; text-wrap: pretty;">${im.t}${NBSP2}<span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #4D555C; border: 1px solid #D7DBDF; border-radius: 4px; padding: 1px 5px; white-space: nowrap; vertical-align: 2px;">${im.conf}</span></p>
                </div>
              `)}
            </div>
          </div>
          <div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 3px 14px; margin-top: 7px;"><span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #6B747C;">Sources</span>${ms.srcs.map((mx) => html`<a href=${mx.url} target="_blank" rel="noopener" title=${mx.title} style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 11.5px; color: #0069AA; text-decoration: underline; text-decoration-color: #C5E2F0; text-underline-offset: 2px;">${mx.text} ↗</a>`)}</div>
        </section>
      `)}

      <div style="border-top: 1px solid #D7DBDF; margin-top: 34px; padding-top: 10px;">
        <p style="margin: 12px 0 0 0; font-family: 'Public Sans', system-ui, sans-serif; font-size: 12px; font-style: italic; color: #6B747C;">${r.footnote}</p>
        <div style="margin-top: 12px; padding-top: 9px; border-top: 1px solid #E9EBED; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #6B747C;">Drafted by the system · issued by Technology Risk</div>
      </div>
    </div>
  </div>`;
}

export function Diff(v) {
  return html`
  <div style="padding-top: 26px; animation: hzIn 200ms cubic-bezier(0.2, 0, 0, 1);">
    <div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px 44px; margin-bottom: 16px;">
      <div style="flex: 1 1 480px; min-width: 0;">
        <span style=${KICKER}>Meeting prep — the catch-up brief</span>
        <h2 style="margin: 10px 0 6px 0; font-family: 'Source Serif 4', Georgia, serif; font-size: clamp(28px, 4vw, 38px); line-height: 1.15; font-weight: 600; letter-spacing: -0.015em; color: #14171A;">Since your last meeting</h2>
        <p style="margin: 0; font-size: 16px; line-height: 1.55; color: #4D555C; max-width: 72ch; text-wrap: pretty;">Pick the date of the last committee meeting and the tracker will render every confirmed change since in the respective risk area(s). </p>
      </div>
      <div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 16px 28px; padding-bottom: 4px;">
        <div>
          <div style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #6B747C; margin-bottom: 5px;">Changes since</div>
          <input type="date" value=${v.diffDate} onChange=${v.onDiffDate} aria-label="Changes since date" class="fc-navy" style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 13.5px; color: #14171A; background: transparent; border-bottom: 1px solid #BCC2C8; padding: 4px 2px; color-scheme: light;" />
        </div>
        <button onClick=${v.renderDiff} class="btn-navy" style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #FFFFFF; background: #10314F; border: 1px solid #10314F; border-radius: 4px; padding: 9px 16px;">Render brief</button>
        ${v.diffReady ? html`<button onClick=${v.printDiffBrief} title="Open this brief as a printable page" style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #10314F; background: transparent; border: 1px solid #10314F; border-radius: 4px; padding: 9px 16px;">Print / save PDF</button>` : null}
      </div>
    </div>

    <div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 14px; margin-bottom: 10px; border-top: 1px solid #E9EBED; padding-top: 8px;">
      <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #6B747C;">Filter</span>
      ${v.diffChips.map((dc) => html`
        <button onClick=${dc.toggle} class="hv-ink" style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 0 2px 0; color: ${dc.color}; border-bottom: 2px solid ${dc.border};">${dc.label}</button>
      `)}
    </div>
    <div style="background: #F4F5F6; border: 1px solid #D7DBDF; border-radius: 4px; padding: 10px 16px; display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 20px; row-gap: 4px; font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 12px; color: #4D555C;">
      ${v.diffBusy ? html`<span style="font-style: italic;">rendering against the confirmed ledger…</span>` : null}
      ${v.diffReady ? html`
        <span><span style="color: #14171A; font-weight: 600;">${v.diffCount} changes of note</span> since ${v.diffSinceStr}</span>
        ${v.diffScoped ? html`<span>category: <span style="color: #14171A; font-weight: 600;">${v.diffPillarLabel}</span> · <button onClick=${v.showAllPillars} class="hv-ul" style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 12px; color: #0069AA;">show all</button></span>` : null}
      ` : null}
    </div>

    ${v.diffReady ? html`
      <div>
        ${v.diffUnscoped ? html`
        <section style="border-top: 2px solid #14171A; margin-top: 26px; padding-top: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px 16px;">
            <span style=${KICKER}>Executive summary — what should change your week</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(420px, 100%), 1fr)); column-gap: 56px; align-items: start;">
          ${v.diffTakeaways.map((tw) => html`
            <div style="display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid #E9EBED; align-items: baseline;">
              <span style="width: 6px; height: 6px; background: #10314F; flex-shrink: 0; position: relative; top: -1px;"></span>
              <div style="min-width: 0;">
                <div style="font-family: 'Source Serif 4', Georgia, serif; font-size: 17.5px; line-height: 1.4; font-weight: 600; color: #14171A; text-wrap: pretty;">${tw.head}${NBSP2}<span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #4D555C; border: 1px solid #D7DBDF; border-radius: 4px; padding: 1px 5px; white-space: nowrap; vertical-align: 2px;">${tw.conf}</span></div>
                <p style="margin: 5px 0 0 0; font-size: 15.5px; line-height: 1.55; color: #14171A; max-width: 70ch; text-wrap: pretty;">${tw.body}</p>
                <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; margin-top: 5px;">
                  <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #4D555C;">${tw.pillars}</span>
                </div>
              </div>
            </div>
          `)}
          </div>
        </section>
        ` : null}
        <div style="margin-top: 30px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #6B747C;">${v.diffListLabel}</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(460px, 100%), 1fr)); column-gap: 56px; align-items: start;">
        ${v.diffGroups.map((g) => html`
          <section style="margin-top: 28px;">
            <div style="display: flex; align-items: baseline; gap: 12px; border-bottom: 1px solid #14171A; padding-bottom: 6px;">
              <span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 19px; font-weight: 600; letter-spacing: -0.01em; color: #14171A;">${g.label}</span>
              <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">${g.count} recorded</span>
            </div>
            ${g.items.map((di) => html`
              <div style="display: grid; grid-template-columns: 76px 1fr; gap: 14px; padding: ${v.rowPadTight}; border-bottom: 1px solid #E9EBED; animation: ${di.anim};">
                <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C; padding-top: 2px;">${di.dateStr}</span>
                <div style="min-width: 0;">
                  <span style="font-size: 15.5px; line-height: 1.5; color: #14171A; text-wrap: pretty;">${di.line}</span>
                  <div style="margin-top: 5px;"><a href=${di.srcUrl} target="_blank" rel="noopener" title=${di.srcTitle} class="hv-soft" style=${SRC_CHIP}>${di.src}</a></div>
                </div>
              </div>
            `)}
            ${g.showToggle ? html`<button onClick=${g.toggle} class="hv-ul" style="margin-top: 9px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0069AA;">${g.toggleLabel}</button>` : null}
          </section>
        `)}
        </div>
        <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #D7DBDF; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #6B747C;">Drafted by the system · issued by Technology Risk</div>
      </div>
    ` : null}
  </div>`;
}
