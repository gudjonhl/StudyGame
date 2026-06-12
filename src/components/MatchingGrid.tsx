import { useMemo, useRef, useState } from 'react';
import { shuffle } from '../engine/random';

interface Props {
  pairs: { left: string; right: string }[];
  /** Called once when every pair is matched; receives the mismatch count. */
  onComplete: (mismatches: number) => void;
}

export function MatchingGrid({ pairs, onComplete }: Props) {
  const [leftOrder] = useState(() => shuffle(pairs.map((p) => p.left)));
  const [rightOrder] = useState(() => shuffle(pairs.map((p) => p.right)));
  const map = useMemo(() => new Map(pairs.map((p) => [p.left, p.right])), [pairs]);

  const [matched, setMatched] = useState<ReadonlySet<string>>(new Set());
  const [selLeft, setSelLeft] = useState<string | null>(null);
  const [selRight, setSelRight] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const mismatches = useRef(0);
  const done = useRef(false);

  function select(side: 'left' | 'right', value: string) {
    if (shaking || done.current) return;
    const left = side === 'left' ? value : selLeft;
    const right = side === 'right' ? value : selRight;
    if (side === 'left') setSelLeft(value);
    else setSelRight(value);
    if (!left || !right) return;

    if (map.get(left) === right) {
      const next = new Set(matched);
      next.add(left);
      setMatched(next);
      setSelLeft(null);
      setSelRight(null);
      if (next.size === pairs.length && !done.current) {
        done.current = true;
        setTimeout(() => onComplete(mismatches.current), 500);
      }
    } else {
      mismatches.current += 1;
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setSelLeft(null);
        setSelRight(null);
      }, 450);
    }
  }

  function cls(side: 'left' | 'right', value: string): string {
    const isMatched = side === 'left' ? matched.has(value) : [...matched].some((l) => map.get(l) === value);
    const isSelected = side === 'left' ? selLeft === value : selRight === value;
    let c = 'match-card';
    if (isMatched) c += ' matched';
    else if (isSelected) c += shaking ? ' selected shake' : ' selected';
    return c;
  }

  function isDisabled(side: 'left' | 'right', value: string): boolean {
    return side === 'left' ? matched.has(value) : [...matched].some((l) => map.get(l) === value);
  }

  return (
    <div className="match-grid">
      <div className="match-col">
        {leftOrder.map((v) => (
          <button key={v} type="button" className={cls('left', v)} disabled={isDisabled('left', v)} onClick={() => select('left', v)}>
            {v}
          </button>
        ))}
      </div>
      <div className="match-col">
        {rightOrder.map((v) => (
          <button key={v} type="button" className={cls('right', v)} disabled={isDisabled('right', v)} onClick={() => select('right', v)}>
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
