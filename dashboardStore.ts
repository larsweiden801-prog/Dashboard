import { useSyncExternalStore } from 'react';
import type { DashboardState, WidgetInstance } from '../types/dashboard';
import { createId } from '../utils/id';
import { widgetRegistry } from '../widgets/registry';

const STORAGE_KEY = 'dashboard:v1';
const emptyState: DashboardState = { version: 1, widgets: [] };

const isWidget = (v: unknown): v is WidgetInstance =>
  typeof v === 'object' &&
  v !== null &&
  typeof (v as WidgetInstance).id === 'string' &&
  typeof (v as WidgetInstance).type === 'string' &&
  typeof (v as WidgetInstance).title === 'string';

export function parseDashboard(json: string): DashboardState | null {
  try {
    const v: unknown = JSON.parse(json);
    const s = v as DashboardState;
    if (typeof v === 'object' && v !== null && s.version === 1 && Array.isArray(s.widgets)) {
      if (s.widgets.every(isWidget)) return s;
    }
  } catch {
    /* ongeldige JSON */
  }
  return null;
}

const load = (): DashboardState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return (raw && parseDashboard(raw)) || emptyState;
  } catch {
    return emptyState;
  }
};

let state = load();
const listeners = new Set<() => void>();

const commit = (next: DashboardState) => {
  state = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* opslag vol of geblokkeerd: wijziging geldt alleen deze sessie */
  }
  listeners.forEach((listener) => listener());
};

export const dashboardActions = {
  add(type: string) {
    const definition = widgetRegistry[type];
    if (!definition) return;
    const widget: WidgetInstance = {
      id: createId(),
      type,
      title: definition.label,
      data: structuredClone(definition.initialData),
    };
    commit({ ...state, widgets: [...state.widgets, widget] });
  },
  update(id: string, patch: Partial<Pick<WidgetInstance, 'title' | 'data'>>) {
    commit({ ...state, widgets: state.widgets.map((w) => (w.id === id ? { ...w, ...patch } : w)) });
  },
  remove(id: string) {
    commit({ ...state, widgets: state.widgets.filter((w) => w.id !== id) });
  },
  move(id: string, offset: -1 | 1) {
    const from = state.widgets.findIndex((w) => w.id === id);
    const to = from + offset;
    if (from < 0 || to < 0 || to >= state.widgets.length) return;
    const widgets = [...state.widgets];
    const [item] = widgets.splice(from, 1);
    if (!item) return;
    widgets.splice(to, 0, item);
    commit({ ...state, widgets });
  },
  replace(next: DashboardState) {
    commit(next);
  },
  reset() {
    commit(emptyState);
  },
};

export const serializeDashboard = (): string => JSON.stringify(state, null, 2);

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useDashboard = (): DashboardState => useSyncExternalStore(subscribe, () => state);
