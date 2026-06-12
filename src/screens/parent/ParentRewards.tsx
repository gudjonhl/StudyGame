import { useState } from 'react';
import { useStore } from '../../storage/store';
import type { Reward } from '../../storage/schema';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { STR } from '../../i18n/strings';
import { formatNum } from '../../utils';

const ICONS = ['🎁', '🎮', '🎬', '🍦', '🍕', '⚽', '🏊', '🎢', '📚', '🛍️', '🎵', '🧸'];

export function ParentRewards() {
  const { state, dispatch } = useStore();
  const t = STR.parent.rewardsTab;
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [icon, setIcon] = useState(ICONS[0]);
  const [editing, setEditing] = useState<Reward | null>(null);
  const [deleting, setDeleting] = useState<Reward | null>(null);

  const costNum = Number(cost);
  const canAdd = name.trim().length > 0 && Number.isFinite(costNum) && costNum > 0;

  function add() {
    if (!canAdd) return;
    dispatch({ type: 'ADD_REWARD', name: name.trim(), cost: Math.round(costNum), icon });
    setName('');
    setCost('');
  }

  function saveEdit() {
    if (!editing || editing.name.trim().length === 0 || editing.cost <= 0) return;
    dispatch({ type: 'UPDATE_REWARD', reward: { ...editing, name: editing.name.trim() } });
    setEditing(null);
  }

  return (
    <div className="stack">
      <div className="card stack">
        <strong>{t.addTitle}</strong>
        <label className="field">
          {t.name}
          <input type="text" value={name} placeholder={t.namePlaceholder} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="field">
          {t.cost}
          <input type="number" min={1} value={cost} onChange={(e) => setCost(e.target.value)} />
        </label>
        <div className="field">
          {t.icon}
          <div className="avatar-row">
            {ICONS.map((ic) => (
              <button key={ic} type="button" className={`avatar-pick${icon === ic ? ' selected' : ''}`} onClick={() => setIcon(ic)}>
                {ic}
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="btn btn-primary" disabled={!canAdd} onClick={add}>
          + {STR.common.add}
        </button>
      </div>

      {state.rewards.length === 0 && <p className="muted">{t.empty}</p>}

      {state.rewards.map((reward) =>
        editing && editing.id === reward.id ? (
          <div key={reward.id} className="card stack">
            <label className="field">
              {t.name}
              <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </label>
            <label className="field">
              {t.cost}
              <input type="number" min={1} value={editing.cost} onChange={(e) => setEditing({ ...editing, cost: Number(e.target.value) })} />
            </label>
            <div className="row">
              <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setEditing(null)}>
                {STR.common.cancel}
              </button>
              <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={saveEdit}>
                {STR.common.save}
              </button>
            </div>
          </div>
        ) : (
          <div key={reward.id} className="reward-item" style={reward.active ? undefined : { opacity: 0.55 }}>
            <span className="reward-icon">{reward.icon}</span>
            <div className="reward-info">
              <div className="reward-name">{reward.name}</div>
              <div className="reward-cost">
                ⭐ {formatNum(reward.cost)} {STR.common.points} · {reward.active ? t.active : t.inactive}
              </div>
            </div>
            <label className="row small" style={{ fontWeight: 600, gap: 6 }}>
              <input
                type="checkbox"
                style={{ width: 22, height: 22, minHeight: 0 }}
                checked={reward.active}
                onChange={(e) => dispatch({ type: 'UPDATE_REWARD', reward: { ...reward, active: e.target.checked } })}
              />
              {t.active}
            </label>
            <button type="button" className="link-btn" onClick={() => setEditing(reward)}>
              {STR.common.edit}
            </button>
            <button type="button" className="link-btn" style={{ color: 'var(--red)' }} onClick={() => setDeleting(reward)}>
              {STR.common.delete}
            </button>
          </div>
        ),
      )}

      {deleting && (
        <ConfirmDialog
          title={t.deleteConfirm}
          body={`${deleting.icon} ${deleting.name}`}
          confirmLabel={STR.common.delete}
          cancelLabel={STR.common.cancel}
          danger
          onConfirm={() => {
            dispatch({ type: 'DELETE_REWARD', rewardId: deleting.id });
            setDeleting(null);
          }}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
