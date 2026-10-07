import { parseDashboard, serializeDashboard } from '../store/dashboardStore';
import type { DashboardState } from '../types/dashboard';

export function downloadBackup(): void {
  const blob = new Blob([serializeDashboard()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dashboard-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function readBackup(file: File): Promise<DashboardState | null> {
  return parseDashboard(await file.text());
}
