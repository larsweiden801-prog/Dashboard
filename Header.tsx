import { useTheme } from '../hooks/useTheme';
import { config } from '../utils/config';
import { Button } from './Button';

export function Header() {
  const { isDark, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 pt-[env(safe-area-inset-top)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <span className="py-3 text-lg font-semibold">{config.appName}</span>
      <Button
        variant="secondary"
        aria-label="Wissel tussen licht en donker"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
      >
        {isDark ? '☀️' : '🌙'}
      </Button>
    </header>
  );
}
