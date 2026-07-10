// Compatibility shim: the record now lives in record.json (fetched cache-busted).
// This file exists only so CDN-cached copies of the old data.js — which imported
// ./data/record.js — keep working until their cache expires (≤4h after 2026-07-10).
// Safe to delete after July 11, 2026. The daily update agent must not touch it.
const record = await (await fetch(new URL('./record.json', import.meta.url).href + '?t=' + Date.now())).json();
export default record;
