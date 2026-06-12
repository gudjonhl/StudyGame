import type { CSSProperties } from 'react';
import { navigate } from '../router';
import { useStore } from '../storage/store';
import type { KidProfile, SubjectId } from '../storage/schema';
import { sessionHolder, type SessionConfig } from '../engine/types';
import { generateMathSession } from '../engine/math/generator';
import { tasksForLevel } from '../engine/math/levels';
import { buildReadingSession } from '../engine/reading';
import { buildVocabMcSession, buildVocabMatchSession } from '../engine/vocab';
import { DANISH_TEXTS } from '../content/danishTexts';
import { DANISH_VOCAB } from '../content/danishVocab';
import { ICELANDIC_TEXTS } from '../content/icelandicTexts';
import { ENGLISH_TEXTS } from '../content/englishTexts';
import { subjectMeta } from '../subjects';
import { STR } from '../i18n/strings';

interface TaskOption {
  key: string;
  icon: string;
  label: string;
  build: () => SessionConfig | null;
}

export function SubjectSelect({ kid, subject }: { kid: KidProfile; subject: SubjectId }) {
  const { state } = useStore();
  const meta = subjectMeta(subject);
  const level = kid.difficulty[subject];

  let options: TaskOption[];
  if (subject === 'math') {
    options = tasksForLevel(level).map((t) => ({
      key: t.id,
      icon: t.icon,
      label: t.label,
      build: () => generateMathSession(t.id, level),
    }));
  } else if (subject === 'danish') {
    options = [
      {
        key: 'reading',
        icon: '📖',
        label: 'Lesa texta',
        build: () => buildReadingSession('danish', kid, DANISH_TEXTS, state.sessions),
      },
      {
        key: 'vocab-mc',
        icon: '✅',
        label: 'Orðaforði – fjölval',
        build: () => buildVocabMcSession(kid, DANISH_VOCAB),
      },
      {
        key: 'vocab-match',
        icon: '🧩',
        label: 'Orðaforði – pörun',
        build: () => buildVocabMatchSession(kid, DANISH_VOCAB),
      },
    ];
  } else {
    const texts = subject === 'icelandic' ? ICELANDIC_TEXTS : ENGLISH_TEXTS;
    options = [
      {
        key: 'reading',
        icon: '📖',
        label: 'Lesa texta',
        build: () => buildReadingSession(subject, kid, texts, state.sessions),
      },
    ];
  }

  function start(option: TaskOption) {
    const config = option.build();
    if (!config) return;
    sessionHolder.set(config);
    navigate(`/kid/${kid.id}/session`);
  }

  return (
    <div className="container">
      <header className="screen-header">
        <button type="button" className="back-btn" onClick={() => navigate(`/kid/${kid.id}`)} aria-label={STR.common.back}>
          ←
        </button>
        <div>
          <h1 className="screen-title">
            {meta.icon} {meta.label}
          </h1>
          <span className="muted small">
            {STR.common.level} {level} · {STR.levels[level]}
          </span>
        </div>
      </header>

      <div className="task-list">
        {options.map((o) => (
          <button key={o.key} type="button" className="task-card" style={{ '--accent': meta.color } as CSSProperties} onClick={() => start(o)}>
            <span className="task-icon">{o.icon}</span>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
