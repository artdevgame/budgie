import { StyledComponent } from 'nativewind';
import React, { forwardRef, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Text } from '../Typography/Text';

type IColor = keyof typeof classNames;

export interface IBasicBadge extends PropsWithChildren {
  className?: string;
  color: IColor;
  large?: boolean;
  rounded?: boolean;
}

const sharedClassNames = 'inline-flex items-center py-0.5 font-medium';

const classNames = {
  blue: twMerge(sharedClassNames, 'bg-blue-100 text-blue-800'),
  gray: twMerge(sharedClassNames, 'bg-gray-100 text-gray-800'),
  green: twMerge(sharedClassNames, 'bg-green-100 text-green-800'),
  indigo: twMerge(sharedClassNames, 'bg-indigo-100 text-indigo-800'),
  pink: twMerge(sharedClassNames, 'bg-pink-100 text-pink-800'),
  purple: twMerge(sharedClassNames, 'bg-purple-100 text-purple-800'),
  red: twMerge(sharedClassNames, 'bg-red-100 text-red-800'),
  yellow: twMerge(sharedClassNames, 'bg-yellow-100 text-yellow-800'),
};

const sizeClassNames = (isRounded: boolean) => ({
  regular: twMerge('text-xs', isRounded ? 'px-2' : 'px-2.5'),
  large: twMerge('text-sm', isRounded ? 'px-2.5' : 'px-3'),
});

const edgeClassNames = (isLarge: boolean) => ({
  regular: 'rounded-full',
  rounded: twMerge(isLarge ? 'rounded-md' : 'rounded'),
});

export const colors = Object.keys(classNames);

export const BasicBadge = forwardRef<View, IBasicBadge>(
  ({ children, className, color, large = false, rounded = false, ...rest }, ref) => {
    const styles = twMerge(
      'flex-row',
      classNames[color],
      large ? sizeClassNames(rounded).large : sizeClassNames(rounded).regular,
      rounded ? edgeClassNames(large).rounded : edgeClassNames(large).regular,
      className,
    );

    const content = React.isValidElement(children) ? (
      children
    ) : (
      <Text className={large ? 'text-sm' : 'text-xs'} style={{ color: 'inherit' }}>
        {children}
      </Text>
    );

    return (
      <StyledComponent {...rest} component={View} ref={ref} className={styles}>
        {content}
      </StyledComponent>
    );
  },
);
