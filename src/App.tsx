import type { ReactNode } from 'react';
import { matchPath, useRoute } from './router';
import { useStore } from './storage/store';
import { SUBJECT_IDS, type KidProfile, type SubjectId } from './storage/schema';
import { Redirect } from './components/Redirect';
import { ProfilePicker } from './screens/ProfilePicker';
import { FirstRunSetup } from './screens/FirstRunSetup';
import { KidDashboard } from './screens/KidDashboard';
import { SubjectSelect } from './screens/SubjectSelect';
import { SessionScreen } from './screens/SessionScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { ParentGate } from './screens/parent/ParentGate';

export default function App() {
  const path = useRoute();
  const { state } = useStore();

  function withKid(id: string, render: (kid: KidProfile) => ReactNode): ReactNode {
    const kid = state.profiles.find((p) => p.id === id);
    if (!kid) return <Redirect to="/" />;
    return render(kid);
  }

  if (path === '/') {
    return state.profiles.length > 0 ? <ProfilePicker /> : <FirstRunSetup />;
  }

  let m = matchPath('/kid/:id', path);
  if (m) return withKid(m.id, (kid) => <KidDashboard kid={kid} />);

  m = matchPath('/kid/:id/subject/:subj', path);
  if (m) {
    const subj = m.subj as SubjectId;
    if (!SUBJECT_IDS.includes(subj)) return <Redirect to="/" />;
    return withKid(m.id, (kid) => <SubjectSelect kid={kid} subject={subj} />);
  }

  m = matchPath('/kid/:id/session', path);
  if (m) return withKid(m.id, (kid) => <SessionScreen kid={kid} />);

  m = matchPath('/kid/:id/results', path);
  if (m) return withKid(m.id, (kid) => <ResultsScreen kid={kid} />);

  m = matchPath('/kid/:id/rewards', path);
  if (m) return withKid(m.id, (kid) => <RewardsScreen kid={kid} />);

  if (path === '/parent') return <Redirect to="/parent/overview" />;

  m = matchPath('/parent/:tab', path);
  if (m) return <ParentGate tab={m.tab} />;

  return <Redirect to="/" />;
}
