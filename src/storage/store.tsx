import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react';
import {
  createInitialState,
  type AppState,
  type KidProfile,
  type Level,
  type Redemption,
  type Reward,
  type SessionRecord,
  type SubjectId,
} from './schema';
import { migrate } from './migrations';
import { applySession, checkBadges, getBalance } from '../engine/points';
import { uid } from '../utils';

export const STORAGE_KEY = 'studygame.v1';

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    return migrate(JSON.parse(raw));
  } catch {
    // Corrupt or incompatible data: start fresh rather than crash.
    return createInitialState();
  }
}

function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — nothing sensible to do.
  }
}

export type Action =
  | { type: 'SETUP'; profiles: KidProfile[]; pinHash: string; pinSalt: string; recoveryCodeHash: string }
  | { type: 'COMPLETE_SESSION'; record: SessionRecord; today: string }
  | { type: 'REQUEST_REDEMPTION'; kidId: string; rewardId: string; now: string }
  | { type: 'RESOLVE_REDEMPTION'; redemptionId: string; approved: boolean; now: string }
  | { type: 'ADD_REWARD'; name: string; cost: number; icon: string }
  | { type: 'UPDATE_REWARD'; reward: Reward }
  | { type: 'DELETE_REWARD'; rewardId: string }
  | { type: 'SET_DIFFICULTY'; kidId: string; subject: SubjectId; level: Level }
  | { type: 'ADJUST_POINTS'; kidId: string; amount: number; reason: string; now: string }
  | { type: 'CHANGE_PIN'; pinHash: string; pinSalt: string }
  | { type: 'IMPORT_STATE'; state: AppState }
  | { type: 'RESET_ALL' };

function seedRewards(): Reward[] {
  return [
    { id: uid(), name: '30 mín auka skjátími', cost: 200, icon: '🎮', active: true },
    { id: uid(), name: 'Ís í eftirrétt', cost: 300, icon: '🍦', active: true },
    { id: uid(), name: 'Bíókvöld – þú velur myndina', cost: 500, icon: '🎬', active: true },
  ];
}

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SETUP':
      return {
        ...state,
        profiles: action.profiles,
        rewards: state.rewards.length ? state.rewards : seedRewards(),
        parent: {
          pinHash: action.pinHash,
          pinSalt: action.pinSalt,
          recoveryCodeHash: action.recoveryCodeHash,
        },
      };

    case 'COMPLETE_SESSION':
      return applySession(state, action.record, action.today);

    case 'REQUEST_REDEMPTION': {
      const reward = state.rewards.find((r) => r.id === action.rewardId && r.active);
      if (!reward) return state;
      if (getBalance(state.ledger, action.kidId) < reward.cost) return state;
      const redemption: Redemption = {
        id: uid(),
        kidId: action.kidId,
        rewardName: reward.name,
        cost: reward.cost,
        status: 'pending',
        requestedAt: action.now,
      };
      return {
        ...state,
        redemptions: [...state.redemptions, redemption],
        ledger: [
          ...state.ledger,
          {
            id: uid(),
            kidId: action.kidId,
            type: 'spent',
            amount: -reward.cost,
            reason: `Verðlaun: ${reward.name}`,
            refId: redemption.id,
            timestamp: action.now,
          },
        ],
      };
    }

    case 'RESOLVE_REDEMPTION': {
      const redemption = state.redemptions.find((r) => r.id === action.redemptionId);
      if (!redemption || redemption.status !== 'pending') return state;
      const resolved: Redemption = {
        ...redemption,
        status: action.approved ? 'approved' : 'rejected',
        resolvedAt: action.now,
      };
      let next: AppState = {
        ...state,
        redemptions: state.redemptions.map((r) => (r.id === resolved.id ? resolved : r)),
        ledger: action.approved
          ? state.ledger
          : [
              ...state.ledger,
              {
                id: uid(),
                kidId: redemption.kidId,
                type: 'refund',
                amount: redemption.cost,
                reason: `Endurgreitt: ${redemption.rewardName}`,
                refId: redemption.id,
                timestamp: action.now,
              },
            ],
      };
      if (action.approved) {
        const newBadges = checkBadges(next, redemption.kidId);
        if (newBadges.length > 0) {
          next = {
            ...next,
            badges: {
              ...next.badges,
              [redemption.kidId]: [...(next.badges[redemption.kidId] ?? []), ...newBadges],
            },
          };
        }
      }
      return next;
    }

    case 'ADD_REWARD':
      return {
        ...state,
        rewards: [...state.rewards, { id: uid(), name: action.name, cost: action.cost, icon: action.icon, active: true }],
      };

    case 'UPDATE_REWARD':
      return {
        ...state,
        rewards: state.rewards.map((r) => (r.id === action.reward.id ? action.reward : r)),
      };

    case 'DELETE_REWARD':
      return { ...state, rewards: state.rewards.filter((r) => r.id !== action.rewardId) };

    case 'SET_DIFFICULTY':
      return {
        ...state,
        profiles: state.profiles.map((p) =>
          p.id === action.kidId ? { ...p, difficulty: { ...p.difficulty, [action.subject]: action.level } } : p,
        ),
      };

    case 'ADJUST_POINTS': {
      if (!Number.isFinite(action.amount) || action.amount === 0) return state;
      return {
        ...state,
        ledger: [
          ...state.ledger,
          {
            id: uid(),
            kidId: action.kidId,
            type: 'adjustment',
            amount: Math.round(action.amount),
            reason: action.reason || 'Leiðrétting',
            timestamp: action.now,
          },
        ],
      };
    }

    case 'CHANGE_PIN':
      return { ...state, parent: { ...state.parent, pinHash: action.pinHash, pinSalt: action.pinSalt } };

    case 'IMPORT_STATE':
      return { ...action.state, lastOutcome: null };

    case 'RESET_ALL':
      return createInitialState();
  }
}

interface StoreValue {
  state: AppState;
  dispatch: Dispatch<Action>;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);
  useEffect(() => {
    saveState(state);
  }, [state]);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore verður að vera innan StoreProvider');
  return ctx;
}
