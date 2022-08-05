import { styled } from 'nativewind';
import React, { forwardRef, MutableRefObject, ReactElement } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '../../Elements/Typography/Text';
import { AbstractNotification, NotificationActions } from './AbstractNotification';
import { INotificationAction } from './common';

export interface CondensedNotificationProps {
  action?: INotificationAction;
  children: string;
  onClose(notification: View): void;
}

const StyledView = styled(View);

const NotificationBody = forwardRef<View, CondensedNotificationProps>(({ action, children, onClose }, ref) => {
  const buttonClassName =
    'ml-3 shrink-0 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

  const actionButton =
    typeof action !== 'undefined' ? (
      <Pressable onPress={action.onPress}>
        <Text className={buttonClassName}>{action.label}</Text>
      </Pressable>
    ) : null;

  return (
    <StyledView className="p-4">
      <StyledView className="flex items-center">
        <StyledView className="flex flex-row justify-between">
          <Text className="text-sm font-medium text-gray-900">{children}</Text>
          {actionButton}
          <NotificationActions
            actions={{
              type: 'close',
              onPress: () => onClose((ref as MutableRefObject<View>).current),
            }}
          />
        </StyledView>
      </StyledView>
    </StyledView>
  );
});

NotificationBody.displayName = 'NotificationBody';

export const CondensedNotification = ({ children, ...rest }: CondensedNotificationProps): ReactElement => (
  <AbstractNotification>
    <NotificationBody {...rest}>{children}</NotificationBody>
  </AbstractNotification>
);
