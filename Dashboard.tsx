import { useCallback, useState } from 'react';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { Modal } from '../components/Modal';
import { WidgetCard } from '../components/WidgetCard';
import { dashboardActions, useDashboard } from '../store/dashboardStore';
import { widgetList } from '../widgets/registry';

export default function Dashboard() {
  const { widgets } = useDashboard();
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const closeAdding = useCallback(() => setAdding(false), []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          {editing && (
            <Button variant="secondary" onClick={() => setAdding(true)}>
              Widget toevoegen
            </Button>
          )}
          {widgets.length > 0 && (
            <Button variant={editing ? 'primary' : 'secondary'} onClick={() => setEditing((e) => !e)}>
              {editing ? 'Klaar' : 'Bewerken'}
            </Button>
          )}
        </div>
      </div>

      {widgets.length === 0 ? (
        <EmptyState title="Je dashboard is leeg">
          <Button onClick={() => { setEditing(true); setAdding(true); }}>Eerste widget toevoegen</Button>
        </EmptyState>
      ) : (
        <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {widgets.map((widget, index) => (
            <WidgetCard
              key={widget.id}
              widget={widget}
              editing={editing}
              isFirst={index === 0}
              isLast={index === widgets.length - 1}
            />
          ))}
        </div>
      )}

      <Modal open={adding} title="Widget toevoegen" onClose={closeAdding}>
        <ul className="space-y-2">
          {widgetList.map((definition) => (
            <li key={definition.type}>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg border border-slate-200 p-3 text-left hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                onClick={() => {
                  dashboardActions.add(definition.type);
                  closeAdding();
                }}
              >
                <span aria-hidden className="text-xl">{definition.icon}</span>
                <span>
                  <span className="block text-sm font-medium">{definition.label}</span>
                  <span className="block text-xs text-slate-500">{definition.description}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
