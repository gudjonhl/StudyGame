import type { CSSProperties } from 'react';
import { navigate } from '../router';
import { useStore } from '../storage/store';
import { STR } from '../i18n/strings';

export function ProfilePicker() {
  const { state } = useStore();
  return (
    <div className="profile-screen">
      <h1 className="app-title">⭐ {STR.appName}</h1>
      <p className="muted">{STR.profile.whoAreYou}</p>
      <div className="profile-grid">
        {state.profiles.map((kid) => (
          <button
            key={kid.id}
            type="button"
            className="profile-card"
            style={{ '--accent': kid.color } as CSSProperties}
            onClick={() => navigate(`/kid/${kid.id}`)}
          >
            <span className="profile-avatar">{kid.avatar}</span>
            <span className="profile-name">{kid.name}</span>
          </button>
        ))}
      </div>
      <button type="button" className="link-btn" onClick={() => navigate('/parent/overview')}>
        {STR.profile.parents} →
      </button>
    </div>
  );
}
