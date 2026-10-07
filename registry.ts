import { clockWidget } from './ClockWidget';
import { notesWidget } from './NotesWidget';
import { tasksWidget } from './TasksWidget';
import type { AnyWidgetDefinition } from './types';

/** Nieuwe widget toevoegen: maak een bestand met defineWidget() en zet het in deze lijst. */
export const widgetList: readonly AnyWidgetDefinition[] = [clockWidget, notesWidget, tasksWidget];

export const widgetRegistry: Readonly<Record<string, AnyWidgetDefinition>> = Object.fromEntries(
  widgetList.map((definition) => [definition.type, definition]),
);
