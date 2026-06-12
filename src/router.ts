import { useEffect, useState } from 'react';

/**
 * Tiny hash router. Routes look like '#/kid/abc123/session'.
 * Hash routing means GitHub Pages never needs an SPA fallback.
 */

export function getHashPath(): string {
  const h = window.location.hash;
  if (!h || h === '#') return '/';
  return h.startsWith('#') ? h.slice(1) : h;
}

export function navigate(path: string): void {
  window.location.hash = path;
}

export function useRoute(): string {
  const [path, setPath] = useState(getHashPath);
  useEffect(() => {
    const onChange = () => setPath(getHashPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}

/** Match '/kid/:id/subject/:subj' against a concrete path; returns params or null. */
export function matchPath(pattern: string, path: string): Record<string, string> | null {
  const pp = pattern.split('/').filter(Boolean);
  const sp = path.split('/').filter(Boolean);
  if (pp.length !== sp.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < pp.length; i++) {
    if (pp[i].startsWith(':')) params[pp[i].slice(1)] = decodeURIComponent(sp[i]);
    else if (pp[i] !== sp[i]) return null;
  }
  return params;
}
