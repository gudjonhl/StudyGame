import { useEffect } from 'react';
import { navigate } from '../router';

export function Redirect({ to }: { to: string }) {
  useEffect(() => {
    navigate(to);
  }, [to]);
  return null;
}
