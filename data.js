// Adapter over the generated record (data/record.js). The daily update process
// regenerates the record; this module shapes it for the views and holds the few
// constants that are part of the design rather than the record.

import record from './data/record.js';

export const P = { cyber: 'Cybersecurity', physical: 'Physical security', fraud: 'Fraud', resilience: 'Resilience', data: 'Data risk', ai: 'Artificial intelligence', tp: 'Third-party risk', insider: 'Insider threat' };
export const PS = { cyber: 'Cyber', physical: 'Physical', fraud: 'Fraud', resilience: 'Resilience', data: 'Data', ai: 'AI', tp: 'Third-party', insider: 'Insider' };

export const META = record.meta;
export const lead = record.lead;
export const wire = record.wire;
export const riskAreas = record.riskAreas;
export const diffPool = record.diffPool;
export const takeaways = record.takeaways;
export const publications = record.publications;
export const monthlyReport = record.monthlyReport || null;

// ---------- component sheet (design tokens, not record content) ----------
export const palette = [
  { hex: '#FFFFFF', name: 'bg-1', use: 'page & surfaces — flat white' },
  { hex: '#F4F5F6', name: 'bg-2 · gray-050', use: 'recessed panels · strips · notices' },
  { hex: '#E9EBED', name: 'bg-3 · gray-100', use: 'row separators · hover & keycap fill' },
  { hex: '#D7DBDF', name: 'line-1 · gray-200', use: 'borders · dividers' },
  { hex: '#BCC2C8', name: 'line-2 · gray-300', use: 'stronger borders · double rules' },
  { hex: '#14171A', name: 'gray-900', use: 'display & body ink' },
  { hex: '#4D555C', name: 'gray-600', use: 'secondary text · deks' },
  { hex: '#6B747C', name: 'gray-500', use: 'agate · captions · pending (italic)' },
  { hex: '#10314F', name: 'pnc-navy', use: 'chrome · labels · trust surfaces' },
  { hex: '#0069AA', name: 'pnc-blue', use: 'links · source references' },
  { hex: '#F58025', name: 'pnc-orange', use: 'active states · category bars — one accent per view' },
  { hex: '#8E1B12', name: 'risk-critical', use: 'flash triage only — nothing else, ever' },
  { hex: '#FDEAD7', name: 'orange-100', use: 'reference-highlight wash (animation only)' },
];
