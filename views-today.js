// Screens: Today (front page + the wire), Risk Areas index, and the risk-area dossier.
import { html } from './ui.js';

const KICKER = "font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #10314F;";
// Uniform chips: source-material links (blue) and risk-area labels (navy on gray).
export const SRC_CHIP = "font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 600; color: #0069AA; background: #F4F9FC; border: 1px solid #C5E2F0; border-radius: 999px; padding: 2px 9px; line-height: 1.4;";
export const AREA_CHIP = "font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 600; color: #10314F; background: #F1F3F4; border: 1px solid #D7DBDF; border-radius: 999px; padding: 2px 9px; line-height: 1.4; white-space: nowrap;";
const NBSP2 = '  ';

export function Today(v) {
  return html`
  <div style="display: flex; flex-wrap: wrap; gap: 56px; padding-top: 26px; animation: hzIn 200ms cubic-bezier(0.2, 0, 0, 1);">

    <div style="flex: 1 1 600px; min-width: 0;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px 16px;">
        <span style=${KICKER}>The daily brief</span>
      </div>
      <h2 style="margin: 12px 0 10px 0; font-family: 'Source Serif 4', Georgia, serif; font-optical-sizing: auto; font-size: clamp(30px, 4.6vw, 43px); line-height: 1.12; font-weight: 600; letter-spacing: -0.015em; color: #14171A; text-wrap: pretty;">${v.leadHead}</h2>
      <p style="margin: 0 0 16px 0; font-size: 19px; line-height: 1.5; color: #4D555C; max-width: 62ch; text-wrap: pretty;">${v.leadDek}</p>

      ${v.leadItems.map((li) => html`
        <div style="display: flex; gap: 14px; padding: 13px 0; border-top: 1px solid #E9EBED;">
          <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 12px; color: #10314F; min-width: 16px; padding-top: 3px;">${li.n}</span>
          <div style="min-width: 0;">
            <p style="margin: 0; font-size: 16.5px; line-height: 1.58; color: #14171A; text-wrap: pretty;">${li.text}${NBSP2}<button onClick=${li.open} title=${li.areaTitle} class="hv-soft" style="${AREA_CHIP} vertical-align: 2px;">${li.pillarLabel}</button></p>
            <p style="margin: 6px 0 0 0; font-family: 'Public Sans', system-ui, sans-serif; font-size: 12.5px; line-height: 1.55; color: #4D555C; max-width: 78ch; text-wrap: pretty;"><span style="font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #10314F;">Why it matters</span> — ${li.why}</p>
            <div style="margin-top: 7px; display: flex; flex-wrap: wrap; gap: 5px 8px;"><a href=${li.srcUrl} target="_blank" rel="noopener" title=${li.srcTitle} class="hv-soft" style=${SRC_CHIP}>${li.srcText}</a></div>
          </div>
        </div>
      `)}

      <div style="margin-top: 36px; border-top: 2px solid #14171A; padding-top: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px 16px;">
          <span style=${KICKER}>The wire — every update today</span>
          <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">Updated ${v.lastRunStr} ET · ${v.wireCount} Items</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px 18px; padding: 10px 0; border-bottom: 1px solid #D7DBDF;">
          <div style="display: flex; flex-wrap: wrap; gap: 2px 14px;">
            ${v.pillarChips.map((pc) => html`
              <button onClick=${pc.select} class="hv-ink" style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 0 2px 0; color: ${pc.color}; border-bottom: 2px solid ${pc.border};">${pc.label}</button>
            `)}
          </div>
          <button onClick=${v.toggleSort} class="hv-ink" style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #6B747C;">sort: ${v.sortLabel} ▾</button>
        </div>
        ${v.wire.map((w) => html`
          <div class="hv-soft" style="display: grid; grid-template-columns: 56px 1fr; gap: 14px; padding: ${v.rowPad}; padding-left: 10px; border-left: 3px solid ${w.leftRule}; border-bottom: 1px solid #E9EBED; animation: ${w.anim};">
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11.5px; color: #6B747C; padding-top: 3px;">${w.time}</span>
            <div style="min-width: 0;">
              <div style="font-size: 17px; line-height: 1.45; font-weight: ${w.titleWeight}; font-style: ${w.titleStyle}; color: ${w.titleColor}; text-wrap: pretty;">${w.title}</div>
              <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 5px 8px; margin-top: 6px;">
                <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${w.triFg}; background: ${w.triBg}; border: 1px solid ${w.triBd}; border-radius: 999px; padding: 2px 8px; line-height: 1.3;">${w.triage}</span>
                <a href=${w.srcUrl} target="_blank" rel="noopener" title=${w.srcTitle} class="hv-soft" style="${SRC_CHIP} white-space: nowrap;">${w.source} · ${w.srcDate}</a>
                ${w.linked ? html`<button onClick=${w.open} title=${w.areaTitle} class="hv-soft" style=${AREA_CHIP}>${w.pillarLabel}</button>` : html`<span style=${AREA_CHIP}>${w.pillarLabel}</span>`}
              </div>
            </div>
          </div>
        `)}
      </div>
    </div>

    <aside style="flex: 1 1 280px; max-width: 460px; min-width: 0;">
      <div style="border-top: 2px solid #14171A; padding-top: 10px; margin-bottom: 28px;">
        <div style=${KICKER}>Updates in past 30 days by category</div>
        <div style="margin-top: 8px;">
          ${v.velocity.map((vel) => html`
            <button onClick=${vel.open} title="Read this pillar’s confirmed items and sources" class="hv-soft" style="display: grid; grid-template-columns: 1fr 84px 28px; align-items: center; gap: 10px; padding: 6.5px 0; border-bottom: 1px solid #E9EBED; width: 100%;">
              <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #10314F;">${vel.label}</span>
              <span style="display: block; height: 6px; background: #E9EBED;"><span style="display: block; height: 6px; width: ${vel.pct}%; background: #F58025;"></span></span>
              <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 12px; color: #14171A; text-align: right;">${vel.n}</span>
            </button>
          `)}
          <div style="display: flex; justify-content: space-between; padding: 7px 0; font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">
            <span>Total</span><span>${v.vtotal}</span>
          </div>
        </div>
      </div>

      <div style="border-top: 2px solid #14171A; padding-top: 10px; margin-bottom: 28px;">
        <div style=${KICKER}>Next update</div>
        <p style="margin: 8px 0 0 0; font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 13px; line-height: 1.6; color: #14171A;">${v.nextRunStr} ET — in ${v.countdown}</p>
        <p style="margin: 6px 0 0 0; font-family: 'Public Sans', system-ui, sans-serif; font-size: 12px; line-height: 1.5; color: #6B747C; text-wrap: pretty;">Sources are collected and verified once daily; the brief publishes weekdays at 6:00 AM ET. This issue was generated at ${v.lastRunStr} ET.</p>
      </div>

      <div style="border-top: 2px solid #14171A; padding-top: 10px;">
        <div style=${KICKER}>Upcoming publications</div>
        <div style="margin-top: 8px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 12.5px; line-height: 1.5; color: #4D555C;">
          <button onClick=${v.pubGoWeekly} title="Open the weekly digest archive" class="hv-soft" style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; width: 100%; padding: 6px 0; border-bottom: 1px solid #E9EBED;"><span style="color: #0069AA; white-space: nowrap;">Weekly digest →</span><span style="color: #6B747C; font-size: 11.5px; text-align: right;">${v.nextWeekly}</span></button>
          <button onClick=${v.pubGoMonthly} title="Open the monthly report archive" class="hv-soft" style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; width: 100%; padding: 6px 0; border-bottom: 1px solid #E9EBED;"><span style="color: #0069AA; white-space: nowrap;">Monthly report →</span><span style="color: #6B747C; font-size: 11.5px; text-align: right;">${v.nextMonthly}</span></button>
          <button onClick=${v.pubGoDaily} title="Open today’s brief" class="hv-soft" style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; width: 100%; padding: 6px 0;"><span style="color: #0069AA; white-space: nowrap;">Daily brief →</span><span style="color: #6B747C; font-size: 11.5px; text-align: right;">Weekdays 6:00 AM ET</span></button>
        </div>
      </div>
    </aside>
  </div>`;
}

