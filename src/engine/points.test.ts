import { describe, expect, it } from 'vitest';
import {
  applySession,
  effectiveStreak,
  getBalance,
  getLevelInfo,
  getTotalEarned,
  POINTS,
  updateStreak,
} from './points';
import { createInitialState, type AppState, type LedgerEntry, type SessionRecord } from '../storage/schema';

function entry(kidId: string, type: LedgerEntry['type'], amount: number): LedgerEntry {
  return { id: Math.random().toString(36), kidId, type, amount, reason: 'test', timestamp: new Date().toISOString() };
}

function record(kidId: string, overrides: Partial<SessionRecord> = {}): SessionRecord {
  return {
    id: Math.random().toString(36),
    kidId,
    subject: 'math',
    taskType: 'addsub',
    taskLabel: 'Samlagning',
    level: 2,
    total: 10,
    correct: 8,
    pointsEarned: 80,
    durationSec: 120,
    completedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('streaks', () => {
  it('starts at 1 for a fresh kid', () => {
    const { next, grantBonus } = updateStreak(undefined, '2026-06-12');
    expect(next).toEqual({ current: 1, longest: 1, lastActiveDay: '2026-06-12' });
    expect(grantBonus).toBe(false);
  });

  it('does not change twice on the same day', () => {
    const day1 = updateStreak(undefined, '2026-06-12').next;
    const { next } = updateStreak(day1, '2026-06-12');
    expect(next.current).toBe(1);
  });

  it('increments on consecutive days and handles month boundaries', () => {
    let s = updateStreak(undefined, '2026-05-31').next;
    s = updateStreak(s, '2026-06-01').next;
    expect(s.current).toBe(2);
  });

  it('resets after a gap but keeps the longest record', () => {
    let s = updateStreak(undefined, '2026-06-01').next;
    s = updateStreak(s, '2026-06-02').next;
    s = updateStreak(s, '2026-06-05').next;
    expect(s.current).toBe(1);
    expect(s.longest).toBe(2);
  });

  it('grants the bonus exactly when the streak reaches 7', () => {
    let s = updateStreak(undefined, '2026-06-01').next;
    let bonusDays = 0;
    for (let d = 2; d <= 9; d++) {
      const r = updateStreak(s, `2026-06-0${d}`);
      s = r.next;
      if (r.grantBonus) bonusDays++;
    }
    expect(bonusDays).toBe(1);
    expect(s.current).toBe(9);
  });

  it('effectiveStreak shows 0 once the chain is broken', () => {
    const s = { current: 5, longest: 5, lastActiveDay: '2026-06-01' };
    expect(effectiveStreak(s, '2026-06-12')).toBe(0);
    expect(effectiveStreak(s, '2026-06-02')).toBe(5);
    expect(effectiveStreak(undefined, '2026-06-12')).toBe(0);
  });
});

describe('balance and levels', () => {
  it('sums signed ledger amounts per kid', () => {
    const ledger = [entry('a', 'earned', 100), entry('a', 'spent', -30), entry('a', 'refund', 30), entry('b', 'earned', 999)];
    expect(getBalance(ledger, 'a')).toBe(100);
    expect(getTotalEarned(ledger, 'a')).toBe(100);
  });

  it('computes levels from total earned', () => {
    expect(getLevelInfo(0).level).toBe(1);
    expect(getLevelInfo(POINTS.levelStep - 1).level).toBe(1);
    expect(getLevelInfo(POINTS.levelStep).level).toBe(2);
    expect(getLevelInfo(POINTS.levelStep * 4).level).toBe(5);
  });
});

describe('applySession', () => {
  function freshState(): AppState {
    const s = createInitialState();
    s.profiles = [
      {
        id: 'kid1',
        name: 'Anna',
        avatar: '🦊',
        color: '#fff',
        difficulty: { math: 2, danish: 1, icelandic: 2, english: 2 },
        createdAt: new Date().toISOString(),
      },
    ];
    return s;
  }

  it('records the session, writes the ledger and grants first badges', () => {
    const next = applySession(freshState(), record('kid1', { correct: 10, total: 10, pointsEarned: 120 }), '2026-06-12');
    expect(next.sessions.length).toBe(1);
    expect(getBalance(next.ledger, 'kid1')).toBe(120);
    expect(next.lastOutcome?.newBadges).toContain('first-session');
    expect(next.lastOutcome?.newBadges).toContain('first-perfect');
    expect(next.streaks['kid1'].current).toBe(1);
  });

  it('does not write a ledger entry for zero points', () => {
    const next = applySession(freshState(), record('kid1', { correct: 0, pointsEarned: 0 }), '2026-06-12');
    expect(next.ledger.length).toBe(0);
    expect(next.sessions.length).toBe(1);
  });

  it('adds the streak bonus ledger entry on day 7', () => {
    let state = freshState();
    for (let d = 1; d <= 7; d++) {
      state = applySession(state, record('kid1'), `2026-06-0${d}`);
    }
    const bonus = state.ledger.filter((e) => e.reason.includes('7 dagar'));
    expect(bonus.length).toBe(1);
    expect(bonus[0].amount).toBe(POINTS.streakBonus);
    expect(state.lastOutcome?.streakBonus).toBe(POINTS.streakBonus);
  });

  it('never grants the same badge twice', () => {
    let state = freshState();
    state = applySession(state, record('kid1'), '2026-06-12');
    state = applySession(state, record('kid1'), '2026-06-12');
    const all = state.badges['kid1'];
    expect(new Set(all).size).toBe(all.length);
  });
});
