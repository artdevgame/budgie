export interface INotificationAction {
  label: string;
  onPress(): void;
}

export type TNotificationAction = 'action' | 'close';