export function RiskIndex(v) {
  return html`
  <div style="padding-top: 26px; animation: hzIn 200ms cubic-bezier(0.2, 0, 0, 1);">
    <span style=${KICKER}>Risk areas — standing watches</span>
    <h2 style="margin: 10px 0 6px 0; font-family: 'Source Serif 4', Georgia, serif; font-size: clamp(28px, 4vw, 38px); line-height: 1.15; font-weight: 600; letter-spacing: -0.015em; color: #14171A;">Eight risks, monitored continuously</h2>
    <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #4D555C; column-width: 420px; column-gap: 56px; text-wrap: pretty;">Each risk area is a living page: current state, a standing assessment, a changelog, and its sources. Everything on these pages traces to an allowlisted set of trusted sources — regulators, federal agencies, standards bodies, frontier labs, and vetted trade press — and every item links to its source. Emphasis falls on changes with systemic reach — shared infrastructure, common providers, sector-wide patterns — over single-institution noise.</p>
    <div style="border-top: 2px solid #14171A; margin-top: 24px;"></div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(460px, 100%), 1fr)); column-gap: 56px; align-items: start;">
    ${v.riskIndex.map((ri) => html`
      <button onClick=${ri.open} class="hv-soft" style="display: grid; grid-template-columns: 1fr auto; gap: 6px 18px; align-items: baseline; width: 100%; padding: 15px 0; border-bottom: 1px solid #E9EBED; text-align: left;">
        <span style="min-width: 0;">
          <span style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 14px;">
            <span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 20px; font-weight: 600; letter-spacing: -0.01em; color: #14171A;">${ri.name}</span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 10.5px; color: #97A0A8;">${ri.meta}</span>
          </span>
          <span style="display: block; margin-top: 4px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 13px; line-height: 1.5; color: #4D555C; max-width: 82ch; text-wrap: pretty;">${ri.watch}</span>
        </span>
        <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #10314F; white-space: nowrap;">Open →</span>
      </button>
    `)}
    </div>
  </div>`;
}

