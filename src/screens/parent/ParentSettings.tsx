import { useRef, useState } from 'react';
import { useStore } from '../../storage/store';
import type { Level, SubjectId } from '../../storage/schema';
import { hashPin, randomSalt } from '../../storage/pin';
import { downloadExport, exportToJson, parseImport } from '../../storage/exportImport';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { navigate } from '../../router';
import { SUBJECTS } from '../../subjects';
import { STR } from '../../i18n/strings';

export function ParentSettings() {
  const { state, dispatch } = useStore();
  const t = STR.parent.settingsTab;

  const [adjustKid, setAdjustKid] = useState(state.profiles[0]?.id ?? '');
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustReason, setAdjustReason] = useState('');

  const [showExport, setShowExport] = useState(false);
  const [importText, setImportText] = useState('');
  const [importConfirm, setImportConfirm] = useState(false);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pinMessage, setPinMessage] = useState<string | null>(null);

  const [resetStep, setResetStep] = useState(0);

  function adjust() {
    const amount = Math.round(Number(adjustAmount));
    if (!adjustKid || !Number.isFinite(amount) || amount === 0) return;
    dispatch({ type: 'ADJUST_POINTS', kidId: adjustKid, amount, reason: adjustReason.trim(), now: new Date().toISOString() });
    setAdjustAmount('');
    setAdjustReason('');
  }

  function onImportFile(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImportText(String(reader.result ?? ''));
    reader.readAsText(file);
  }

  function runImport() {
    try {
      const imported = parseImport(importText);
      dispatch({ type: 'IMPORT_STATE', state: imported });
      setImportConfirm(false);
      setImportText('');
      setImportMessage(t.importSuccess);
    } catch {
      setImportConfirm(false);
      setImportMessage(t.importError);
    }
  }

  function changePin() {
    setPinMessage(null);
    if (pin1.length < 4 || pin1.length > 6 || !/^\d+$/.test(pin1)) {
      setPinMessage(STR.setup.pinTooShort);
      return;
    }
    if (pin1 !== pin2) {
      setPinMessage(STR.setup.pinMismatch);
      return;
    }
    const salt = randomSalt();
    dispatch({ type: 'CHANGE_PIN', pinHash: hashPin(pin1, salt), pinSalt: salt });
    setPin1('');
    setPin2('');
    setPinMessage(t.pinChanged);
  }

  return (
    <div className="parent-grid stack">
      <div className="card stack">
        <strong>{t.difficultyTitle}</strong>
        <p className="muted small">{t.difficultyBody}</p>
        {state.profiles.map((kid) => (
          <div key={kid.id}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>
              {kid.avatar} {kid.name}
            </div>
            <div className="stack" style={{ gap: 8 }}>
              {SUBJECTS.map((s) => (
                <label key={s.id} className="spread small" style={{ fontWeight: 600 }}>
                  <span>
                    <span className="subject-dot" style={{ background: s.color }} />
                    {s.label}
                  </span>
                  <select
                    style={{ width: 'auto', minHeight: 40 }}
                    value={kid.difficulty[s.id]}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_DIFFICULTY',
                        kidId: kid.id,
                        subject: s.id as SubjectId,
                        level: Number(e.target.value) as Level,
                      })
                    }
                  >
                    {[1, 2, 3].map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl} · {STR.levels[lvl]}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card stack">
        <strong>{t.adjustTitle}</strong>
        <p className="muted small">{t.adjustBody}</p>
        <select value={adjustKid} onChange={(e) => setAdjustKid(e.target.value)}>
          {state.profiles.map((kid) => (
            <option key={kid.id} value={kid.id}>
              {kid.avatar} {kid.name}
            </option>
          ))}
        </select>
        <label className="field">
          {t.adjustAmount}
          <input type="number" value={adjustAmount} onChange={(e) => setAdjustAmount(e.target.value)} />
        </label>
        <label className="field">
          {t.adjustReason}
          <input type="text" value={adjustReason} placeholder={t.adjustReasonPlaceholder} onChange={(e) => setAdjustReason(e.target.value)} />
        </label>
        <button type="button" className="btn btn-primary" onClick={adjust}>
          {t.adjustSubmit}
        </button>
      </div>

      <div className="card stack">
        <strong>{t.backupTitle}</strong>
        <p className="muted small">{t.backupBody}</p>
        <div className="row">
          <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => downloadExport(state)}>
            ⬇️ {t.exportDownload}
          </button>
          <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowExport(!showExport)}>
            📋 {t.exportCopy}
          </button>
        </div>
        {showExport && <textarea readOnly rows={6} value={exportToJson(state)} onFocus={(e) => e.target.select()} />}
        <strong className="small">{t.importTitle}</strong>
        <p className="muted small">{t.importBody}</p>
        <input ref={fileRef} type="file" accept="application/json,.json" onChange={(e) => onImportFile(e.target.files?.[0])} />
        <textarea rows={4} placeholder={t.importPlaceholder} value={importText} onChange={(e) => setImportText(e.target.value)} />
        <button type="button" className="btn btn-primary" disabled={importText.trim().length === 0} onClick={() => setImportConfirm(true)}>
          {t.importButton}
        </button>
        {importMessage && <p style={{ fontWeight: 700 }}>{importMessage}</p>}
      </div>

      <div className="card stack">
        <strong>{t.pinTitle}</strong>
        <label className="field">
          {STR.parent.newPin}
          <input type="password" inputMode="numeric" value={pin1} onChange={(e) => setPin1(e.target.value)} />
        </label>
        <label className="field">
          {STR.setup.confirmPin}
          <input type="password" inputMode="numeric" value={pin2} onChange={(e) => setPin2(e.target.value)} />
        </label>
        <button type="button" className="btn btn-primary" onClick={changePin}>
          {STR.common.save}
        </button>
        {pinMessage && <p style={{ fontWeight: 700 }}>{pinMessage}</p>}
      </div>

      <div className="card stack danger-zone">
        <strong style={{ color: 'var(--red)' }}>{t.dangerTitle}</strong>
        <button type="button" className="btn btn-danger" onClick={() => setResetStep(1)}>
          {t.resetButton}
        </button>
      </div>

      {importConfirm && (
        <ConfirmDialog
          title={t.importConfirmTitle}
          body={t.importConfirmBody}
          confirmLabel={t.importButton}
          cancelLabel={STR.common.cancel}
          danger
          onConfirm={runImport}
          onCancel={() => setImportConfirm(false)}
        />
      )}

      {resetStep === 1 && (
        <ConfirmDialog
          title={t.resetConfirm1}
          confirmLabel={STR.common.next}
          cancelLabel={STR.common.cancel}
          danger
          onConfirm={() => setResetStep(2)}
          onCancel={() => setResetStep(0)}
        />
      )}
      {resetStep === 2 && (
        <ConfirmDialog
          title={t.resetConfirm2}
          confirmLabel={t.resetButton}
          cancelLabel={STR.common.cancel}
          danger
          onConfirm={() => {
            setResetStep(0);
            dispatch({ type: 'RESET_ALL' });
            navigate('/');
          }}
          onCancel={() => setResetStep(0)}
        />
      )}
    </div>
  );
}
