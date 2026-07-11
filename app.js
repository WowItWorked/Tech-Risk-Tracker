// Tech Risk Tracker — application logic over the generated daily record.
import { h, Component, render, html, SETTINGS } from './ui.js';
import { P, PS, META, lead, wire as WIRE, riskAreas, publications as PUBS, monthlyReport, diffPool, takeaways, palette } from './data.js';
import { Header, Footer, CmdK } from './views-shell.js';
import { Today, RiskIndex, Dossier } from './views-today.js';
import { Publications, Monthly, Diff } from './views-pubs.js';
import { Components } from './views-components.js';

const D = { P, PS, wire: WIRE, lead, riskAreas, diffPool, takeaways, publications: PUBS, monthlyReport };

const hmET = (t) => new Date(t).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/New_York' });
const mdET = (t) => new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'America/New_York' });

class App extends Component {
  state = {
    screen: 'today',
    riskArea: 'ai',
    navMenu: null,
    vw: 1200,
    now: Date.now(),
    pillar: 'all',
    wireSort: 'time',
    diffDate: '2026-06-09',
    diffApplied: '2026-06-09',
    diffSel: [],
    diffExpanded: {},
    pubMoreW: false,
    pubMoreD: false,
    diffBusy: false,
    gq: '',
    gFocus: false,
    cmdk: false,
    cmdkQ: '',
    cmdkI: 0,
    hl: null,
  };

  // ---------- lifecycle ----------
  componentDidMount() {
    this._clock = setInterval(() => this.setState({ now: Date.now() }), 1000);
    this._onResize = () => this.setState({ vw: window.innerWidth });
    window.addEventListener('resize', this._onResize);
    this.setState({ vw: window.innerWidth });
    this._onKey = (e) => this.handleKey(e);
    window.addEventListener('keydown', this._onKey);
    this._onHash = () => {
      const hh = (location.hash || '').replace('#', '');
      if (this.screens().includes(hh) && hh !== this.state.screen) this.setState({ screen: hh });
    };
    window.addEventListener('hashchange', this._onHash);
    const hh = (location.hash || '').replace('#', '');
    if (this.screens().includes(hh)) this.setState({ screen: hh });
  }
  componentWillUnmount() {
    clearInterval(this._clock);
    clearTimeout(this._gsT);
    clearTimeout(this._hlT);
    clearTimeout(this._diffT);
    clearTimeout(this._pubT);
    window.removeEventListener('keydown', this._onKey);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('hashchange', this._onHash);
  }

  screens() { return ['today', 'riskindex', 'dossier', 'publications', 'monthly', 'diff', 'components']; }

