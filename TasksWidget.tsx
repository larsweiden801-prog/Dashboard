import { useState, type FormEvent } from 'react';
import { createId } from '../utils/id';
import { Button } from '../components/Button';
import { defineWidget, type WidgetProps } from './types';

interface TasksData {
  items: Array<{ id: string; text: string; done: boolean }>;
}

function Tasks({ data, onChange }: WidgetProps<TasksData>) {
  const [text, setText] = useState('');
  const { items } = data;

  const add = (e: FormEvent) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onChange({ items: [...items, { id: createId(), text: value, done: false }] });
    setText('');
  };
  const toggle = (id: string) =>
    onChange({ items: items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)) });
  const remove = (id: string) => onChange({ items: items.filter((i) => i.id !== id) });

  return (
    <div className="space-y-2">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-5 w-5 accent-teal-600"
              checked={item.done}
              onChange={() => toggle(item.id)}
              aria-label={item.text}
            />
            <span className={`flex-1 text-sm ${item.done ? 'text-slate-400 line-through' : ''}`}>
              {item.text}
            </span>
            <button
              type="button"
              aria-label={`Verwijder ${item.text}`}
              className="px-2 text-slate-400 hover:text-red-600"
              onClick={() => remove(item.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={add} className="flex gap-2">
        <input
          aria-label="Nieuwe taak"
          placeholder="Nieuwe taak"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-transparent px-3 text-sm dark:border-slate-600"
        />
        <Button type="submit">Toevoegen</Button>
      </form>
    </div>
  );
}

export const tasksWidget = defineWidget<TasksData>({
  type: 'tasks',
  label: 'Taken',
  icon: '✅',
  description: 'Afvinkbare lijst',
  initialData: { items: [] },
  Component: Tasks,
});
