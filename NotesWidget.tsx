import { defineWidget, type WidgetProps } from './types';

interface NotesData {
  text: string;
}

function Notes({ data, onChange }: WidgetProps<NotesData>) {
  return (
    <textarea
      aria-label="Notitie"
      rows={5}
      placeholder="Schrijf iets op…"
      value={data.text}
      onChange={(e) => onChange({ text: e.target.value })}
      className="w-full resize-y rounded-lg border border-slate-300 bg-transparent p-2 text-sm dark:border-slate-600"
    />
  );
}

export const notesWidget = defineWidget<NotesData>({
  type: 'notes',
  label: 'Notitie',
  icon: '📝',
  description: 'Vrije tekst',
  initialData: { text: '' },
  Component: Notes,
});