  goPub(sec) {
    this.go('publications');
    if (!sec) return;
    clearTimeout(this._pubT);
    this._pubT = setTimeout(() => {
      const el = document.querySelector('[data-pub-sec="' + sec + '"]');
      if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 10; window.scrollTo(0, Math.max(0, y)); }
    }, 220);
  }

  goArea(p) {
    if (!D.riskAreas[p]) { this.go('riskindex'); return; }
    this.setState({ riskArea: p });
    this.go('dossier');
  }

  seedBriefs() { return []; }
  loadBriefs() {
    let extra = [];
    try { extra = JSON.parse(localStorage.getItem('hz-briefs-v1') || '[]'); } catch (err) { extra = []; }
    return this.seedBriefs().concat(Array.isArray(extra) ? extra : []);
  }
  saveBrief(since) {
    try {
      const stored = JSON.parse(localStorage.getItem('hz-briefs-v1') || '[]');
      if (this.seedBriefs().concat(stored).some((b) => b.since === since)) return;
      const ts = new Date(this.state.now).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'America/New_York' });
      stored.push({ id: 'CB-' + String(1 + stored.length).padStart(4, '0'), since, ts });
      localStorage.setItem('hz-briefs-v1', JSON.stringify(stored));
    } catch (err) {}
  }

  go(id) {
    this.setState({ screen: id, cmdk: false, cmdkQ: '', cmdkI: 0, navMenu: null });
    try { history.replaceState(null, '', '#' + id); } catch (err) {}
    window.scrollTo(0, 0);
  }

  handleKey(e) {
    const k = e.key;
    if ((e.metaKey || e.ctrlKey) && (k === 'k' || k === 'K')) {
      e.preventDefault();
      this.setState((s) => ({ cmdk: !s.cmdk, cmdkQ: '', cmdkI: 0 }));
      return;
    }
    if (k === '/' && !this.state.cmdk) {
      const tag = ((e.target && e.target.tagName) || '').toLowerCase();
      if (tag !== 'input' && tag !== 'textarea') { e.preventDefault(); if (this._gsEl) this._gsEl.focus(); }
      return;
    }
    if (k === 'Escape' && this.state.navMenu) { this.setState({ navMenu: null }); return; }
    if (!this.state.cmdk) return;
    if (k === 'Escape') { this.setState({ cmdk: false }); return; }
    const list = this.cmdkFiltered();
    if (k === 'ArrowDown') { e.preventDefault(); this.setState((s) => ({ cmdkI: Math.min(list.length - 1, s.cmdkI + 1) })); }
    else if (k === 'ArrowUp') { e.preventDefault(); this.setState((s) => ({ cmdkI: Math.max(0, s.cmdkI - 1) })); }
    else if (k === 'Enter') { e.preventDefault(); const dd = list[this.state.cmdkI]; if (dd) this.go(dd.id); }
    else if (/^[1-4]$/.test(k) && !this.state.cmdkQ) { const dd = list[parseInt(k, 10) - 1]; if (dd) { e.preventDefault(); this.go(dd.id); } }
  }

  // ---------- clock: countdown to the next 6:00 AM ET publication ----------
  clock() {
    const now = this.state.now;
    const d = new Date(now);
    let cd = '—';
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(d);
      const get = (t) => parseInt(parts.find((p) => p.type === t).value, 10) || 0;
      const secs = (get('hour') % 24) * 3600 + get('minute') * 60 + get('second');
      let rem = 6 * 3600 - secs;
      if (rem <= 0) rem += 86400;
      cd = String(Math.floor(rem / 3600)).padStart(2, '0') + ':' + String(Math.floor((rem % 3600) / 60)).padStart(2, '0') + ':' + String(rem % 60).padStart(2, '0');
    } catch (err) {}
    const dateLong = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' });
    const dateShort = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'America/New_York' });
    return { last: hmET(META.generatedAt), next: '06:00', cd, dateLong, dateShort };
  }

  // ---------- ledger cross-refs ----------
  openLedger(id) {
    let target = 'diff';
    let areaKey = null;
    Object.keys(D.riskAreas).forEach((k) => { if (D.riskAreas[k].events.some((e) => e.id === id)) areaKey = k; });
    if (areaKey) { target = 'dossier'; this.setState({ riskArea: areaKey }); }
    else if (D.wire.some((w) => w.id === id)) target = 'today';
    if (target === 'diff') {
      const item = D.diffPool.find((x) => x.id === id);
      if (item) this.setState((st) => ({ diffExpanded: { ...st.diffExpanded, [item.p]: true } }));
      if (item && item.d <= this.state.diffApplied) {
        const dt = new Date(item.d + 'T00:00:00Z');
        dt.setUTCDate(dt.getUTCDate() - 1);
        const iso = dt.toISOString().slice(0, 10);
        this.setState({ diffDate: iso, diffApplied: iso });
      }
    }
    clearTimeout(this._hlT);
    this.setState({ hl: id, screen: target, cmdk: false });
    try { history.replaceState(null, '', '#' + target); } catch (err) {}
    window.scrollTo(0, 0);
    this._hlT = setTimeout(() => this.setState({ hl: null }), 2600);
  }

  cmdkFiltered() {
    const dests = [
      { id: 'today', name: 'Today', desc: 'front page · daily brief · the wire' },
      { id: 'riskindex', name: 'Risk Areas', desc: 'eight standing watches · changelogs' },
      { id: 'publications', name: 'Publications', desc: 'dailies · weeklies · monthlies' },
      { id: 'diff', name: 'Meeting Prep', desc: 'since your last meeting' },
    ];
    const q = this.state.cmdkQ.trim().toLowerCase();
    return q ? dests.filter((x) => (x.name + ' ' + x.desc).toLowerCase().includes(q)) : dests;
  }

  applyDiff(date) {
    clearTimeout(this._diffT);
    this.setState({ diffDate: date, diffBusy: true, diffSel: [] });
    this._diffT = setTimeout(() => {
      this.saveBrief(date);
      this.setState({ diffApplied: date, diffBusy: false });
    }, 380);
  }

  // ---------- render values ----------
  renderVals() {
    const d = D;
    const s = this.state;
    const c = this.clock();
    const density = SETTINGS.density;

    const scr = s.screen;
    const hlAnim = (id) => (s.hl && s.hl === id ? 'hzHl 2.4s cubic-bezier(0, 0, 0.2, 1) both' : 'none');

    // nav
    const navDefs = [
      { id: 'today', label: 'Today' }, { id: 'riskindex', label: 'Risk Areas' }, { id: 'publications', label: 'Publications' },
      { id: 'diff', label: 'Meeting Prep' },
    ];
    const navActive = { monthly: 'publications', components: '', dossier: 'riskindex' }[scr] || scr;
    const raMenu = Object.keys(d.riskAreas).map((k) => ({ label: d.riskAreas[k].name, meta: 'updated ' + d.riskAreas[k].events[0].date, go: () => this.goArea(k) }));
    const pubMenu = [
      { label: 'Daily briefs', meta: d.publications.dTotal + (d.publications.dTotal === 1 ? ' issue' : ' issues') + ' · weekdays 6:00 am et', go: () => this.goPub('daily') },
      { label: 'Weekly digests', meta: d.publications.wkTotal ? d.publications.wkTotal + ' issues · Fridays' : 'first issue ' + META.nextWeekly, go: () => this.goPub('weekly') },
      { label: 'Monthly reports', meta: d.publications.mTotal ? d.publications.mTotal + ' issues' : 'first issue ' + META.nextMonthly, go: () => this.goPub('monthly') },
      { label: 'Catch-up briefs', meta: 'saved from Meeting Prep', go: () => this.goPub('catchup') },
    ];
    const deskItems = navDefs.map((n) => {
      const menu = n.id === 'riskindex' ? raMenu : n.id === 'publications' ? pubMenu : null;
      const isOpen = !!menu && s.navMenu === n.id;
      return {
        ...n,
        isBurger: false, notBurger: true, ariaLabel: n.label,
        color: n.id === navActive ? '#14171A' : '#6B747C',
        border: n.id === navActive ? '#F58025' : 'transparent',
        go: () => this.go(n.id),
        click: menu ? () => this.setState((st) => ({ navMenu: st.navMenu === n.id ? null : n.id })) : () => this.go(n.id),
        hasMenu: !!menu,
        menuOpen: isOpen,
        caretT: isOpen ? 'rotate(180deg)' : 'none',
        enter: menu ? () => this.setState({ navMenu: n.id }) : () => this.setState((st) => (st.navMenu ? { navMenu: null } : null)),
      };
    });
    const isMobile = (s.vw || 1200) < 640;
    const mobileMenu = navDefs.map((x) => ({
      label: x.label,
      meta: x.id === navActive ? 'you are here' : { today: 'front page · the wire', riskindex: 'eight standing watches', publications: 'dailies · weeklies · monthlies', diff: 'since your last meeting' }[x.id] || '',
      go: () => this.go(x.id),
    }));
    const navItems = isMobile ? [{
      id: 'menu',
      label: '', ariaLabel: 'Menu', isBurger: true, notBurger: false,
      color: '#14171A',
      border: s.navMenu === 'mobile' ? '#F58025' : 'transparent',
      hasMenu: true,
      menuOpen: s.navMenu === 'mobile',
      caretT: s.navMenu === 'mobile' ? 'rotate(180deg)' : 'none',
      click: () => this.setState((st) => ({ navMenu: st.navMenu === 'mobile' ? null : 'mobile' })),
      enter: () => {},
      go: () => {},
    }] : deskItems;
    const panelMenu = s.navMenu === 'mobile' ? mobileMenu : s.navMenu === 'riskindex' ? raMenu : s.navMenu === 'publications' ? pubMenu : null;

    // wire decoration
    const deco = (it) => {
      const flash = it.tri === 'flash';
      const prio = it.tri === 'priority';
      return {
        ...it,
        source: it.src,
        pillarLabel: d.PS[it.p],
        status: 'confirmed',
        triage: it.tri,
        triFg: flash ? '#FFFFFF' : prio ? '#10314F' : '#6B747C',
        triBg: flash ? '#8E1B12' : 'transparent',
        triBd: flash ? '#8E1B12' : prio ? '#10314F' : 'transparent',
        leftRule: flash ? '#8E1B12' : 'transparent',
        titleColor: '#14171A',
        titleStyle: 'normal',
        titleWeight: 500,
        anim: hlAnim(it.id),
      };
    };
    const triRank = { flash: 0, priority: 1, routine: 2 };
    let wire = d.wire
      .filter((w) => (s.pillar === 'all' || w.p === s.pillar));
    if (s.wireSort === 'triage') wire = wire.slice().sort((a, b) => (triRank[a.tri] - triRank[b.tri]) || (Date.parse(b.ts) - Date.parse(a.ts)));
    wire = wire.map((w) => ({ ...deco(w), time: hmET(w.ts), srcDate: mdET(w.ts), linked: true, open: () => this.goArea(w.p), areaTitle: 'Open the ' + d.PS[w.p] + ' dossier', srcUrl: w.srcUrl, srcTitle: 'Open the source for this item' }));

    const pillarChips = [{ id: 'all', label: 'All' }].concat(Object.keys(d.PS).map((k) => ({ id: k, label: d.PS[k] }))).map((pc) => ({
      ...pc,
      color: s.pillar === pc.id ? '#14171A' : '#6B747C',
      border: s.pillar === pc.id ? '#F58025' : 'transparent',
      select: () => this.setState({ pillar: pc.id }),
    }));

    // risk area detail
    const area = d.riskAreas[s.riskArea] || d.riskAreas.ai;
    const srcsFor = (sups) => String(sups || '').split(',').map((t) => t.trim()).filter(Boolean).map((nn) => area.sources.find((x) => x.n === nn)).filter(Boolean).map((x) => ({ text: x.text, url: x.url, title: 'Open the primary source' }));
    const timeline = area.events.map((e, i) => ({
      ...e,
      source: e.src,
      status: 'confirmed',
      nodeBg: '#10314F',
      nodeBd: '#10314F',
      tail: i === area.events.length - 1 ? 'transparent' : '#D7DBDF',
      lineStyle: 'normal',
      lineColor: '#14171A',
      stFg: '#14171A',
      stW: 700,
      stStyle: 'normal',
      stTr: 'uppercase',
      stLs: '0.1em',
      anim: hlAnim(e.id),
      srcUrl: e.srcUrl, srcTitle: 'Open the source for this item',
    }));

    // publications
    const monthlies = (d.publications.monthlies || []).map((m) => ({
      ...m, linked: !!m.linked, unlinked: !m.linked,
      numColor: m.linked ? '#10314F' : '#14171A',
      open: m.linked ? () => this.go('monthly') : undefined,
    }));
    const weekliesAll = d.publications.weeklies || [];
    const dailiesAll = (d.publications.dailies || []).map((x) => ({ ...x, linked: !!x.linked, unlinked: !x.linked, hasFlash: x.flash !== '—', open: x.linked ? () => this.go('today') : undefined }));

    // diff
    const since = s.diffApplied;
    const inWindowAll = d.diffPool.filter((x) => x.d > since);
    const inWindow = s.diffSel.length ? inWindowAll.filter((x) => s.diffSel.indexOf(x.p) >= 0) : inWindowAll;
    const order = ['cyber', 'tp', 'fraud', 'ai', 'insider', 'resilience', 'data', 'physical'];
    const fmtMD = (iso) => { const [y, m, dd] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, dd)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }); };
    const diffGroups = order
      .map((p) => ({ p, label: d.P[p], items: inWindow.filter((x) => x.p === p).sort((a, b) => b.d.localeCompare(a.d)) }))
      .filter((g) => g.items.length)
      .sort((a, b) => b.items.length - a.items.length)
      .map((g) => {
        const expanded = !!s.diffExpanded[g.p];
        const all = g.items.map((x) => ({ ...x, dateStr: fmtMD(x.d), anim: hlAnim(x.id), srcUrl: x.srcUrl, srcTitle: 'Open the source for this item' }));
        return {
          ...g, count: g.items.length,
          items: expanded ? all : all.slice(0, 5),
          showToggle: all.length > 5,
          toggleLabel: expanded ? 'Show fewer' : 'See all ' + all.length + ' →',
          toggle: () => this.setState((st) => ({ diffExpanded: { ...st.diffExpanded, [g.p]: !st.diffExpanded[g.p] } })),
        };
      });
    const fmtLong = (iso) => { const [y, m, dd] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, dd)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }); };

    // executive summary + saved briefs
    const windowIds = new Set(inWindowAll.map((x) => x.id));
    const diffTakeaways = d.takeaways
      .filter((t) => t.anchors.some((a) => windowIds.has(a)))
      .map((t) => ({ ...t, cites: t.anchors.map((id) => ({ id, go: () => this.openLedger(id) })) }));
    const briefsAll = this.loadBriefs();
    const savedBriefs = briefsAll.map((b) => ({
      ...b,
      no: String(parseInt(b.id.slice(3), 10)),
      count: d.diffPool.filter((x) => x.d > b.since).length,
      sinceStr: fmtLong(b.since),
      open: () => { this.go('diff'); this.applyDiff(b.since); },
    })).reverse();

    // global search — whole record, client-side
    const gq = s.gq.trim().toLowerCase();
    let gsResults = [];
    let gsTotal = 0;
    if (gq) {
      const rows = [];
      const nav = (fn) => () => { this.setState({ gq: '', gFocus: false }); fn(); };
      const seen = new Set();
      d.wire.forEach((w) => { if (!seen.has(w.id)) { seen.add(w.id); rows.push({ kind: 'wire', title: w.title, meta: d.PS[w.p].toLowerCase(), go: nav(() => this.openLedger(w.id)) }); } });
      Object.keys(d.riskAreas).forEach((k) => {
        const a = d.riskAreas[k];
        rows.push({ kind: 'risk area', title: a.name + ' — ' + a.watch, meta: a.ver, go: nav(() => this.goArea(k)) });
        a.events.forEach((e) => { if (e.id && !seen.has(e.id)) { seen.add(e.id); rows.push({ kind: 'risk area', title: e.line, meta: e.date, go: nav(() => this.openLedger(e.id)) }); } });
      });
      d.diffPool.forEach((x) => { if (!seen.has(x.id)) rows.push({ kind: 'record', title: x.line, meta: fmtMD(x.d), go: nav(() => this.openLedger(x.id)) }); });
      (d.publications.monthlies || []).forEach((m) => rows.push({ kind: 'issue', title: 'Monthly report No. ' + m.no + ' — ' + m.title, meta: m.month, go: nav(m.linked ? () => this.go('monthly') : () => this.go('publications')) }));
      (d.publications.weeklies || []).forEach((w) => rows.push({ kind: 'issue', title: 'Weekly digest No. ' + w.no + ' — ' + w.range, meta: 'archive', go: nav(() => this.go('publications')) }));
      (d.publications.dailies || []).forEach((x) => rows.push({ kind: 'issue', title: 'Daily brief No. ' + x.no, meta: x.date, go: nav(x.linked ? () => this.go('today') : () => this.go('publications')) }));
      const hit = rows.filter((r) => (r.kind + ' ' + r.title + ' ' + r.meta).toLowerCase().includes(gq));
      gsTotal = hit.length;
      gsResults = hit.slice(0, 9);
    }

    // cmdk
    const ckList = this.cmdkFiltered();
    const cmdkItems = ckList.map((x, i) => ({
      ...x, num: String(i + 1),
      bg: i === s.cmdkI ? '#E9EBED' : 'transparent',
      w: i === s.cmdkI ? 600 : 400,
      go: () => this.go(x.id),
    }));

    const pillarTags = Object.keys(d.PS).map((k) => ({ label: d.PS[k] }));

    return {
      // routing
      isToday: scr === 'today', isDossier: scr === 'dossier', isPublications: scr === 'publications',
      isMonthly: scr === 'monthly', isDiff: scr === 'diff', isComponents: scr === 'components',
      isRiskIndex: scr === 'riskindex',
      navItems,
      pubGoWeekly: () => this.goPub('weekly'),
      pubGoMonthly: () => this.goPub('monthly'),
      pubGoDaily: () => this.go('today'),
      menuPanelOpen: !!panelMenu,
      menuPanelItems: panelMenu || [],
      menuPanelClose: () => this.setState({ navMenu: null }),
      menuPanelHasFooter: s.navMenu !== 'mobile',
      menuPanelFooter: s.navMenu === 'riskindex' ? 'All risk areas' : 'Full archive',
      menuPanelFooterGo: s.navMenu === 'riskindex' ? () => this.go('riskindex') : () => this.go('publications'),
      navLeave: () => this.setState((st) => (st.navMenu ? { navMenu: null } : null)),
      goToday: () => this.go('today'),
      goDiff: () => this.go('diff'),
      goComponents: () => this.go('components'),
      // edition / meta
      editionLabel: String(META.edition).split('—')[0].trim().replace(/\b[a-z]/g, (ch) => ch.toUpperCase()),
      recordHash: META.recordHash,
      issueNo: META.issueNo,
      nextWeekly: META.nextWeekly,
      nextMonthly: META.nextMonthly,
      // clock / status line
      lastRunStr: c.last, nextRunStr: c.next, countdown: c.cd, dateLong: c.dateLong, dateShort: c.dateShort,
      // today
      leadHead: d.lead.head,
      leadDek: d.lead.dek,
      leadItems: d.lead.items.map((x) => ({ ...deco(x), srcText: x.srcText, srcUrl: x.srcUrl, srcTitle: 'Open the primary source', open: () => this.goArea(x.p), areaTitle: 'Open the ' + d.PS[x.p] + ' dossier' })),
      wire, wireCount: wire.length,
      pillarChips,
      sortLabel: s.wireSort === 'time' ? 'newest' : 'triage',
      toggleSort: () => this.setState((st) => ({ wireSort: st.wireSort === 'time' ? 'triage' : 'time' })),
      velocity: (() => {
        const since30 = new Date(this.state.now - 30 * 86400000).toISOString().slice(0, 10);
        const vc = {};
        d.diffPool.forEach((x) => { if (x.d > since30) vc[x.p] = (vc[x.p] || 0) + 1; });
        const vmax = Math.max(1, ...Object.keys(vc).map((k) => vc[k]));
        return Object.keys(d.PS).map((p) => ({
          label: d.PS[p], n: vc[p] || 0, pct: Math.round(((vc[p] || 0) / vmax) * 100),
          open: () => { this.setState({ diffDate: since30, diffApplied: since30, diffSel: [p], diffBusy: false }); this.go('diff'); },
        })).sort((a, b) => b.n - a.n);
      })(),
      vtotal: d.diffPool.filter((x) => x.d > new Date(this.state.now - 30 * 86400000).toISOString().slice(0, 10)).length,
      // front-page rail: executive takeaways + standing assessments
      sideTakeaways: d.takeaways.slice(0, 3).map((t) => ({
        head: t.head, body: t.body, pillars: t.pillars, conf: t.conf,
        go: () => this.go('diff'),
      })),
      takeawaysTotal: d.takeaways.length,
      goDiffFromSide: () => this.go('diff'),
      assessBoard: Object.keys(d.riskAreas).map((k) => {
        const a = d.riskAreas[k];
        const c = String(a.conf || '').toLowerCase();
        const hasAssess = Boolean(a.assess) && !/^no assessment/i.test(String(a.assess)) && c !== 'not rated' && c !== '';
        return {
          label: d.PS[k],
          text: hasAssess ? a.assess : 'No assessment yet — the record holds no confirmed events in this area.',
          hasAssess,
          conf: hasAssess ? a.conf : null,
          confColor: c.startsWith('high') ? '#10314F' : c.startsWith('moderate') ? '#B25C00' : '#6B747C',
          open: () => this.goArea(k),
        };
      }),
      // risk areas
      riskIndex: (() => {
        const since30 = new Date(this.state.now - 30 * 86400000).toISOString().slice(0, 10);
        const vc = {};
        d.diffPool.forEach((x) => { if (x.d > since30) vc[x.p] = (vc[x.p] || 0) + 1; });
        return Object.keys(d.riskAreas).map((k) => {
          const a = d.riskAreas[k];
          return { name: a.name, watch: a.watch, n: vc[k] || 0, meta: (vc[k] || 0) + ' recorded · 30 days · updated ' + String(a.events[0].date).split(',')[0], open: () => this.goArea(k) };
        }).sort((a, b) => b.n - a.n);
      })(),
      raScope: area.scope, raName: area.name, raWatch: area.watch,
      raVer: area.ver, raVerRange: area.verRange, raAsOf: area.asOf,
      raP1: area.p1, raP2: area.p2,
      raAssess: area.assess, raConf: area.conf,
      raConfirmed: String(area.events.length),
      raSrcCount: String(area.sources.length),
      raPillar: d.PS[s.riskArea] || s.riskArea,
      raP1Sources: srcsFor(area.p1Sup), raP2Sources: srcsFor(area.p2Sup), raAssessSources: srcsFor(area.assessSup),
      raFeeds: area.feeds || [],
      rowPad: density === 'compact' ? '8px 0' : '13px 0',
      rowPadTight: density === 'compact' ? '6px 0' : '9px 0',
      // dossier
      timeline,
      // publications
      monthlies,
      mTotal: d.publications.mTotal,
      weeklies: s.pubMoreW ? weekliesAll : weekliesAll.slice(0, 6),
      wkTotal: d.publications.wkTotal,
      wkHasMore: weekliesAll.length > 6,
      wkMoreLabel: s.pubMoreW ? 'Show fewer' : 'More — ' + (weekliesAll.length - 6) + ' older digests →',
      wkToggle: () => this.setState((st) => ({ pubMoreW: !st.pubMoreW })),
      wkShowingLabel: String(s.pubMoreW ? weekliesAll.length : Math.min(6, weekliesAll.length)),
      dailies: s.pubMoreD ? dailiesAll : dailiesAll.slice(0, 6),
      dTotal: d.publications.dTotal,
      dHasMore: dailiesAll.length > 6,
      dMoreLabel: s.pubMoreD ? 'Show fewer' : 'More — ' + (dailiesAll.length - 6) + ' older briefs →',
      dToggle: () => this.setState((st) => ({ pubMoreD: !st.pubMoreD })),
      dShowingLabel: String(s.pubMoreD ? dailiesAll.length : Math.min(6, dailiesAll.length)),
      // monthly
      hasMonthly: !!d.monthlyReport,
      monthlyReport: d.monthlyReport,
      goPublications: () => this.go('publications'),
      // diff
      diffDate: s.diffDate,
      onDiffDate: (e) => this.setState({ diffDate: e.target.value }),
      renderDiff: () => this.applyDiff(s.diffDate),
      diffBusy: s.diffBusy, diffReady: !s.diffBusy,
      diffCount: inWindow.length, diffGroups,
      diffSinceStr: fmtLong(since),
      diffTakeaways, savedBriefs,
      diffScoped: s.diffSel.length > 0,
      diffUnscoped: s.diffSel.length === 0,
      diffPillarLabel: s.diffSel.map((k) => d.P[k]).join(' + '),
      showAllPillars: () => this.setState({ diffSel: [] }),
      diffChips: [{ id: 'all', label: 'All' }].concat(Object.keys(d.PS).map((k) => ({ id: k, label: d.PS[k] }))).map((ch) => {
        const active = ch.id === 'all' ? !s.diffSel.length : s.diffSel.indexOf(ch.id) >= 0;
        return { ...ch, color: active ? '#14171A' : '#6B747C', border: active ? '#F58025' : 'transparent',
          toggle: () => this.setState((st) => {
            if (ch.id === 'all') return { diffSel: [] };
            const has = st.diffSel.indexOf(ch.id) >= 0;
            return { diffSel: has ? st.diffSel.filter((x) => x !== ch.id) : st.diffSel.concat(ch.id) };
          }) };
      }),
      diffListLabel: s.diffSel.length === 0 ? 'Appendix — every recorded change in the window, by category' : 'Reading list — recorded items and sources, newest first',
      // global search
      gq: s.gq,
      onGq: (e) => this.setState({ gq: e.target.value, gFocus: true }),
      onGsFocus: () => this.setState({ gFocus: true }),
      onGsBlur: () => { clearTimeout(this._gsT); this._gsT = setTimeout(() => this.setState({ gFocus: false }), 200); },
      onGsKey: (e) => {
        if (e.key === 'Escape') { this.setState({ gq: '', gFocus: false }); if (e.target && e.target.blur) e.target.blur(); }
        else if (e.key === 'Enter' && gsResults.length) gsResults[0].go();
      },
      gsRef: (el) => { this._gsEl = el; },
      gsBtn: () => { if (this._gsEl) this._gsEl.focus(); },
      gsOpen: !!gq && !!s.gFocus,
      gsResults, gsEmpty: gsTotal === 0,
      gsCountLabel: gsTotal === 0 ? 'nothing in the record matches' : gsTotal > 9 ? 'showing 9 of ' + gsTotal + ' matches' : gsTotal + (gsTotal === 1 ? ' match' : ' matches'),
      // cmdk
      cmdkOpen: s.cmdk, cmdkItems, cmdkQ: s.cmdkQ,
      onCmdkQ: (e) => this.setState({ cmdkQ: e.target.value, cmdkI: 0 }),
      closeCmdk: () => this.setState({ cmdk: false }),
      cmdkRef: (el) => { if (el) el.focus(); },
      // component sheet
      palette, pillarTags,
    };
  }

  render() {
    const v = this.renderVals();
    return html`
    <div style="min-height: 100vh; display: flex; flex-direction: column; background: #FFFFFF; color: #14171A; font-family: 'Public Sans', system-ui, sans-serif;">
      ${Header(v)}
      <main style="flex: 1; width: 100%; max-width: 1320px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 32px) 56px clamp(16px, 4vw, 32px);">
        ${v.isToday ? Today(v) : null}
        ${v.isRiskIndex ? RiskIndex(v) : null}
        ${v.isDossier ? Dossier(v) : null}
        ${v.isPublications ? Publications(v) : null}
        ${v.isMonthly ? Monthly(v) : null}
        ${v.isDiff ? Diff(v) : null}
        ${v.isComponents ? Components(v) : null}
      </main>
      ${Footer(v)}
      ${CmdK(v)}
    </div>`;
  }
}

render(h(App), document.getElementById('app'));
