export interface NavItem {
  to: string;
  label: string;
  icon: string;
}

export const navItems: readonly NavItem[] = [
  { to: '/', label: 'Dashboard', icon: '▦' },
  { to: '/settings', label: 'Instellingen', icon: '⚙' },
];
