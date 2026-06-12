import { useState } from 'react';
import { navigate } from '../router';
import { useStore } from '../storage/store';
import type { KidProfile, Reward } from '../storage/schema';
import { getBalance } from '../engine/points';
import { PointsBadge } from '../components/PointsBadge';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { STR } from '../i18n/strings';
import { formatNum, shortDate } from '../utils';

export function RewardsScreen({ kid }: { kid: KidProfile }) {
  const { state, dispatch } = useStore();
  const [confirmReward, setConfirmReward] = useState<Reward | null>(null);
  const balance = getBalance(state.ledger, kid.id);
  const rewards = state.rewards.filter((r) => r.active).sort((a, b) => a.cost - b.cost);
  const pending = state.redemptions.filter((r) => r.kidId === kid.id && r.status === 'pending');
  const approved = state.redemptions
    .filter((r) => r.kidId === kid.id && r.status === 'approved')
    .slice(-3)
    .reverse();

  function request(reward: Reward) {
    dispatch({ type: 'REQUEST_REDEMPTION', kidId: kid.id, rewardId: reward.id, now: new Date().toISOString() });
    setConfirmReward(null);
  }

  return (
    <div className="container stack">
      <header className="screen-header">
        <button type="button" className="back-btn" onClick={() => navigate(`/kid/${kid.id}`)} aria-label={STR.common.back}>
          ←
        </button>
        <h1 className="screen-title">🎁 {STR.rewards.title}</h1>
      </header>

      <div className="spread">
        <span className="muted">{STR.rewards.yourPoints}:</span>
        <PointsBadge points={balance} />
      </div>

      {pending.length > 0 && (
        <div className="card stack">
          <strong>⏳ {STR.rewards.pending}</strong>
          {pending.map((r) => (
            <div key={r.id} className="activity-item">
              <span>
                {r.rewardName} <span className="muted">· {shortDate(r.requestedAt)}</span>
              </span>
              <span className="activity-amount minus">−{formatNum(r.cost)}</span>
            </div>
          ))}
        </div>
      )}

      {rewards.length === 0 ? (
        <p className="muted">{STR.rewards.empty}</p>
      ) : (
        rewards.map((reward) => {
          const affordable = balance >= reward.cost;
          return (
            <div key={reward.id} className="reward-item">
              <span className="reward-icon">{reward.icon}</span>
              <div className="reward-info">
                <div className="reward-name">{reward.name}</div>
                <div className="reward-cost">⭐ {formatNum(reward.cost)} {STR.common.points}</div>
              </div>
              <button
                type="button"
                className="btn btn-success"
                disabled={!affordable}
                title={affordable ? undefined : STR.rewards.notEnough(reward.cost - balance)}
                onClick={() => setConfirmReward(reward)}
              >
                {STR.rewards.request}
              </button>
            </div>
          );
        })
      )}

      {approved.length > 0 && (
        <div className="card stack">
          <strong>✅ {STR.rewards.approvedRecently}</strong>
          {approved.map((r) => (
            <div key={r.id} className="activity-item">
              <span>
                {r.rewardName} <span className="muted">· {r.resolvedAt ? shortDate(r.resolvedAt) : ''}</span>
              </span>
            </div>
          ))}
        </div>
      )}

      {confirmReward && (
        <ConfirmDialog
          title={STR.rewards.confirmTitle}
          body={STR.rewards.confirmBody(confirmReward.name, confirmReward.cost)}
          confirmLabel={STR.common.confirm}
          cancelLabel={STR.common.cancel}
          onConfirm={() => request(confirmReward)}
          onCancel={() => setConfirmReward(null)}
        />
      )}
    </div>
  );
}
