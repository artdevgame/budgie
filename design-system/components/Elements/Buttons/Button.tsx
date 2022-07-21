import { StyledComponent } from 'nativewind';
import React, { PropsWithChildren, ReactElement } from 'react';
import { Pressable, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { PressHookProps, usePress } from '@react-native-aria/interactions';

interface IRoundedButton {
  className?: string;
  size: ButtonSize;
}

export interface IButton extends PropsWithChildren<PressHookProps> {
  className?: string;
  rounded?: boolean;
  size?: ButtonSize;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | '2xl';

export const sharedClassNames =
  'border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium inline-flex items-center shadow-sm';

const sharedPrimaryClassNames = 'bg-indigo-600 border-transparent hover:bg-indigo-700 text-white';
const sharedSecondaryClassNames = 'bg-indigo-100 border-transparent hover:bg-indigo-200 text-indigo-700';
const sharedTertiaryClassNames = 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700';

const classNames = {
  primary: {
    xs: twMerge(sharedClassNames, sharedPrimaryClassNames, 'px-2.5 py-1.5 text-xs rounded'),
    sm: twMerge(sharedClassNames, sharedPrimaryClassNames, 'px-3 py-2 text-sm leading-4 rounded-md'),
    md: twMerge(sharedClassNames, sharedPrimaryClassNames, 'px-4 py-2 text-sm rounded-md'),
    lg: twMerge(sharedClassNames, sharedPrimaryClassNames, 'px-4 py-2 text-base rounded-md'),
    '2xl': twMerge(sharedClassNames, sharedPrimaryClassNames, 'px-6 py-3 text-base rounded-md'),
  },
  secondary: {
    xs: twMerge(sharedClassNames, sharedSecondaryClassNames, 'px-2.5 py-1.5 text-xs rounded'),
    sm: twMerge(sharedClassNames, sharedSecondaryClassNames, 'px-3 py-2 text-sm leading-4 rounded-md'),
    md: twMerge(sharedClassNames, sharedSecondaryClassNames, 'px-4 py-2 text-sm rounded-md'),
    lg: twMerge(sharedClassNames, sharedSecondaryClassNames, 'px-4 py-2 text-base rounded-md'),
    '2xl': twMerge(sharedClassNames, sharedSecondaryClassNames, 'px-6 py-3 text-base rounded-md'),
  },
  tertiary: {
    xs: twMerge(sharedClassNames, sharedTertiaryClassNames, 'px-2.5 py-1.5 text-xs rounded'),
    sm: twMerge(sharedClassNames, sharedTertiaryClassNames, 'px-3 py-2 text-sm leading-4 rounded-md'),
    md: twMerge(sharedClassNames, sharedTertiaryClassNames, 'px-4 py-2 text-sm rounded-md'),
    lg: twMerge(sharedClassNames, sharedTertiaryClassNames, 'px-4 py-2 text-base rounded-md'),
    '2xl': twMerge(sharedClassNames, sharedTertiaryClassNames, 'px-6 py-3 text-base rounded-md'),
  },
};

const getClassNameForRoundedButton = ({ className, size }: IRoundedButton) => {
  let sizeStyle = '';
  switch (size) {
    case 'xs':
      sizeStyle = 'px-3';
      break;
    case 'sm':
      sizeStyle = 'px-3.5';
      break;
    case 'md':
      sizeStyle = 'px-5';
      break;
  }

  return twMerge(className, 'rounded-full', sizeStyle);
};

export const Button = ({
  children,
  className,
  rounded = false,
  size = 'md',
  variant = 'primary',
  ...rest
}: IButton): ReactElement | null => {
  if (!classNames[variant][size]) {
    console.error('Button size not supported:', size);
    return null;
  }

  const { pressProps } = usePress(rest);

  const currentClassName = rounded
    ? getClassNameForRoundedButton({ className: classNames[variant][size], size })
    : classNames[variant][size];

  const content = React.isValidElement(children) ? (
    children
  ) : (
    <StyledComponent component={Text} className="font-medium" style={{ color: 'inherit' }}>
      {children}
    </StyledComponent>
  );

  return (
    <StyledComponent component={Pressable} {...pressProps} className={twMerge(currentClassName, className)}>
      {content}
    </StyledComponent>
  );
};
