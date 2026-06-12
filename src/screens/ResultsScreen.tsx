import { useMemo } from 'react';
import { navigate } from '../router';
import { useStore } from '../storage/store';
import type { KidProfile } from '../storage/schema';
import { getBadge } from '../content/badges';
import { Redirect } from '../components/Redirect';
import { STR } from '../i18n/strings';

const CONFETTI_COLORS = ['#4f7bf7', '#e8505b', '#2eb872', '#8b5cf6', '#f5a623', '#0ea5b7'];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        left: Math.random() * 100,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 0.8,
        duration: 2.2 + Math.random() * 1.6,
      })),
    [],
  );
  return (
    <>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </>
  );
}

export function ResultsScreen({ kid }: { kid: KidProfile }) {
  const { state } = useStore();
  const outcome = state.lastOutcome;
  const record = outcome ? state.sessions.find((s) => s.id === outcome.recordId) : undefined;

  if (!outcome || !record || record.kidId !== kid.id) return <Redirect to={`/kid/${kid.id}`} />;

  const perfect = record.total > 0 && record.correct === record.total;
  const good = record.total > 0 && record.correct / record.total >= 0.7;
  const newBadges = outcome.newBadges.map(getBadge).filter((b) => b !== undefined);

  return (
    <div className="container results-screen">
      {perfect && <Confetti />}
      <div className="results-emoji">{perfect ? '🌟' : good ? '🎉' : '💪'}</div>
      <h1 className="results-title">{perfect ? STR.results.perfect : good ? STR.results.wellDone : STR.results.keepGoing}</h1>
      <p className="muted">{record.taskLabel}</p>
      <div className="card" style={{ width: '100%' }}>
        <p style={{ fontSize: 20, fontWeight: 800 }}>{STR.results.score(record.correct, record.total)}</p>
        <p className="results-points">{STR.results.earned(record.pointsEarned)}</p>
        {outcome.streakBonus > 0 && <p style={{ fontWeight: 700, color: 'var(--c-gold)' }}>{STR.results.streakBonus(outcome.streakBonus)}</p>}
      </div>

      {newBadges.length > 0 && (
        <div className="card stack" style={{ width: '100%' }}>
          <strong>{STR.results.newBadge}</strong>
          <div className="badge-strip" style={{ justifyContent: 'center' }}>
            {newBadges.map((b) => (
              <span key={b.id} className="badge-chip" title={b.description}>
                <span className="badge-icon">{b.icon}</span>
                {b.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="row" style={{ width: '100%' }}>
        <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => navigate(`/kid/${kid.id}`)}>
          🏠 {STR.results.home}
        </button>
        <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigate(`/kid/${kid.id}/subject/${record.subject}`)}>
          🔁 {STR.results.again}
        </button>
      </div>
    </div>
  );
}
