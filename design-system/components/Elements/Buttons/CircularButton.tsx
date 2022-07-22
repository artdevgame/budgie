import { StyledComponent } from 'nativewind';
import React, { cloneElement, ReactElement, ReactNode } from 'react';
import { Pressable } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { PressHookProps, usePress } from '@react-native-aria/interactions';

import { IButton } from './Button';

export interface ICircularButton extends PressHookProps {
  className?: string;
  icon: ReactNode;
  size: IButton['size'];
}

const sharedClassNames =
  'bg-indigo-600 border-transparent border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-indigo-700 inline-flex items-center rounded-full shadow-sm text-white ';

const classNames = {
  xs: {
    buttonClassName: twMerge(sharedClassNames, 'p-1'),
    iconClassName: 'h-5 w-5',
  },
  sm: {
    buttonClassName: twMerge(sharedClassNames, 'p-1.5'),
    iconClassName: 'h-5 w-5',
  },
  md: {
    buttonClassName: twMerge(sharedClassNames, 'p-2'),
    iconClassName: 'h-5 w-5',
  },
  lg: {
    buttonClassName: twMerge(sharedClassNames, 'p-2'),
    iconClassName: 'h-6 w-6',
  },
  xl: {
    buttonClassName: twMerge(sharedClassNames, 'p-3'),
    iconClassName: 'h-6 w-6',
  },
};

export const CircularButton = ({ className, icon, size = 'md', ...rest }: ICircularButton): ReactElement | null => {
  if (!classNames[size]) {
    console.error('CircularButton size not supported:', size);
    return null;
  }

  const { pressProps } = usePress(rest);
  const Icon = cloneElement(icon as ReactElement, { className: classNames[size].iconClassName });

  return (
    <StyledComponent
      component={Pressable}
      {...pressProps}
      className={twMerge(classNames[size].buttonClassName, className)}
    >
      {Icon}
    </StyledComponent>
  );
};
