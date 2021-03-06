import { styled } from 'nativewind';
import React, { forwardRef, MutableRefObject, ReactElement } from 'react';
import { Pressable, View as NativeView } from 'react-native';

import { Text } from '../../Elements/Typography/Text';
import { AbstractNotification, NotificationActions } from './AbstractNotification';
import { INotificationAction } from './common';

export interface CondensedNotificationProps {
  action?: INotificationAction;
  children: string;
  onClose(notification: NativeView): void;
}

const View = styled(NativeView);

const NotificationBody = forwardRef<NativeView, CondensedNotificationProps>(({ action, children, onClose }, ref) => {
  const buttonClassName =
    'ml-3 shrink-0 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

  const actionButton =
    typeof action !== 'undefined' ? (
      <Pressable onPress={action.onPress}>
        <Text className={buttonClassName}>{action.label}</Text>
      </Pressable>
    ) : null;

  return (
    <View className="p-4">
      <View className="flex items-center">
        <View className="flex flex-row justify-between">
          <Text className="text-sm font-medium text-gray-900">{children}</Text>
          {actionButton}
          <NotificationActions
            actions={{
              type: 'close',
              onPress: () => onClose((ref as MutableRefObject<NativeView>).current),
            }}
          />
        </View>
      </View>
    </View>
  );
});

NotificationBody.displayName = 'NotificationBody';

export const CondensedNotification = ({ children, ...rest }: CondensedNotificationProps): ReactElement => (
  <AbstractNotification>
    <NotificationBody {...rest}>{children}</NotificationBody>
  </AbstractNotification>
);
