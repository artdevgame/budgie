import { StyledComponent } from 'nativewind';
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { IAvatarCommon, TAnyAvatar, TNotificationPosition } from './common';
import { getScaledSize } from './getScaledSize';

interface IGetTranslation {
  notificationPosition: TNotificationPosition;
  rounded: boolean;
}

interface IAvatarWithNotification extends IAbstractAvatar {}

export interface IAbstractAvatar extends IAvatarCommon {
  children: TAnyAvatar;
}

const getTranslation = ({ notificationPosition, rounded }: IGetTranslation) => {
  if (!rounded) return '';

  return notificationPosition === 'top'
    ? 'transform -translate-y-1/2 translate-x-1/2'
    : 'transform translate-y-1/2 translate-x-1/2';
};

const AvatarWithNotification = ({
  children,
  notificationColor,
  notificationPosition = 'none',
  rounded = false,
  size = 'md',
}: IAvatarWithNotification) => {
  const notificationScale = getScaledSize({ size, scale: 0.5, startAt: 1 });
  const notificationClassName = twMerge(
    'absolute right-0 block rounded-full',
    getTranslation({ notificationPosition, rounded }),
  );

  const notification =
    rounded && notificationPosition === 'bottom' ? (
      <StyledComponent component={View} className={twMerge(notificationClassName, 'bottom-0 border-2 border-white')}>
        <StyledComponent
          component={View}
          className={twMerge(
            `block rounded-full bg-${notificationColor}-400`,
            `h-${notificationScale} w-${notificationScale}`,
          )}
        />
      </StyledComponent>
    ) : (
      <StyledComponent
        component={View}
        className={twMerge(
          notificationClassName,
          `h-${notificationScale} w-${notificationScale} ring-2 ring-white bg-${notificationColor}-400`,
          notificationPosition === 'bottom' ? 'bottom-0' : 'top-0',
        )}
      />
    );

  return (
    <StyledComponent component={View} className="inline-block relative">
      {children}
      {notification}
    </StyledComponent>
  );
};

export const AbstractAvatar = ({
  children,
  className,
  notificationColor = 'gray',
  notificationPosition = 'none',
  rounded = false,
  size = 'md',
}: IAbstractAvatar): ReactElement => {
  const avatar = React.cloneElement(children, {
    className: twMerge(children.props.className, className),
  });

  if (notificationPosition !== 'none') {
    return (
      <AvatarWithNotification
        notificationColor={notificationColor}
        notificationPosition={notificationPosition}
        rounded={rounded}
        size={size}
      >
        {avatar}
      </AvatarWithNotification>
    );
  }

  return avatar;
};
