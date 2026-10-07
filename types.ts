import type { ComponentType } from 'react';

export interface WidgetProps<T> {
  data: T;
  onChange: (data: T) => void;
}

export interface WidgetDefinition<T> {
  type: string;
  label: string;
  icon: string;
  description: string;
  initialData: T;
  Component: ComponentType<WidgetProps<T>>;
}

export type AnyWidgetDefinition = WidgetDefinition<unknown>;

/** Typeveilig definiëren; de enige cast zit hier, zodat het register uniform blijft. */
export const defineWidget = <T>(definition: WidgetDefinition<T>): AnyWidgetDefinition =>
  definition as unknown as AnyWidgetDefinition;
