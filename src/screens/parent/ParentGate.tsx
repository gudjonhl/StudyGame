import { useState } from 'react';
import { useStore } from '../../storage/store';
import { hashPin, hashRecoveryCode, randomSalt } from '../../storage/pin';
import { NumericKeypad } from '../../components/NumericKeypad';
import { Redirect } from '../../components/Redirect';
import { navigate } from '../../router';
import { STR } from '../../i18n/strings';
import { ParentLayout } from './ParentLayout';

type Mode = 'pin' | 'recovery' | 'newpin' | 'newpin2';

export function ParentGate({ tab }: { tab: string }) {
  const { state, dispatch } = useStore();
  const [unlocked, setUnlocked] = useState(false);
  const [mode, setMode] = useState<Mode>('pin');
  const [value, setValue] = useState('');
  const [newPin, setNewPin] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (state.profiles.length === 0 || !state.parent.pinHash) return <Redirect to="/" />;
  if (unlocked) return <ParentLayout tab={tab} />;

  function submit() {
    setError(null);
    if (mode === 'pin') {
      if (hashPin(value, state.parent.pinSalt) === state.parent.pinHash) {
        setUnlocked(true);
      } else {
        setError(STR.parent.wrongPin);
        setValue('');
      }
    } else if (mode === 'recovery') {
      if (state.parent.recoveryCodeHash && hashRecoveryCode(value) === state.parent.recoveryCodeHash) {
        setValue('');
        setMode('newpin');
      } else {
        setError(STR.parent.wrongRecovery);
        setValue('');
      }
    } else if (mode === 'newpin') {
      if (value.length < 4 || value.length > 6) {
        setError(STR.setup.pinTooShort);
        return;
      }
      setNewPin(value);
      setValue('');
      setMode('newpin2');
    } else {
      if (value !== newPin) {
        setError(STR.setup.pinMismatch);
        setValue('');
        setNewPin('');
        setMode('newpin');
        return;
      }
      const salt = randomSalt();
      dispatch({ type: 'CHANGE_PIN', pinHash: hashPin(value, salt), pinSalt: salt });
      setUnlocked(true);
    }
  }

  const titles: Record<Mode, string> = {
    pin: STR.parent.enterPin,
    recovery: STR.parent.enterRecovery,
    newpin: STR.parent.newPin,
    newpin2: STR.setup.confirmPin,
  };

  return (
    <div className="container stack" style={{ maxWidth: 420, paddingTop: 40 }}>
      <header className="screen-header">
        <button type="button" className="back-btn" onClick={() => navigate('/')} aria-label={STR.common.back}>
          ←
        </button>
        <h1 className="screen-title">🔒 {STR.parent.area}</h1>
      </header>
      <p style={{ fontWeight: 700 }}>{titles[mode]}</p>
      {error && <p style={{ color: 'var(--red)', fontWeight: 700 }}>{error}</p>}
      <NumericKeypad value={value} onChange={setValue} onSubmit={submit} masked submitLabel={STR.common.confirm} />
      {mode === 'pin' && (
        <button type="button" className="link-btn" onClick={() => { setMode('recovery'); setValue(''); setError(null); }}>
          {STR.parent.forgotPin}
        </button>
      )}
    </div>
  );
}
