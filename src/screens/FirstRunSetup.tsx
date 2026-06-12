import { useMemo, useState } from 'react';
import { navigate } from '../router';
import { useStore } from '../storage/store';
import type { KidProfile, Level } from '../storage/schema';
import { generateRecoveryCode, hashPin, hashRecoveryCode, randomSalt } from '../storage/pin';
import { NumericKeypad } from '../components/NumericKeypad';
import { STR } from '../i18n/strings';
import { uid } from '../utils';

const AVATARS = ['🦊', '🐼', '🦄', '🐯', '🐸', '🦁', '🐧', '🐰', '🐲', '🦋', '🐢', '🐙'];
const COLORS = ['#4f7bf7', '#e8505b', '#2eb872', '#8b5cf6', '#f5a623', '#0ea5b7'];

interface DraftKid {
  name: string;
  avatar: string;
  preset: Level;
}

type Step = 'welcome' | 'kids' | 'pin' | 'pin2' | 'recovery';

export function FirstRunSetup() {
  const { dispatch } = useStore();
  const [step, setStep] = useState<Step>('welcome');
  const [kids, setKids] = useState<DraftKid[]>([
    { name: '', avatar: AVATARS[0], preset: 2 },
    { name: '', avatar: AVATARS[1], preset: 2 },
  ]);
  const [pin, setPin] = useState('');
  const [pinEntry, setPinEntry] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [codeWritten, setCodeWritten] = useState(false);
  const recoveryCode = useMemo(() => generateRecoveryCode(), []);
  const salt = useMemo(() => randomSalt(), []);

  function updateKid(i: number, patch: Partial<DraftKid>) {
    setKids(kids.map((k, idx) => (idx === i ? { ...k, ...patch } : k)));
  }

  const validKids = kids.filter((k) => k.name.trim().length > 0);

  function submitPin() {
    if (step === 'pin') {
      if (pinEntry.length < 4 || pinEntry.length > 6) {
        setPinError(STR.setup.pinTooShort);
        return;
      }
      setPin(pinEntry);
      setPinEntry('');
      setPinError(null);
      setStep('pin2');
    } else {
      if (pinEntry !== pin) {
        setPinError(STR.setup.pinMismatch);
        setPin('');
        setPinEntry('');
        setStep('pin');
        return;
      }
      setPinError(null);
      setStep('recovery');
    }
  }

  function finish() {
    const profiles: KidProfile[] = validKids.map((k, i) => ({
      id: uid(),
      name: k.name.trim(),
      avatar: k.avatar,
      color: COLORS[i % COLORS.length],
      // Danish always starts at the easiest level — it's a new language.
      difficulty: { math: k.preset, danish: 1, icelandic: k.preset, english: k.preset },
      createdAt: new Date().toISOString(),
    }));
    dispatch({
      type: 'SETUP',
      profiles,
      pinHash: hashPin(pin, salt),
      pinSalt: salt,
      recoveryCodeHash: hashRecoveryCode(recoveryCode),
    });
    navigate('/');
  }

  return (
    <div className="container">
      {step === 'welcome' && (
        <div className="setup-step stack" style={{ textAlign: 'center', paddingTop: 48 }}>
          <div style={{ fontSize: 64 }}>⭐</div>
          <h1 className="app-title">{STR.setup.welcomeTitle}</h1>
          <p className="muted">{STR.setup.welcomeBody}</p>
          <button type="button" className="btn btn-primary btn-block" onClick={() => setStep('kids')}>
            {STR.common.start}
          </button>
        </div>
      )}

      {step === 'kids' && (
        <div className="setup-step stack">
          <h1 className="screen-title">{STR.setup.setupKids}</h1>
          {kids.map((kid, i) => (
            <div key={i} className="card stack">
              <label className="field">
                {STR.setup.kidName}
                <input
                  type="text"
                  value={kid.name}
                  placeholder={STR.setup.kidNamePlaceholder}
                  onChange={(e) => updateKid(i, { name: e.target.value })}
                />
              </label>
              <div className="field">
                {STR.setup.chooseAvatar}
                <div className="avatar-row">
                  {AVATARS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      className={`avatar-pick${kid.avatar === a ? ' selected' : ''}`}
                      onClick={() => updateKid(i, { avatar: a })}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                {STR.setup.difficultyPreset}
                <div className="level-seg">
                  {([1, 2, 3] as Level[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      className={kid.preset === lvl ? 'selected' : ''}
                      onClick={() => updateKid(i, { preset: lvl })}
                    >
                      {lvl} · {STR.levels[lvl]}
                    </button>
                  ))}
                </div>
              </div>
              {kids.length > 1 && (
                <button type="button" className="link-btn" onClick={() => setKids(kids.filter((_, idx) => idx !== i))}>
                  {STR.setup.removeKid}
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-ghost btn-block"
            onClick={() => setKids([...kids, { name: '', avatar: AVATARS[kids.length % AVATARS.length], preset: 2 }])}
          >
            + {STR.setup.addKid}
          </button>
          <p className="muted small">{STR.setup.difficultyHint}</p>
          <button type="button" className="btn btn-primary btn-block" disabled={validKids.length === 0} onClick={() => setStep('pin')}>
            {STR.common.next}
          </button>
        </div>
      )}

      {(step === 'pin' || step === 'pin2') && (
        <div className="setup-step stack">
          <h1 className="screen-title">{step === 'pin' ? STR.setup.setPinTitle : STR.setup.confirmPin}</h1>
          {step === 'pin' && <p className="muted">{STR.setup.setPinBody}</p>}
          {pinError && <p style={{ color: 'var(--red)', fontWeight: 700 }}>{pinError}</p>}
          <NumericKeypad value={pinEntry} onChange={setPinEntry} onSubmit={submitPin} masked submitLabel={STR.common.next} />
        </div>
      )}

      {step === 'recovery' && (
        <div className="setup-step stack">
          <h1 className="screen-title">{STR.setup.recoveryTitle}</h1>
          <p className="muted">{STR.setup.recoveryBody}</p>
          <div className="recovery-code">{recoveryCode}</div>
          <label className="row" style={{ fontWeight: 600 }}>
            <input type="checkbox" style={{ width: 24, height: 24, minHeight: 0 }} checked={codeWritten} onChange={(e) => setCodeWritten(e.target.checked)} />
            {STR.setup.recoveryConfirm}
          </label>
          <button type="button" className="btn btn-success btn-block" disabled={!codeWritten} onClick={finish}>
            {STR.setup.finish}
          </button>
        </div>
      )}
    </div>
  );
}
