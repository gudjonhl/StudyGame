import type { AppState, LedgerEntry, SessionRecord, StreakState } from '../storage/schema';
import { addDays, uid } from '../utils';
import { BADGES, type BadgeContext } from '../content/badges';

export const POINTS = {
  streakBonus: 50,
  streakBonusAt: 7,
  levelStep: 300,
};

export function getBalance(ledger: LedgerEntry[], kidId: string): number {
  return ledger.reduce((sum, e) => (e.kidId === kidId ? sum + e.amount : sum), 0);
}

/** Lifetime earned points (drives the level), excludes refunds/adjustments. */
export function getTotalEarned(ledger: LedgerEntry[], kidId: string): number {
  return ledger.reduce((sum, e) => (e.kidId === kidId && e.type === 'earned' ? sum + e.amount : sum), 0);
}

export function getLevelInfo(totalEarned: number): { level: number; intoLevel: number; toNext: number } {
  const level = Math.floor(totalEarned / POINTS.levelStep) + 1;
  const intoLevel = totalEarned % POINTS.levelStep;
  return { level, intoLevel, toNext: POINTS.levelStep - intoLevel };
}

export function updateStreak(
  prev: StreakState | undefined,
  today: string,
): { next: StreakState; grantBonus: boolean } {
  const base = prev ?? { current: 0, longest: 0, lastActiveDay: '' };
  if (base.lastActiveDay === today) return { next: base, grantBonus: false };
  const current = base.lastActiveDay === addDays(today, -1) ? base.current + 1 : 1;
  const next = { current, longest: Math.max(base.longest, current), lastActiveDay: today };
  return { next, grantBonus: current === POINTS.streakBonusAt };
}

/** Streak as it should be displayed: 0 if the chain is already broken. */
export function effectiveStreak(streak: StreakState | undefined, today: string): number {
  if (!streak) return 0;
  if (streak.lastActiveDay === today || streak.lastActiveDay === addDays(today, -1)) return streak.current;
  return 0;
}

function buildBadgeContext(state: AppState, kidId: string): BadgeContext {
  const totalEarned = getTotalEarned(state.ledger, kidId);
  return {
    sessions: state.sessions.filter((s) => s.kidId === kidId),
    totalEarned,
    streakLongest: state.streaks[kidId]?.longest ?? 0,
    level: getLevelInfo(totalEarned).level,
    approvedRedemptions: state.redemptions.filter((r) => r.kidId === kidId && r.status === 'approved').length,
  };
}

/** Badge ids newly earned given the current state (idempotent). */
export function checkBadges(state: AppState, kidId: string): string[] {
  const owned = new Set(state.badges[kidId] ?? []);
  const ctx = buildBadgeContext(state, kidId);
  return BADGES.filter((b) => !owned.has(b.id) && b.check(ctx)).map((b) => b.id);
}

/**
 * Apply a finished session: record it, write the ledger, advance the streak
 * (with the 7-day bonus) and grant any new badges. Pure: returns a new state
 * with `lastOutcome` set for the results screen.
 */
export function applySession(state: AppState, record: SessionRecord, today: string): AppState {
  const sessions = [...state.sessions, record];
  const ledger = [...state.ledger];
  if (record.pointsEarned > 0) {
    ledger.push({
      id: uid(),
      kidId: record.kidId,
      type: 'earned',
      amount: record.pointsEarned,
      reason: `${record.taskLabel} – ${record.correct}/${record.total} rétt`,
      refId: record.id,
      timestamp: record.completedAt,
    });
  }
  const { next: streak, grantBonus } = updateStreak(state.streaks[record.kidId], today);
  let streakBonus = 0;
  if (grantBonus) {
    streakBonus = POINTS.streakBonus;
    ledger.push({
      id: uid(),
      kidId: record.kidId,
      type: 'earned',
      amount: streakBonus,
      reason: 'Bónus: 7 dagar í röð! 🔥',
      timestamp: record.completedAt,
    });
  }
  let next: AppState = {
    ...state,
    sessions,
    ledger,
    streaks: { ...state.streaks, [record.kidId]: streak },
  };
  const newBadges = checkBadges(next, record.kidId);
  if (newBadges.length > 0) {
    next = {
      ...next,
      badges: { ...next.badges, [record.kidId]: [...(next.badges[record.kidId] ?? []), ...newBadges] },
    };
  }
  return { ...next, lastOutcome: { recordId: record.id, newBadges, streakBonus } };
}
