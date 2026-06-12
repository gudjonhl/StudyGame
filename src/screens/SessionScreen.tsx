import { useEffect, useRef, useState } from 'react';
import { navigate } from '../router';
import { useStore } from '../storage/store';
import type { KidProfile, SessionRecord } from '../storage/schema';
import { sessionHolder, type ReadingBody } from '../engine/types';
import { MATCH_ROUND_FLOOR } from '../engine/vocab';
import { NumericKeypad } from '../components/NumericKeypad';
import { ChoiceButtons } from '../components/ChoiceButtons';
import { MatchingGrid } from '../components/MatchingGrid';
import { ProgressDots } from '../components/ProgressDots';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Redirect } from '../components/Redirect';
import { STR } from '../i18n/strings';
import { todayLocal, uid } from '../utils';

interface AnswerEntry {
  correct: boolean;
  points: number;
}

interface Gloss {
  word: string;
  translation: string;
}

function normalizeToken(token: string): string {
  return token.toLowerCase().replace(/[.,!?;:«»„“”"()—]/g, '');
}

function ReadingView({ reading, onGloss }: { reading: ReadingBody; onGloss: (g: Gloss) => void }) {
  const glossMap = new Map((reading.glossary ?? []).map((g) => [normalizeToken(g.word), g]));
  return (
    <div className="reading-card">
      <h2>{reading.title}</h2>
      {reading.body.split('\n\n').map((para, pi) => (
        <p key={pi}>
          {para.split(/(\s+)/).map((token, ti) => {
            const g = glossMap.get(normalizeToken(token));
            if (g) {
              return (
                <button key={ti} type="button" className="glossary-word" onClick={() => onGloss(g)}>
                  {token}
                </button>
              );
            }
            return token;
          })}
        </p>
      ))}
    </div>
  );
}

export function SessionScreen({ kid }: { kid: KidProfile }) {
  const { dispatch } = useStore();
  const cfgRef = useRef(sessionHolder.get());
  const cfg = cfgRef.current;

  const [phase, setPhase] = useState<'reading' | 'questions'>(cfg?.reading ? 'reading' : 'questions');
  const [qIndex, setQIndex] = useState(0);
  const [results, setResults] = useState<AnswerEntry[]>([]);
  const [numValue, setNumValue] = useState('');
  const [feedback, setFeedback] = useState<{ good: boolean; text: string } | null>(null);
  const [revealed, setRevealed] = useState<{ selected: number; correct: number } | null>(null);
  const [showQuit, setShowQuit] = useState(false);
  const [showText, setShowText] = useState(false);
  const [gloss, setGloss] = useState<Gloss | null>(null);
  const startRef = useRef(Date.now());
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  if (!cfg) return <Redirect to={`/kid/${kid.id}`} />;

  const total = cfg.questions.length;
  const question = cfg.questions[Math.min(qIndex, total - 1)];

  const finish = (all: AnswerEntry[]) => {
    const correct = all.filter((r) => r.correct).length;
    let points = all.reduce((sum, r) => sum + r.points, 0);
    if (correct === total && cfg.perfectBonus > 0) points += cfg.perfectBonus;
    const record: SessionRecord = {
      id: uid(),
      kidId: kid.id,
      subject: cfg.subject,
      taskType: cfg.taskType,
      taskLabel: cfg.taskLabel,
      contentId: cfg.contentId,
      level: cfg.level,
      total,
      correct,
      pointsEarned: points,
      durationSec: Math.round((Date.now() - startRef.current) / 1000),
      completedAt: new Date().toISOString(),
    };
    dispatch({ type: 'COMPLETE_SESSION', record, today: todayLocal() });
    sessionHolder.clear();
    navigate(`/kid/${kid.id}/results`);
  };

  const advance = (entry: AnswerEntry) => {
    const next = [...results, entry];
    setFeedback(null);
    setRevealed(null);
    setNumValue('');
    if (next.length >= total) {
      finish(next);
    } else {
      setResults(next);
      setQIndex(next.length);
    }
  };

  const queueAdvance = (entry: AnswerEntry, delayMs: number) => {
    timerRef.current = window.setTimeout(() => advance(entry), delayMs);
  };

  const submitNumeric = () => {
    if (question.kind !== 'numeric' || feedback) return;
    const correct = Number(numValue) === question.answer;
    if (correct) {
      setFeedback({ good: true, text: `${STR.session.correct} 🎉 +${cfg.pointsPerCorrect} ${STR.common.points}` });
    } else {
      setFeedback({ good: false, text: `${STR.session.wrong} ${String(question.answer).replace('-', '−')}` });
    }
    queueAdvance({ correct, points: correct ? cfg.pointsPerCorrect : 0 }, correct ? 1100 : 2000);
  };

  const selectChoice = (i: number) => {
    if (question.kind !== 'choice' || revealed || feedback) return;
    const correct = i === question.correctIndex;
    setRevealed({ selected: i, correct: question.correctIndex });
    if (correct) {
      setFeedback({ good: true, text: `${STR.session.correct} 🎉 +${cfg.pointsPerCorrect} ${STR.common.points}` });
    } else {
      setFeedback({ good: false, text: `${STR.session.wrong} ${question.choices[question.correctIndex]}` });
    }
    queueAdvance({ correct, points: correct ? cfg.pointsPerCorrect : 0 }, correct ? 1100 : 2000);
  };

  const matchComplete = (mismatches: number) => {
    if (feedback) return;
    const points = Math.max(cfg.pointsPerCorrect - mismatches, MATCH_ROUND_FLOOR);
    setFeedback({ good: true, text: `${STR.session.roundDone} +${points} ${STR.common.points}` });
    queueAdvance({ correct: mismatches === 0, points }, 1300);
  };

  const quit = () => {
    sessionHolder.clear();
    navigate(`/kid/${kid.id}`);
  };

  const quitDialog = showQuit && (
    <ConfirmDialog
      title={STR.session.quitTitle}
      body={STR.session.quitBody}
      confirmLabel={STR.session.quitConfirm}
      cancelLabel={STR.session.quitCancel}
      danger
      onConfirm={quit}
      onCancel={() => setShowQuit(false)}
    />
  );

  const glossSheet = gloss && (
    <button type="button" className="glossary-sheet" onClick={() => setGloss(null)}>
      <b>{gloss.word}</b> = {gloss.translation}
    </button>
  );

  if (phase === 'reading' && cfg.reading) {
    return (
      <div className="container">
        <div className="session-top">
          <button type="button" className="quit-btn" onClick={() => setShowQuit(true)} aria-label={STR.common.cancel}>
            ✕
          </button>
          <span className="muted small">{STR.session.readFirst}</span>
        </div>
        <ReadingView reading={cfg.reading} onGloss={setGloss} />
        {(cfg.reading.glossary?.length ?? 0) > 0 && <p className="muted small" style={{ marginBottom: 12 }}>💡 {STR.session.glossaryHint}</p>}
        <button type="button" className="btn btn-primary btn-block" onClick={() => setPhase('questions')}>
          {STR.session.toQuestions} →
        </button>
        {glossSheet}
        {quitDialog}
      </div>
    );
  }

  const counterText =
    question.kind === 'match'
      ? STR.session.round(qIndex + 1, total)
      : cfg.subject === 'math'
        ? STR.session.problem(qIndex + 1, total)
        : STR.session.question(qIndex + 1, total);

  return (
    <div className="container">
      <div className="session-top">
        <button type="button" className="quit-btn" onClick={() => setShowQuit(true)} aria-label={STR.common.cancel}>
          ✕
        </button>
        <ProgressDots total={total} current={qIndex} results={results.map((r) => r.correct)} />
        {cfg.reading && (
          <button type="button" className="back-btn" title={STR.session.showText} onClick={() => setShowText(true)}>
            📖
          </button>
        )}
      </div>

      <p className="muted small" style={{ textAlign: 'center', marginBottom: 10 }}>
        {counterText}
      </p>

      {question.kind === 'match' ? (
        <>
          <p className="muted small" style={{ textAlign: 'center', marginBottom: 10 }}>
            {STR.session.matchHint}
          </p>
          <MatchingGrid key={qIndex} pairs={question.pairs} onComplete={matchComplete} />
        </>
      ) : (
        <>
          <div className={`prompt-card${cfg.reading ? ' text-question' : ''}`}>{question.prompt}</div>
          {question.kind === 'numeric' ? (
            <NumericKeypad value={numValue} onChange={setNumValue} onSubmit={submitNumeric} allowNegative disabled={!!feedback} />
          ) : (
            <ChoiceButtons choices={question.choices} revealed={revealed} onSelect={selectChoice} />
          )}
        </>
      )}

      {feedback && <div className={`feedback-banner ${feedback.good ? 'good' : 'bad'}`}>{feedback.text}</div>}

      {showText && cfg.reading && (
        <div className="text-overlay">
          <div className="container" style={{ padding: 0 }}>
            <button type="button" className="btn btn-ghost btn-block" style={{ marginBottom: 12 }} onClick={() => setShowText(false)}>
              {STR.session.hideText} ✕
            </button>
            <ReadingView reading={cfg.reading} onGloss={setGloss} />
          </div>
        </div>
      )}

      {glossSheet}
      {quitDialog}
    </div>
  );
}
