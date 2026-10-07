import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';
import { navItems } from '../utils/navigation';

export function Navigation({ variant }: { variant: 'mobile' | 'desktop' }) {
  const mobile = variant === 'mobile';
  return (
    <nav
      aria-label="Hoofdnavigatie"
      className={cn(
        mobile
          ? 'fixed inset-x-0 bottom-0 z-40 flex border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] dark:border-slate-800 dark:bg-slate-900 md:hidden'
          : 'hidden w-56 shrink-0 flex-col gap-1 border-r border-slate-200 p-3 dark:border-slate-800 md:flex',
      )}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 rounded-lg text-sm font-medium',
              mobile ? 'min-h-14 flex-1 flex-col justify-center text-xs' : 'px-3 py-2',
              isActive
                ? 'text-teal-700 dark:text-teal-400'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100',
              !mobile && isActive && 'bg-teal-50 dark:bg-slate-800',
            )
          }
        >
          <span aria-hidden>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
