interface Props {
  total: number;
  current: number; // index of the active question
  results: boolean[]; // correctness of answered questions
}

export function ProgressDots({ total, current, results }: Props) {
  return (
    <div className="progress-dots" aria-label={`Spurning ${Math.min(current + 1, total)} af ${total}`}>
      {Array.from({ length: total }, (_, i) => {
        let cls = 'dot';
        if (i < results.length) cls += results[i] ? ' dot-correct' : ' dot-wrong';
        else if (i === current) cls += ' dot-current';
        return <span key={i} className={cls} />;
      })}
    </div>
  );
}
