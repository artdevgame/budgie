import { styled, StyledComponent } from 'nativewind';
import React, { Children, cloneElement, ReactElement, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { IIconButton } from '@budgie/design-system/components/Elements/Buttons/IconButton';
import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';

import { Text } from '../../Elements/Typography/Text';
import { INotificationAction } from './common';

interface INotifcationActions {
  actions:
    | {
        type: 'close';
        onPress(): void;
      }
    | {
        type: 'actions';
        actions: INotificationAction[];
      };
}

interface NotificationDescriptionProps {
  children: string;
}

interface INotificationIcon {
  children?: ReactElement<React.SVGProps<SVGSVGElement>>;
}

interface INotificationTitle {
  children: string;
}

export interface INotification {
  children: ReactElement;
  className?: string;
}

const StyledView = styled(View);

const NotificationCloseAction = (props: Partial<IIconButton>) => (
  <StyledView className="ml-4 shrink-0 flex">
    <StyledComponent component={Pressable} {...props} className="w-5 h-5 hover:text-gray-500 text-gray-400">
      <XIcon />
    </StyledComponent>
  </StyledView>
);

export const NotificationActions = ({ actions }: INotifcationActions): ReactElement | null => {
  if (actions.type === 'close') {
    return <NotificationCloseAction onPress={actions.onPress} />;
  }

  return null;
};

NotificationActions.displayName = 'NotificationActions';

export const NotificationIcon = ({ children }: INotificationIcon): ReactElement | null => {
  if (!children) return null;

  const icon = cloneElement(children, {
    className: twMerge(children.props.className, 'h-6 w-6'),
    viewBox: '0 0 24 24',
  });

  return <StyledView className="shrink-0">{icon}</StyledView>;
};

export const NotificationDescription = ({ children: description }: NotificationDescriptionProps): ReactElement => (
  <Text className="mt-1 text-sm text-gray-500">{description}</Text>
);

export const NotificationTitle = ({ children: title }: INotificationTitle): ReactElement => (
  <Text className="text-sm font-medium text-gray-900">{title}</Text>
);

export const AbstractNotification = ({ children, className }: INotification): ReactElement => {
  const [isOpen, setIsOpen] = useState(true);
  const notificationRef = useRef<typeof View>(null);

  const wrapperClassNames = twMerge(
    'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
    className,
  );

  return (
    <StyledView
      ref={notificationRef}
      className="fixed inset-0 flex flex-row items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
    >
      <Transition
        show={isOpen}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {(ref) => {
          const notificationBody = Children.map(children, (child: ReactElement) =>
            cloneElement(child, { ref: notificationRef }),
          );

          return (
            <StyledView ref={ref} className={wrapperClassNames}>
              {notificationBody}
            </StyledView>
          );
        }}
      </Transition>
    </StyledView>
  );
};
