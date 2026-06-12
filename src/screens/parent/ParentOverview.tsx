import { useStore } from '../../storage/store';
import { effectiveStreak, getBalance, getTotalEarned } from '../../engine/points';
import { SUBJECTS } from '../../subjects';
import { STR } from '../../i18n/strings';
import { addDays, formatNum, shortDate, todayLocal } from '../../utils';

const WEEKDAY_INITIALS = ['Su', 'Má', 'Þr', 'Mi', 'Fi', 'Fö', 'La'];

export function ParentOverview() {
  const { state } = useStore();
  const today = todayLocal();
  const t = STR.parent.overview;

  if (state.profiles.length === 0) return <p className="muted">{t.noData}</p>;

  return (
    <div className="parent-grid stack">
      {state.profiles.map((kid) => {
        const sessions = state.sessions.filter((s) => s.kidId === kid.id);
        const ledger = state.ledger.filter((e) => e.kidId === kid.id);
        const streak = state.streaks[kid.id];

        const days = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
        const earnedPerDay = days.map((day) =>
          ledger.reduce((sum, e) => (e.amount > 0 && todayLocal(new Date(e.timestamp)) === day ? sum + e.amount : sum), 0),
        );
        const maxDay = Math.max(...earnedPerDay, 1);

        return (
          <div key={kid.id} className="card stack" style={{ marginBottom: 16 }}>
            <div className="kid-identity">
              <span className="avatar">{kid.avatar}</span>
              {kid.name}
            </div>

            <div className="stat-grid">
              <div className="stat-box">
                <div className="stat-value">⭐ {formatNum(getBalance(state.ledger, kid.id))}</div>
                <div className="stat-label">{t.balance}</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{formatNum(getTotalEarned(state.ledger, kid.id))}</div>
                <div className="stat-label">{t.totalEarned}</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">🔥 {effectiveStreak(streak, today)}</div>
                <div className="stat-label">{t.streak}</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{streak?.longest ?? 0}</div>
                <div className="stat-label">{t.longestStreak}</div>
              </div>
            </div>

            <div>
              <strong className="small">{t.last7days}</strong>
              <div className="chart-7d">
                {days.map((day, i) => (
                  <div key={day} className="chart-col" title={`${day}: ${earnedPerDay[i]} ${STR.common.points}`}>
                    {earnedPerDay[i] > 0 && <span className="chart-label">{earnedPerDay[i]}</span>}
                    <div className="chart-bar" style={{ height: `${(earnedPerDay[i] / maxDay) * 100}%`, background: kid.color }} />
                    <span className="chart-label">{WEEKDAY_INITIALS[new Date(`${day}T12:00:00`).getDay()]}</span>
                  </div>
                ))}
              </div>
            </div>

            <table className="subject-stats-table">
              <thead>
                <tr>
                  <th />
                  <th>{t.sessions}</th>
                  <th>{t.accuracy}</th>
                  <th>{t.pointsEarned}</th>
                </tr>
              </thead>
              <tbody>
                {SUBJECTS.map((s) => {
                  const subjectSessions = sessions.filter((x) => x.subject === s.id);
                  const total = subjectSessions.reduce((sum, x) => sum + x.total, 0);
                  const correct = subjectSessions.reduce((sum, x) => sum + x.correct, 0);
                  const points = subjectSessions.reduce((sum, x) => sum + x.pointsEarned, 0);
                  return (
                    <tr key={s.id}>
                      <td>
                        <span className="subject-dot" style={{ background: s.color }} />
                        {s.label}
                      </td>
                      <td>{subjectSessions.length}</td>
                      <td>{total > 0 ? `${Math.round((correct / total) * 100)}%` : '—'}</td>
                      <td>{formatNum(points)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div>
              <strong className="small">{t.recentLedger}</strong>
              {ledger.length === 0 ? (
                <p className="muted small">{t.noData}</p>
              ) : (
                ledger
                  .slice(-6)
                  .reverse()
                  .map((e) => (
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
      })}
    </div>
  );
}
