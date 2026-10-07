import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark' | 'system';

const KEY = 'theme';
const media = window.matchMedia('(prefers-color-scheme: dark)');
const listeners = new Set<() => void>();

const read = (): Theme => {
  try {
    const value = localStorage.getItem(KEY);
    return value === 'light' || value === 'dark' ? value : 'system';
  } catch {
    return 'system';
  }
};

let current: Theme = read();
const isDarkNow = () => current === 'dark' || (current === 'system' && media.matches);

const apply = () => {
  document.documentElement.classList.toggle('dark', isDarkNow());
  listeners.forEach((listener) => listener());
};
media.addEventListener('change', apply);
apply();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const setTheme = (theme: Theme) => {
  current = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* alleen voor deze sessie */
  }
  apply();
};

export function useTheme() {
  const [theme, dark] = useSyncExternalStore(subscribe, () => `${current}:${isDarkNow()}`).split(':');
  return { theme: theme as Theme, isDark: dark === 'true', setTheme };
}
