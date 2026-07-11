// Shared chrome — masthead, persistent nav with menus and global search, footer, ⌘K switcher.
import { html } from './ui.js';

export function Header(v) {
  return html`
  <header style="width: 100%;">
    <div style="max-width: 1320px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 32px);">

      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px 16px; padding: 14px 0 0 0; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #4D555C;">
          <span style="color: #6B747C; margin-left: auto;">${v.editionLabel}</span>
        </div>
        <h1 style="margin: 0; padding: 8px 0 14px 0; text-align: center; font-family: 'Source Serif 4', Georgia, serif; font-optical-sizing: auto; font-size: clamp(34px, 5.4vw, 56px); font-weight: 600; letter-spacing: -0.02em; line-height: 1; color: #14171A;"><button onClick=${v.goToday} style="font: inherit; color: inherit; letter-spacing: inherit;">Tech Risk Tracker</button></h1>
        <div style="border-top: 1px solid #D7DBDF; border-bottom: 3px double #BCC2C8; padding: 6px 0; display: flex; flex-wrap: wrap; justify-content: center; column-gap: 22px; row-gap: 2px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; letter-spacing: 0.04em; color: #4D555C;">
          <span>Daily Edition</span>
          <span aria-hidden="true" style="color: #BCC2C8;">|</span>
          <span style="font-weight: 600; color: #14171A;">${v.dateLong}</span>
        </div>
      </div>

      <nav onMouseLeave=${v.navLeave} style="position: relative; border-bottom: 2px solid #14171A; display: flex; justify-content: space-between; align-items: center; gap: clamp(16px, 4vw, 56px);">
        <div style="flex: 1 1 600px; min-width: 0; display: flex; flex-wrap: wrap; gap: 0 clamp(14px, 3vw, 30px);">
          ${v.navItems.map((n) => html`
            <span onMouseEnter=${n.enter} style="display: inline-block;">
              <button onClick=${n.click} aria-haspopup=${n.hasMenu} aria-expanded=${n.menuOpen} aria-label=${n.ariaLabel} class="hv-ink" style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.03em; padding: 10px 0 8px 0; white-space: nowrap; color: ${n.color}; border-bottom: 2px solid ${n.border}; margin-bottom: -2px;">${
                n.isBurger
                  ? html`<span aria-hidden="true" style="display: inline-flex; flex-direction: column; gap: 4px; padding: 4px 2px 3px 2px;"><span style="display: block; width: 20px; height: 2px; background: #14171A;"></span><span style="display: block; width: 20px; height: 2px; background: #14171A;"></span><span style="display: block; width: 20px; height: 2px; background: #14171A;"></span></span>`
                  : html`<span>${n.label}</span>${n.hasMenu ? html`<span style="display: inline-block; font-size: 8.5px; color: #97A0A8; padding-left: 5px; vertical-align: 2px; transform: ${n.caretT}; transition: transform 140ms cubic-bezier(0.2, 0, 0, 1);">▼</span>` : null}`
              }</button>
            </span>
          `)}
        </div>
        <div style="display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1 1 280px; max-width: 460px; justify-content: flex-end;">
          <span style="position: relative; display: inline-flex; min-width: 0; flex: 1;">
            <button onClick=${v.gsBtn} title="Search — press / anywhere" aria-label="Search" class="hv-ink" style="display: inline-flex; align-items: center; color: #6B747C; border-bottom: 1px solid #BCC2C8; padding: 3px 6px 4px 0;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line></svg></button>
            <input ref=${v.gsRef} value=${v.gq} onInput=${v.onGq} onFocus=${v.onGsFocus} onBlur=${v.onGsBlur} onKeyDown=${v.onGsKey} placeholder="Search" aria-label="Search the confirmed record" title="Search everything confirmed — press /" class="fc-navy" style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 11.5px; color: #14171A; background: transparent; border-bottom: 1px solid #BCC2C8; padding: 3px 2px; width: 100%; min-width: 0;" />
            ${v.gsOpen ? html`
              <div style="position: absolute; top: calc(100% + 8px); right: 0; z-index: 60; width: min(520px, 88vw); background: #FFFFFF; border: 1px solid #BCC2C8; border-radius: 6px; box-shadow: 0 12px 28px rgba(16, 49, 79, 0.16), 0 4px 8px rgba(16, 49, 79, 0.08); overflow: hidden; animation: hzIn 140ms cubic-bezier(0.2, 0, 0, 1);">
                ${v.gsResults.map((r) => html`
                  <button onMouseDown=${r.go} class="hv-row" style="display: grid; grid-template-columns: 58px 1fr auto; align-items: baseline; gap: 10px; width: 100%; padding: 9px 14px; border-bottom: 1px solid #E9EBED; text-align: left;">
                    <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #6B747C;">${r.kind}</span>
                    <span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 14.5px; line-height: 1.35; color: #14171A; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${r.title}</span>
                    <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 10px; color: #97A0A8; white-space: nowrap;">${r.meta}</span>
                  </button>
                `)}
                ${v.gsEmpty ? html`<div style="padding: 14px 16px; font-size: 14.5px; font-style: italic; color: #6B747C;">No matches in the confirmed record for “${v.gq}”.</div>` : null}
                <div style="padding: 7px 14px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 9.5px; letter-spacing: 0.08em; text-transform: uppercase; color: #97A0A8; background: #F4F5F6;">${v.gsCountLabel} · ↵ opens first · esc closes</div>
              </div>
            ` : null}
          </span>
          ${v.menuPanelOpen ? html`
            <button onClick=${v.menuPanelClose} aria-label="Close menu" style="position: fixed; inset: 0; z-index: 69; background: transparent; cursor: default;"></button>
            <div style="position: absolute; top: 100%; left: 0; width: min(340px, calc(100vw - 32px)); z-index: 70; background: #FFFFFF; border: 1px solid #BCC2C8; border-top: 2px solid #14171A; border-radius: 0 0 6px 6px; box-shadow: 0 12px 28px rgba(16, 49, 79, 0.14), 0 4px 8px rgba(16, 49, 79, 0.07); padding: 8px; animation: hzIn 140ms cubic-bezier(0.2, 0, 0, 1);">
              <div style="display: grid; grid-template-columns: 1fr; gap: 1px;">
                ${v.menuPanelItems.map((mi) => html`
                  <button onClick=${mi.go} class="hv-row" style="display: block; width: 100%; text-align: left; padding: 8px 10px; border-radius: 4px;">
                    <span style="display: block; font-family: 'Source Serif 4', Georgia, serif; font-size: 15px; font-weight: 500; line-height: 1.3; color: #14171A;">${mi.label}</span>
                    <span style="display: block; margin-top: 1px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; color: #6B747C;">${mi.meta}</span>
                  </button>
                `)}
              </div>
              ${v.menuPanelHasFooter ? html`
                <button onClick=${v.menuPanelFooterGo} class="hv-ul" style="display: block; width: 100%; text-align: left; margin-top: 6px; padding: 8px 10px 5px 10px; border-top: 1px solid #E9EBED; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0069AA;">${v.menuPanelFooter} →</button>
              ` : null}
            </div>
          ` : null}
        </div>
      </nav>
    </div>
  </header>`;
}

