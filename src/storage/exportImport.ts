import type { AppState } from './schema';
import { migrate } from './migrations';
import { todayLocal } from '../utils';

export function exportToJson(state: AppState): string {
  const clean: AppState = { ...state, lastOutcome: null };
  return JSON.stringify({ app: 'studygame', exportedAt: new Date().toISOString(), state: clean }, null, 2);
}

export function downloadExport(state: AppState): void {
  const blob = new Blob([exportToJson(state)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `namsleikur-afrit-${todayLocal()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Throws if the text is not a valid export. */
export function parseImport(text: string): AppState {
  const data = JSON.parse(text) as { app?: string; state?: unknown };
  if (data?.app !== 'studygame' || !data.state) throw new Error('Ekki gilt afrit');
  return migrate(data.state);
}
