import { dashboardActions } from '../store/dashboardStore';
import type { WidgetInstance } from '../types/dashboard';
import { widgetRegistry } from '../widgets/registry';
import { Button } from './Button';
import { Card } from './Card';
import { ErrorBoundary } from './ErrorBoundary';

interface WidgetCardProps {
  widget: WidgetInstance;
  editing: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export function WidgetCard({ widget, editing, isFirst, isLast }: WidgetCardProps) {
  const definition = widgetRegistry[widget.type];
  return (
    <Card>
      <div className="mb-3 flex items-center gap-2">
        {editing ? (
          <>
            <input
              aria-label="Titel"
              value={widget.title}
              onChange={(e) => dashboardActions.update(widget.id, { title: e.target.value })}
              className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-transparent px-2 py-2 text-sm font-semibold dark:border-slate-600"
            />
            <Button variant="secondary" className="w-11 px-0" aria-label="Omhoog" disabled={isFirst} onClick={() => dashboardActions.move(widget.id, -1)}>
              ↑
            </Button>
            <Button variant="secondary" className="w-11 px-0" aria-label="Omlaag" disabled={isLast} onClick={() => dashboardActions.move(widget.id, 1)}>
              ↓
            </Button>
            <Button variant="danger" className="w-11 px-0" aria-label="Verwijderen" onClick={() => dashboardActions.remove(widget.id)}>
              ✕
            </Button>
          </>
        ) : (
          <h2 className="flex-1 font-semibold">
            {definition?.icon} {widget.title}
          </h2>
        )}
      </div>
      <ErrorBoundary fallback={<p className="text-sm text-red-600">Deze widget kan niet worden getoond.</p>}>
        {definition ? (
          <definition.Component
            data={widget.data}
            onChange={(data) => dashboardActions.update(widget.id, { data })}
          />
        ) : (
          <p className="text-sm text-slate-500">Onbekend widgettype: {widget.type}</p>
        )}
      </ErrorBoundary>
    </Card>
  );
}