export function Footer(v) {
  return html`
  <footer style="background: #10314F; margin-top: 8px;">
    <div style="max-width: 1320px; margin: 0 auto; padding: 22px clamp(16px, 4vw, 32px) 26px clamp(16px, 4vw, 32px);">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 8px 24px;">
        <button onClick=${v.goToday} style="font-family: 'Source Serif 4', Georgia, serif; font-size: 19px; font-weight: 600; letter-spacing: -0.02em; color: #FFFFFF; line-height: 1;">Tech Risk Tracker</button>
        <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 10.5px; color: #8FA3B5;">record ${v.recordHash} · updated weekdays 6:00 am et</span>
      </div>
      <p style="margin: 12px 0 0 0; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.18); font-family: 'Public Sans', system-ui, sans-serif; font-size: 11px; font-style: italic; line-height: 1.5; color: #B9C7D6; max-width: 110ch; text-wrap: pretty;">Content derives solely from an allowlisted set of trusted official and vetted press sources; every item links to its source. Summaries are AI-drafted under a binding <a href="EDITORIAL.md" style="color: #B9C7D6;">editorial policy</a>; analytic assessments are labeled with confidence. Challenged items are re-verified against their primary sources; corrections publish as new record versions.</p>
    </div>
  </footer>`;
}

export function CmdK(v) {
  if (!v.cmdkOpen) return null;
  return html`
  <div style="position: fixed; inset: 0; z-index: 90;">
    <div onClick=${v.closeCmdk} style="position: absolute; inset: 0; background: rgba(13, 22, 32, 0.42);"></div>
    <div role="dialog" aria-label="Quick switcher" style="position: relative; margin: 16vh auto 0 auto; width: min(540px, 92vw); background: #FFFFFF; border: 1px solid #BCC2C8; border-radius: 6px; box-shadow: 0 12px 28px rgba(16, 49, 79, 0.2), 0 4px 8px rgba(16, 49, 79, 0.08); overflow: hidden; animation: hzIn 160ms cubic-bezier(0.2, 0, 0, 1);">
      <div style="border-bottom: 1px solid #D7DBDF; padding: 11px 16px; display: flex; align-items: center; gap: 12px;">
        <input ref=${v.cmdkRef} value=${v.cmdkQ} onInput=${v.onCmdkQ} placeholder="Go to…" aria-label="Filter destinations" style="flex: 1; font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 13px; color: #14171A; background: transparent; min-width: 0;" />
        <span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 9.5px; color: #6B747C; border: 1px solid #BCC2C8; border-radius: 4px; padding: 1px 6px;">esc</span>
      </div>
      ${v.cmdkItems.map((ck) => html`
        <button onClick=${ck.go} class="hv-row" style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; width: 100%; padding: 11px 16px; background: ${ck.bg};">
          <span style="display: flex; gap: 12px; align-items: baseline;"><span style="font-family: 'IBM Plex Mono', Menlo, monospace; font-size: 11px; color: #97A0A8;">${ck.num}</span><span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 16px; font-weight: ${ck.w}; color: #14171A;">${ck.name}</span></span>
          <span style="font-family: 'Public Sans', system-ui, sans-serif; font-size: 10.5px; color: #6B747C; text-align: right;">${ck.desc}</span>
        </button>
      `)}
      <div style="border-top: 1px solid #E9EBED; padding: 8px 16px; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #97A0A8;">↑↓ navigate · ↵ open · 1–4 jump · esc close</div>
    </div>
  </div>`;
}
