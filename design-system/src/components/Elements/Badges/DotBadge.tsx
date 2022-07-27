import React, { PropsWithChildren, ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

import { SunIcon } from '@heroicons/react/solid';

import { BasicBadge, IBasicBadge } from './BasicBadge';

export { colors } from './BasicBadge';

interface Dot {
  className?: string;
  color: string;
  large: boolean;
  rounded: boolean;
}

export type DotBadgeProps = PropsWithChildren<IBasicBadge>;

const sizeClassNames = (isRounded: boolean) => ({
  regular: twMerge(isRounded ? '' : '-ml-0.5'),
  large: twMerge(isRounded ? '-ml-0.5' : '-ml-1'),
});

const Dot = ({ color, large = false, rounded = false }: Dot) => {
  const className = twMerge(
    'mr-1.5 h-3 w-3',
    color,
    large ? sizeClassNames(rounded).large : sizeClassNames(rounded).regular,
  );
  return <SunIcon className={className} />;
};

const dotClassNames = {
  blue: 'text-blue-400',
  gray: 'text-gray-400',
  green: 'text-green-400',
  indigo: 'text-indigo-400',
  pink: 'text-pink-400',
  purple: 'text-purple-400',
  red: 'text-red-400',
  yellow: 'text-yellow-400',
};

export const DotBadge = ({
  children,
  className,
  color,
  large = false,
  rounded = false,
  ...props
}: DotBadgeProps): ReactElement => {
  const dotColor = twMerge(dotClassNames[color], className);
  const dot = <Dot color={dotColor} large={large} rounded={rounded} />;

  return (
    <BasicBadge {...props} color={color} large={large} rounded={rounded}>
      <>
        {dot}
        {children}
      </>
    </BasicBadge>
  );
};
