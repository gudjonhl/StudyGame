import { describe, expect, it } from 'vitest';
import { exportToJson, parseImport } from './exportImport';
import { createInitialState } from './schema';

describe('export/import', () => {
  it('round-trips the full state', () => {
    const state = createInitialState();
    state.profiles = [
      {
        id: 'kid1',
        name: 'Brynja',
        avatar: '🦄',
        color: '#abc',
        difficulty: { math: 3, danish: 1, icelandic: 2, english: 2 },
        createdAt: '2026-06-12T10:00:00.000Z',
      },
    ];
    state.ledger = [
      { id: 'l1', kidId: 'kid1', type: 'earned', amount: 120, reason: 'Stærðfræði', timestamp: '2026-06-12T10:00:00.000Z' },
    ];
    const imported = parseImport(exportToJson(state));
    expect(imported.profiles).toEqual(state.profiles);
    expect(imported.ledger).toEqual(state.ledger);
    expect(imported.schemaVersion).toBe(state.schemaVersion);
  });

  it('rejects JSON that is not a studygame export', () => {
    expect(() => parseImport('{"foo": 1}')).toThrow();
    expect(() => parseImport('not json at all')).toThrow();
  });

  it('rejects exports from a newer schema version', () => {
    const state = createInitialState();
    const text = exportToJson(state).replace('"schemaVersion": 1', '"schemaVersion": 999');
    expect(() => parseImport(text)).toThrow();
  });
});
