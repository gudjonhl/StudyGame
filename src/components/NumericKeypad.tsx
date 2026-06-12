const MAX_DIGITS = 7;

interface Props {
  value: string; // digits, optionally with leading '-'
  onChange: (v: string) => void;
  onSubmit: () => void;
  allowNegative?: boolean;
  masked?: boolean; // for PIN entry
  disabled?: boolean;
  submitLabel?: string;
}

export function NumericKeypad({
  value,
  onChange,
  onSubmit,
  allowNegative = false,
  masked = false,
  disabled = false,
  submitLabel = 'Svara',
}: Props) {
  const digits = value.replace('-', '');

  function pressDigit(d: string) {
    if (disabled || digits.length >= MAX_DIGITS) return;
    onChange(value + d);
  }

  function toggleSign() {
    if (disabled) return;
    onChange(value.startsWith('-') ? value.slice(1) : `-${value}`);
  }

  function backspace() {
    if (disabled) return;
    onChange(value.slice(0, -1));
  }

  const display = masked ? '●'.repeat(digits.length) : value.replace('-', '−');
  const canSubmit = digits.length > 0 && !disabled;

  return (
    <div className="keypad">
      <div className={`keypad-display${masked ? ' masked' : ''}`} aria-live="polite">
        {display || ' '}
      </div>
      <div className="keypad-grid">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
          <button key={d} type="button" className="keypad-key" disabled={disabled} onClick={() => pressDigit(d)}>
            {d}
          </button>
        ))}
        {allowNegative ? (
          <button type="button" className="keypad-key keypad-key-alt" disabled={disabled} onClick={toggleSign}>
            ±
          </button>
        ) : (
          <span />
        )}
        <button type="button" className="keypad-key" disabled={disabled} onClick={() => pressDigit('0')}>
          0
        </button>
        <button type="button" className="keypad-key keypad-key-alt" disabled={disabled} onClick={backspace} aria-label="Eyða staf">
          ⌫
        </button>
      </div>
      <button type="button" className="btn btn-primary btn-block keypad-submit" disabled={!canSubmit} onClick={onSubmit}>
        {submitLabel}
      </button>
    </div>
  );
}