const srcRow = (list) => html`<div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 5px 8px; margin-top: 8px;"><span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #6B747C;">Sources</span>${list.map((sx) => html`<a href=${sx.url} target="_blank" rel="noopener" title=${sx.title} class="hv-soft" style=${SRC_CHIP}>${sx.text}</a>`)}</div>`;

export function Dossier(v) {
  return html`
  <div style="padding-top: 26px; animation: hzIn 200ms cubic-bezier(0.2, 0, 0, 1);">
    <div style="display: flex; flex-wrap: wrap; gap: 56px;">
      <div style="flex: 1 1 560px; min-width: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px 16px;">
          <span style=${KICKER}>Risk — ${v.raScope}</span>
        </div>
        <h2 style="margin: 10px 0 8px 0; font-family: 'Source Serif 4', Georgia, serif; font-optical-sizing: auto; font-size: clamp(28px, 4vw, 40px); line-height: 1.15; font-weight: 600; letter-spacing: -0.015em; color: #14171A; max-width: 26ch; text-wrap: pretty;">${v.raName}</h2>
        <p style="margin: 0 0 10px 0; font-size: 17px; line-height: 1.5; color: #4D555C; max-width: 62ch; text-wrap: pretty;">${v.raWatch}</p>
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 26px;">
          <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11.5px; color: #14171A;">As of ${v.raAsOf}</span>
        </div>

        <div style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #6B747C; border-bottom: 1px solid #D7DBDF; padding-bottom: 6px;">Current state</div>
        <p style="margin: 14px 0 0 0; font-size: 16.5px; line-height: 1.62; color: #14171A; max-width: 76ch; text-wrap: pretty;">${v.raP1}</p>
        ${srcRow(v.raP1Sources)}
        <p style="margin: 12px 0 0 0; font-size: 16.5px; line-height: 1.62; color: #14171A; max-width: 76ch; text-wrap: pretty;">${v.raP2}</p>
        ${srcRow(v.raP2Sources)}
        <div style="border-top: 2px solid #14171A; background: #F4F5F6; margin: 18px 0; padding: 14px 18px 16px 18px;">
          <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #10314F;">Current assessment</span>
          <p style="margin: 8px 0 0 0; font-size: 17px; line-height: 1.55; font-weight: 500; color: #14171A; max-width: 72ch; text-wrap: pretty;">${v.raAssess}${NBSP2}<span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #4D555C; border: 1px solid #D7DBDF; border-radius: 4px; padding: 1px 5px; white-space: nowrap; vertical-align: 2px;">${v.raConf}</span></p>
          ${srcRow(v.raAssessSources)}
        </div>

        <div style="margin-top: 30px; border-top: 2px solid #14171A; padding-top: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px 16px; margin-bottom: 14px;">
            <span style=${KICKER}>Key change update</span>
            <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; color: #6B747C;">Newest First · ${v.raVerRange}</span>
          </div>
          ${v.timeline.map((e) => html`
            <div style="display: grid; grid-template-columns: 76px 18px 1fr; column-gap: 12px; padding: 2px 0 0 0; animation: ${e.anim};">
              <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 11px; line-height: 1.5; color: #6B747C; text-align: right; padding-top: 2px;">${e.date}</span>
              <span style="position: relative; display: block;">
                <span style="position: absolute; left: 8px; top: 6px; bottom: -6px; width: 1px; background: ${e.tail};"></span>
                <span style="position: absolute; left: 4.5px; top: 5px; width: 8px; height: 8px; background: ${e.nodeBg}; border: 1px solid ${e.nodeBd};"></span>
              </span>
              <div style="padding-bottom: 22px; min-width: 0;">
                <div style="font-size: 16px; line-height: 1.5; font-style: ${e.lineStyle}; color: ${e.lineColor}; text-wrap: pretty;">${e.line}</div>
                <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; margin-top: 4px;">
                  <span style="font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 10.5px; font-weight: 600; color: #10314F;">${e.ver}</span>
                  <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: ${e.stW}; letter-spacing: ${e.stLs}; text-transform: ${e.stTr}; font-style: ${e.stStyle}; color: ${e.stFg};">${e.status}</span>
                  <a href=${e.srcUrl} target="_blank" rel="noopener" title=${e.srcTitle} class="hv-soft" style="${SRC_CHIP} white-space: nowrap;">${e.source}</a>
                </div>
              </div>
            </div>
          `)}
        </div>
      </div>

      <aside style="flex: 1 1 280px; max-width: 460px; min-width: 0;">
        <div style="border-top: 2px solid #14171A; padding-top: 10px; margin-bottom: 28px;">
          <div style=${KICKER}>Monitored feeds — government, trade & press</div>
          ${v.raFeeds.map((f) => html`
            <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; padding: 7px 0; border-bottom: 1px solid #E9EBED;">
              <a href=${f.url} target="_blank" rel="noopener" title="Open this publication" class="hv-soft" style="${SRC_CHIP} white-space: nowrap;">${f.name}</a>
              <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; color: #6B747C; text-align: right;">${f.desc}</span>
            </div>
          `)}
          <p style="margin: 8px 0 0 0; font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; line-height: 1.5; color: #6B747C; text-wrap: pretty;">Every item on this page enters the record from these allowlisted, trusted feeds and links to its source.</p>
        </div>
        <div style="border-top: 2px solid #14171A; padding-top: 10px; margin-bottom: 28px;">
          <div style=${KICKER}>Coverage</div>
          <div style="margin-top: 8px; font-family: 'Public Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-size: 12px; line-height: 1.5; color: #4D555C;">
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E9EBED;"><span>Recorded Events</span><span style="color: #14171A;">${v.raConfirmed}</span></div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E9EBED;"><span>Primary Sources</span><span style="color: #14171A;">${v.raSrcCount}</span></div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0;"><span>Category</span><span style="color: #14171A;">${v.raPillar}</span></div>
          </div>
        </div>
      </aside>
    </div>
  </div>`;
}
