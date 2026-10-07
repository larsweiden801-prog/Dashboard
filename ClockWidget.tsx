import { useEffect, useState } from 'react';
import { defineWidget } from './types';

const time = new Intl.DateTimeFormat('nl-NL', { hour: '2-digit', minute: '2-digit' });
const date = new Intl.DateTimeFormat('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' });

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div>
      <p className="text-4xl font-semibold tabular-nums">{time.format(now)}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{date.format(now)}</p>
    </div>
  );
}

export const clockWidget = defineWidget<null>({
  type: 'clock',
  label: 'Klok',
  icon: '🕒',
  description: 'Tijd en datum',
  initialData: null,
  Component: Clock,
});
