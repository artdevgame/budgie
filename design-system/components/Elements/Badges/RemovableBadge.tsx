import React, { ReactElement, useRef } from 'react';
import { Pressable, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { XIcon } from '@heroicons/react/outline';

import { BasicBadge, IBasicBadge } from './BasicBadge';

export { colors } from './BasicBadge';

interface IRemoveButton {
  className?: string;
  onPress(): void;
}

export interface IRemovableBadge extends IBasicBadge {
  onRemove(badge: View): void;
}

const sharedClassNames =
  'shrink-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:text-white h-4 inline-flex items-center justify-center ml-0.5 rounded-full w-4';

const removeClassNames = {
  blue: twMerge(sharedClassNames, 'focus:bg-blue-500 hover:bg-blue-200 hover:text-blue-500 text-blue-400'),
  gray: twMerge(sharedClassNames, 'focus:bg-gray-500 hover:bg-gray-200 hover:text-gray-500 text-gray-400'),
  green: twMerge(sharedClassNames, 'focus:bg-green-500 hover:bg-green-200 hover:text-green-500 text-green-400'),
  indigo: twMerge(sharedClassNames, 'focus:bg-indigo-500 hover:bg-indigo-200 hover:text-indigo-500 text-indigo-400'),
  pink: twMerge(sharedClassNames, 'focus:bg-pink-500 hover:bg-pink-200 hover:text-pink-500 text-pink-400'),
  purple: twMerge(sharedClassNames, 'focus:bg-purple-500 hover:bg-purple-200 hover:text-purple-500 text-purple-400'),
  red: twMerge(sharedClassNames, 'focus:bg-red-500 hover:bg-red-200 hover:text-red-500 text-red-400'),
  yellow: twMerge(sharedClassNames, 'focus:bg-yellow-500 hover:bg-yellow-200 hover:text-yellow-500 text-yellow-400'),
};

const badgeSizeClassNames = {
  regular: 'pl-2 pr-0.5',
  large: 'pl-2.5 pr-1',
};

const RemoveButton = ({ className, onPress }: IRemoveButton): ReactElement => {
  return (
    <Pressable onPress={onPress}>
      <XIcon className={className} />
    </Pressable>
  );
};

export const RemovableBadge = ({
  children,
  className,
  color,
  large = false,
  onRemove,
  ...rest
}: IRemovableBadge): ReactElement => {
  const ref = useRef<View>(null);
  const badgeSizeClassName = large ? badgeSizeClassNames.large : badgeSizeClassNames.regular;
  const styles = twMerge(badgeSizeClassName, className);

  return (
    <BasicBadge ref={ref} {...rest} color={color} large={large} className={styles}>
      <>
        {children}
        <RemoveButton className={removeClassNames[color]} onPress={() => onRemove(ref.current as View)} />
      </>
    </BasicBadge>
  );
};
