import { describe, expect, it } from 'vitest';
import { reducer } from './store';
import { createInitialState, type AppState, type KidProfile } from './schema';
import { getBalance } from '../engine/points';

const NOW = '2026-06-12T10:00:00.000Z';

function kid(id: string): KidProfile {
  return {
    id,
    name: 'Anna',
    avatar: '🦊',
    color: '#fff',
    difficulty: { math: 2, danish: 1, icelandic: 2, english: 2 },
    createdAt: NOW,
  };
}

function setupState(): AppState {
  return reducer(createInitialState(), {
    type: 'SETUP',
    profiles: [kid('kid1')],
    pinHash: 'hash',
    pinSalt: 'salt',
    recoveryCodeHash: 'rec',
  });
}

function withPoints(state: AppState, amount: number): AppState {
  return {
    ...state,
    ledger: [
      ...state.ledger,
      { id: 'seed', kidId: 'kid1', type: 'earned' as const, amount, reason: 'seed', timestamp: NOW },
    ],
  };
}

describe('reducer', () => {
  it('SETUP stores profiles, PIN and seeds example rewards', () => {
    const s = setupState();
    expect(s.profiles.length).toBe(1);
    expect(s.parent.pinHash).toBe('hash');
    expect(s.rewards.length).toBeGreaterThan(0);
  });

  it('REQUEST_REDEMPTION deducts points and creates a pending request', () => {
    let s = withPoints(setupState(), 1000);
    const reward = s.rewards[0];
    s = reducer(s, { type: 'REQUEST_REDEMPTION', kidId: 'kid1', rewardId: reward.id, now: NOW });
    expect(s.redemptions.length).toBe(1);
    expect(s.redemptions[0].status).toBe('pending');
    expect(getBalance(s.ledger, 'kid1')).toBe(1000 - reward.cost);
  });

  it('REQUEST_REDEMPTION is rejected when the balance is too low', () => {
    let s = withPoints(setupState(), 10);
    s = reducer(s, { type: 'REQUEST_REDEMPTION', kidId: 'kid1', rewardId: s.rewards[0].id, now: NOW });
    expect(s.redemptions.length).toBe(0);
    expect(getBalance(s.ledger, 'kid1')).toBe(10);
  });

  it('rejecting a redemption refunds the points', () => {
    let s = withPoints(setupState(), 1000);
    const cost = s.rewards[0].cost;
    s = reducer(s, { type: 'REQUEST_REDEMPTION', kidId: 'kid1', rewardId: s.rewards[0].id, now: NOW });
    s = reducer(s, { type: 'RESOLVE_REDEMPTION', redemptionId: s.redemptions[0].id, approved: false, now: NOW });
    expect(s.redemptions[0].status).toBe('rejected');
    expect(getBalance(s.ledger, 'kid1')).toBe(1000);
    expect(s.ledger.some((e) => e.type === 'refund' && e.amount === cost)).toBe(true);
  });

  it('approving a redemption keeps the deduction and grants the reward badge', () => {
    let s = withPoints(setupState(), 1000);
    const cost = s.rewards[0].cost;
    s = reducer(s, { type: 'REQUEST_REDEMPTION', kidId: 'kid1', rewardId: s.rewards[0].id, now: NOW });
    s = reducer(s, { type: 'RESOLVE_REDEMPTION', redemptionId: s.redemptions[0].id, approved: true, now: NOW });
    expect(s.redemptions[0].status).toBe('approved');
    expect(getBalance(s.ledger, 'kid1')).toBe(1000 - cost);
    expect(s.badges['kid1']).toContain('first-reward');
  });

  it('a resolved redemption cannot be resolved again', () => {
    let s = withPoints(setupState(), 1000);
    s = reducer(s, { type: 'REQUEST_REDEMPTION', kidId: 'kid1', rewardId: s.rewards[0].id, now: NOW });
    s = reducer(s, { type: 'RESOLVE_REDEMPTION', redemptionId: s.redemptions[0].id, approved: false, now: NOW });
    const after = reducer(s, { type: 'RESOLVE_REDEMPTION', redemptionId: s.redemptions[0].id, approved: false, now: NOW });
    expect(after).toBe(s);
  });

  it('ADJUST_POINTS adds signed adjustments and ignores zero', () => {
    let s = setupState();
    s = reducer(s, { type: 'ADJUST_POINTS', kidId: 'kid1', amount: 50, reason: 'dugnaður', now: NOW });
    s = reducer(s, { type: 'ADJUST_POINTS', kidId: 'kid1', amount: -20, reason: 'leiðrétting', now: NOW });
    s = reducer(s, { type: 'ADJUST_POINTS', kidId: 'kid1', amount: 0, reason: 'ekkert', now: NOW });
    expect(getBalance(s.ledger, 'kid1')).toBe(30);
    expect(s.ledger.length).toBe(2);
  });

  it('SET_DIFFICULTY updates only the chosen subject', () => {
    let s = setupState();
    s = reducer(s, { type: 'SET_DIFFICULTY', kidId: 'kid1', subject: 'danish', level: 3 });
    expect(s.profiles[0].difficulty.danish).toBe(3);
    expect(s.profiles[0].difficulty.math).toBe(2);
  });

  it('RESET_ALL returns to the initial state', () => {
    const s = reducer(withPoints(setupState(), 500), { type: 'RESET_ALL' });
    expect(s.profiles.length).toBe(0);
    expect(s.ledger.length).toBe(0);
    expect(s.parent.pinHash).toBeNull();
  });
});
