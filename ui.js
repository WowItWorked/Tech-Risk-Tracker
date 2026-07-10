// Shared rendering primitives — Preact + htm, no build step.
import { h, Component, render } from 'https://esm.sh/preact@10.25.4';
import htm from 'https://esm.sh/htm@3.1.1';

export const html = htm.bind(h);
export { h, Component, render };

// App-wide display settings (were Claude Design canvas props).
export const SETTINGS = {
  density: 'comfortable',   // 'comfortable' | 'compact'
  showPending: true,        // show items awaiting verification on the wire
  liveClock: true,          // live 30-minute collection countdown vs frozen demo time
};
