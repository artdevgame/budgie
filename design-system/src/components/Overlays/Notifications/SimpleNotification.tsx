import { styled } from 'nativewind';
import React, { forwardRef, MutableRefObject, PropsWithChildren, ReactElement } from 'react';
import { Pressable, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { IButton } from '../../Elements/Buttons/Button';
import { Text } from '../../Elements/Typography/Text';
import {
    AbstractNotification, NotificationActions, NotificationIcon
} from './AbstractNotification';
import { INotificationAction } from './common';

export { NotificationDescription, NotificationTitle } from './AbstractNotification';

interface NotificationBodyActionsProps {
  children?: ReactElement<IButton>[];
}

export type SimpleNotificationProps = PropsWithChildren<{
  actions?: INotificationAction[];
  icon?: ReactElement<React.SVGProps<SVGSVGElement>>;
  onClose(notification: View): void;
}>;

const StyledView = styled(View);

const NotificationBodyActions = ({ children: actions }: NotificationBodyActionsProps): ReactElement | null => {
  if (typeof actions === 'undefined') {
    return null;
  }
  return <StyledView className="mt-2 flex flex-row gap-6">{actions}</StyledView>;
};

const NotificationBody = forwardRef<View, SimpleNotificationProps>(({ actions, children, icon, onClose }, ref) => {
  const actionButtons =
    typeof actions !== 'undefined'
      ? actions.map(({ label, onPress }, buttonIdx): ReactElement<IButton> => {
          const buttonClassName = twMerge(
            'bg-white rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
            buttonIdx ? 'text-gray-700 hover:text-gray-500' : 'text-indigo-600 hover:text-indigo-500',
          );
          return (
            <Pressable key={`notification-action-${buttonIdx}`} onPress={onPress}>
              <Text className={buttonClassName}>{label}</Text>
            </Pressable>
          );
        })
      : undefined;

  return (
    <StyledView className="p-4">
      <StyledView className="flex flex-row items-start">
        <NotificationIcon>{icon}</NotificationIcon>
        <StyledView className="ml-3 flex-1 pt-0.5">
          {children}
          <NotificationBodyActions>{actionButtons}</NotificationBodyActions>
        </StyledView>
        <NotificationActions
          actions={{
            type: 'close',
            onPress: () => onClose((ref as MutableRefObject<View>).current),
          }}
        />
      </StyledView>
    </StyledView>
  );
});

NotificationBody.displayName = 'NotificationBody';

export const SimpleNotification = ({ children, ...props }: SimpleNotificationProps): ReactElement => (
  <AbstractNotification>
    <NotificationBody {...props}>{children}</NotificationBody>
  </AbstractNotification>
);
