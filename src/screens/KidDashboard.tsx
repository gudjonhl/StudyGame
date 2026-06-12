import type { CSSProperties } from 'react';
import { navigate } from '../router';
import { useStore } from '../storage/store';
import type { KidProfile } from '../storage/schema';
import { effectiveStreak, getBalance, getLevelInfo, getTotalEarned, POINTS } from '../engine/points';
import { getBadge } from '../content/badges';
import { PointsBadge } from '../components/PointsBadge';
import { StreakFlame } from '../components/StreakFlame';
import { SUBJECTS } from '../subjects';
import { STR } from '../i18n/strings';
import { formatNum, shortDate, todayLocal } from '../utils';

export function KidDashboard({ kid }: { kid: KidProfile }) {
  const { state } = useStore();
  const balance = getBalance(state.ledger, kid.id);
  const totalEarned = getTotalEarned(state.ledger, kid.id);
  const levelInfo = getLevelInfo(totalEarned);
  const streakDays = effectiveStreak(state.streaks[kid.id], todayLocal());
  const recent = state.ledger.filter((e) => e.kidId === kid.id).slice(-5).reverse();
  const earnedBadges = (state.badges[kid.id] ?? []).map(getBadge).filter((b) => b !== undefined);
  const pendingCount = state.redemptions.filter((r) => r.kidId === kid.id && r.status === 'pending').length;

  return (
    <div className="container stack">
      <header className="kid-header">
        <div className="kid-identity">
          <span className="avatar">{kid.avatar}</span>
          {kid.name}
        </div>
        <button type="button" className="link-btn" onClick={() => navigate('/')}>
          {STR.profile.switchUser}
        </button>
      </header>

      <div className="card stack">
        <div className="stats-row">
          <PointsBadge points={balance} big />
          <StreakFlame days={streakDays} />
        </div>
        <div>
          <div className="spread small" style={{ marginBottom: 4 }}>
            <strong>
              {STR.common.level} {levelInfo.level}
            </strong>
            <span className="muted">{STR.dashboard.levelProgress(levelInfo.toNext)}</span>
          </div>
          <div className="level-bar">
            <div className="level-bar-fill" style={{ width: `${(levelInfo.intoLevel / POINTS.levelStep) * 100}%` }} />
          </div>
        </div>
      </div>

      <h2 className="screen-title">{STR.dashboard.pickTask}</h2>
      <div className="subject-grid">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            type="button"
            className="subject-card"
            style={{ '--accent': s.color } as CSSProperties}
            onClick={() => navigate(`/kid/${kid.id}/subject/${s.id}`)}
          >
            <span className="subject-icon">{s.icon}</span>
            <span className="subject-label">{s.label}</span>
          </button>
        ))}
      </div>

      <button type="button" className="btn btn-block" style={{ background: 'var(--c-gold)' }} onClick={() => navigate(`/kid/${kid.id}/rewards`)}>
        🎁 {STR.dashboard.rewards}
        {pendingCount > 0 && ` (${pendingCount} ⏳)`}
      </button>

      {earnedBadges.length > 0 && (
        <div className="card">
          <h3 style={{ marginBottom: 10 }}>{STR.dashboard.badges}</h3>
          <div className="badge-strip">
            {earnedBadges.map((b) => (
              <span key={b.id} className="badge-chip" title={b.description}>
                <span className="badge-icon">{b.icon}</span>
                {b.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <h3 style={{ marginBottom: 6 }}>{STR.dashboard.recentActivity}</h3>
        {recent.length === 0 ? (
          <p className="muted small">{STR.dashboard.noActivity}</p>
        ) : (
          recent.map((e) => (
            <div key={e.id} className="activity-item">
              <span>
                {e.reason} <span className="muted">· {shortDate(e.timestamp)}</span>
              </span>
              <span className={`activity-amount ${e.amount >= 0 ? 'plus' : 'minus'}`}>
                {e.amount >= 0 ? '+' : '−'}
                {formatNum(Math.abs(e.amount))}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
