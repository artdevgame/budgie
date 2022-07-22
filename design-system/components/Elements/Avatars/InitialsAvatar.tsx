import { styled } from 'nativewind';
import React, { ReactElement, useMemo } from 'react';
import { Text as NativeText, View as NativeView } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { sizeMap } from '@budgie/design-system/common/size';

import { AbstractAvatar } from './AbstractAvatar';
import { IAvatarCommon } from './common';
import { getScaledSize } from './getScaledSize';

export interface IInitialsAvatar extends IAvatarCommon {
  initials: string;
}

const Text = styled(NativeText);
const View = styled(NativeView);

export const InitialsAvatar = ({ initials, size = 'md', ...props }: IInitialsAvatar): ReactElement => {
  const imageScale = getScaledSize({ size, scale: 2, startAt: 4 });

  const initialsClassName = twMerge(
    'inline-flex items-center justify-center bg-gray-500',
    props.rounded ? 'rounded-md' : 'rounded-full',
    `h-${imageScale} w-${imageScale}`,
  );

  const fontSizeClassName = twMerge(
    size === 'xs' && 'text-xs',
    size === 'sm' && 'text-sm',
    size === 'lg' && 'text-lg',
    sizeMap[size] >= 5 && 'text-xl',
    'font-medium leading-none text-white',
  );

  return (
    <AbstractAvatar size={size} {...props}>
      <View className={initialsClassName}>
        <Text className={fontSizeClassName}>{initials}</Text>
      </View>
    </AbstractAvatar>
  );
};
