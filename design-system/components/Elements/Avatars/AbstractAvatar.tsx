import { StyledComponent } from 'nativewind';
import React, { ReactElement } from 'react';
import { View, ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { IAvatarCommon, TAnyAvatar, TNotificationPosition } from './common';

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

const notificationClassMap = {
  xs: 'h-0.5 w-0.5',
  sm: 'h-1 w-1',
  md: 'h-1.5 w-1.5',
  lg: 'h-2 w-2',
  xl: 'h-2.5 w-2.5',
};

const notificationColorMap = {
  amber: 'bg-amber-400',
  blue: 'bg-blue-400',
  cyan: 'bg-cyan-400',
  emerald: 'bg-emerald-400',
  fuchsia: 'bg-fuchsia-400',
  gray: 'bg-gray-400',
  green: 'bg-green-400',
  indigo: 'bg-indigo-400',
  lime: 'bg-lime-400',
  neutral: 'bg-neutral-400',
  orange: 'bg-orange-400',
  pink: 'bg-pink-400',
  purple: 'bg-purple-400',
  red: 'bg-red-400',
  rose: 'bg-rose-400',
  sky: 'bg-sky-400',
  slate: 'bg-slate-400',
  stone: 'bg-stone-400',
  teal: 'bg-teal-400',
  violet: 'bg-violet-400',
  yellow: 'bg-yellow-400',
  zinc: 'bg-zinc-400',
};

const AvatarWithNotification = ({
  children,
  notificationColor = 'red',
  notificationPosition = 'none',
  rounded = false,
  size = 'md',
  ...rest
}: IAvatarWithNotification) => {
  const notificationClassName = twMerge(
    'absolute right-0 block rounded-full',
    getTranslation({ notificationPosition, rounded }),
  );

  const notification =
    rounded && notificationPosition === 'bottom' ? (
      <StyledComponent component={View} className={twMerge(notificationClassName, 'bottom-0 border-2 border-white')}>
        <StyledComponent
          component={View}
          className={twMerge(`block rounded-full`, notificationClassMap[size], notificationColorMap[notificationColor])}
        />
      </StyledComponent>
    ) : (
      <StyledComponent
        component={View}
        className={twMerge(
          notificationClassName,
          notificationClassMap[size],
          notificationColorMap[notificationColor],
          `ring-2 ring-white`,
          notificationPosition === 'bottom' ? 'bottom-0' : 'top-0',
        )}
      />
    );

  return (
    <StyledComponent {...rest} component={View} className="inline-block relative">
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
  style,
  ...rest
}: IAbstractAvatar): ReactElement => {
  const avatar = React.cloneElement(children, {
    className: twMerge(children.props.className, className),
    style,
  });

  if (notificationPosition !== 'none') {
    return (
      <AvatarWithNotification
        {...rest}
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
