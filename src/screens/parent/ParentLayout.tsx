import { navigate } from '../../router';
import { useStore } from '../../storage/store';
import { STR } from '../../i18n/strings';
import { ParentOverview } from './ParentOverview';
import { ParentRewards } from './ParentRewards';
import { ParentRedemptions } from './ParentRedemptions';
import { ParentSettings } from './ParentSettings';

const TABS = ['overview', 'rewards', 'redemptions', 'settings'] as const;
type Tab = (typeof TABS)[number];

export function ParentLayout({ tab }: { tab: string }) {
  const { state } = useStore();
  const active: Tab = (TABS as readonly string[]).includes(tab) ? (tab as Tab) : 'overview';
  const pendingCount = state.redemptions.filter((r) => r.status === 'pending').length;

  const labels: Record<Tab, string> = {
    overview: STR.parent.tabs.overview,
    rewards: STR.parent.tabs.rewards,
    redemptions: STR.parent.tabs.redemptions,
    settings: STR.parent.tabs.settings,
  };

  return (
    <div className="container-wide">
      <div className="spread" style={{ marginBottom: 14 }}>
        <h1 className="screen-title">{STR.parent.area}</h1>
        <button type="button" className="link-btn" onClick={() => navigate('/')}>
          {STR.parent.exit} →
        </button>
      </div>
      <nav className="parent-tabs">
        {TABS.map((t) => (
          <button key={t} type="button" className={`parent-tab${t === active ? ' active' : ''}`} onClick={() => navigate(`/parent/${t}`)}>
            {labels[t]}
            {t === 'redemptions' && pendingCount > 0 && <span className="tab-count">{pendingCount}</span>}
          </button>
        ))}
      </nav>
      {active === 'overview' && <ParentOverview />}
      {active === 'rewards' && <ParentRewards />}
      {active === 'redemptions' && <ParentRedemptions />}
      {active === 'settings' && <ParentSettings />}
    </div>
  );
}
