export interface WidgetInstance {
  id: string;
  type: string;
  title: string;
  data: unknown;
}

export interface DashboardState {
  version: 1;
  widgets: WidgetInstance[];
}
