interface Props {
  choices: string[];
  /** When set, the answer is revealed and buttons are inert. */
  revealed: { selected: number; correct: number } | null;
  onSelect: (index: number) => void;
}

export function ChoiceButtons({ choices, revealed, onSelect }: Props) {
  return (
    <div className="choices">
      {choices.map((choice, i) => {
        let cls = 'choice-btn';
        if (revealed) {
          if (i === revealed.correct) cls += ' correct';
          else if (i === revealed.selected) cls += ' wrong shake';
          else cls += ' dimmed';
        }
        return (
          <button key={i} type="button" className={cls} disabled={!!revealed} onClick={() => onSelect(i)}>
            {choice}
          </button>
        );
      })}
    </div>
  );
}
