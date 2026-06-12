import { useStore } from '../../storage/store';
import { STR } from '../../i18n/strings';
import { formatNum, shortDate } from '../../utils';

export function ParentRedemptions() {
  const { state, dispatch } = useStore();
  const t = STR.parent.redemptionsTab;
  const pending = state.redemptions.filter((r) => r.status === 'pending');
  const resolved = state.redemptions.filter((r) => r.status !== 'pending').slice(-10).reverse();

  function kidName(kidId: string): string {
    const kid = state.profiles.find((p) => p.id === kidId);
    return kid ? `${kid.avatar} ${kid.name}` : '—';
  }

  function resolve(id: string, approved: boolean) {
    dispatch({ type: 'RESOLVE_REDEMPTION', redemptionId: id, approved, now: new Date().toISOString() });
  }

  return (
    <div className="stack">
      <div className="card">
        <strong>{t.pendingTitle}</strong>
        {pending.length === 0 ? (
          <p className="muted small" style={{ marginTop: 8 }}>
            {t.empty}
          </p>
        ) : (
          <>
            <p className="muted small" style={{ marginTop: 4 }}>
              {t.rejectNote}
            </p>
            {pending.map((r) => (
              <div key={r.id} className="redemption-item">
                <span style={{ fontWeight: 700 }}>{kidName(r.kidId)}</span>
                <span style={{ flex: 1 }}>
                  {r.rewardName} · ⭐ {formatNum(r.cost)} <span className="muted">· {shortDate(r.requestedAt)}</span>
                </span>
                <div className="row">
                  <button type="button" className="btn btn-success" onClick={() => resolve(r.id, true)}>
                    ✓ {t.approve}
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => resolve(r.id, false)}>
                    ✕ {t.reject}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {resolved.length > 0 && (
        <div className="card">
          <strong>{t.historyTitle}</strong>
          {resolved.map((r) => (
            <div key={r.id} className="redemption-item">
              <span>{kidName(r.kidId)}</span>
              <span style={{ flex: 1 }}>
                {r.rewardName} · ⭐ {formatNum(r.cost)}
                <span className="muted"> · {r.resolvedAt ? shortDate(r.resolvedAt) : ''}</span>
              </span>
              <span className={`status-chip ${r.status}`}>{r.status === 'approved' ? t.approved : t.rejected}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
