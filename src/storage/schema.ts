/**
 * All persisted types. The whole app state lives under one localStorage key
 * (see store.tsx). Derived values such as point balances are computed from
 * the ledger, never stored.
 */

export type SubjectId = 'math' | 'danish' | 'icelandic' | 'english';
export type Level = 1 | 2 | 3;

export const SUBJECT_IDS: SubjectId[] = ['math', 'danish', 'icelandic', 'english'];

export interface KidProfile {
  id: string;
  name: string;
  avatar: string; // emoji
  color: string; // CSS color used as the kid's accent
  difficulty: Record<SubjectId, Level>;
  createdAt: string; // ISO 8601
}

export interface LedgerEntry {
  id: string;
  kidId: string;
  type: 'earned' | 'spent' | 'refund' | 'adjustment';
  /** Signed delta applied to the balance: earned/refund positive, spent negative. */
  amount: number;
  reason: string;
  refId?: string; // SessionRecord.id or Redemption.id
  timestamp: string; // ISO 8601
}

export interface SessionRecord {
  id: string;
  kidId: string;
  subject: SubjectId;
  taskType: string; // 'addsub' | 'tables' | ... | 'reading' | 'vocab-mc' | 'vocab-match'
  taskLabel: string; // Icelandic label shown in activity lists
  contentId?: string; // ReadingText.id, used to avoid repeating texts
  level: Level;
  total: number;
  correct: number;
  pointsEarned: number;
  durationSec: number;
  completedAt: string; // ISO 8601
}

export interface Reward {
  id: string;
  name: string;
  cost: number;
  icon: string; // emoji
  active: boolean;
}

export interface Redemption {
  id: string;
  kidId: string;
  /** Snapshots — the reward may be edited or deleted later. */
  rewardName: string;
  cost: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  resolvedAt?: string;
}

export interface StreakState {
  current: number;
  longest: number;
  lastActiveDay: string; // 'YYYY-MM-DD' local, '' if never active
}

export interface ParentSettings {
  pinHash: string | null;
  pinSalt: string;
  recoveryCodeHash: string | null;
}

/** Outcome of the most recent session, read by the results screen. */
export interface SessionOutcome {
  recordId: string;
  newBadges: string[];
  streakBonus: number;
}

export interface AppState {
  schemaVersion: number;
  profiles: KidProfile[];
  ledger: LedgerEntry[];
  sessions: SessionRecord[];
  rewards: Reward[];
  redemptions: Redemption[];
  streaks: Record<string, StreakState>; // kidId -> streak
  badges: Record<string, string[]>; // kidId -> earned badge ids
  parent: ParentSettings;
  lastOutcome: SessionOutcome | null;
}

export const CURRENT_SCHEMA_VERSION = 1;

export function createInitialState(): AppState {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    profiles: [],
    ledger: [],
    sessions: [],
    rewards: [],
    redemptions: [],
    streaks: {},
    badges: {},
    parent: { pinHash: null, pinSalt: '', recoveryCodeHash: null },
    lastOutcome: null,
  };
}
