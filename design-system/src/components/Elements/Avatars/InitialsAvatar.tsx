import { styled } from 'nativewind';
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { sizeMap } from '@budgie/design-system/common/size';

import { Text } from '../Typography/Text';
import { AbstractAvatar } from './AbstractAvatar';
import { IAvatarCommon, sizeClassMap } from './common';

export interface IInitialsAvatar extends IAvatarCommon {
  initials: string;
}

const StyledView = styled(View);

export const InitialsAvatar = ({ initials, size = 'md', ...props }: IInitialsAvatar): ReactElement => {
  const initialsClassName = twMerge(
    'inline-flex items-center justify-center bg-gray-500',
    props.rounded ? 'rounded-md' : 'rounded-full',
    sizeClassMap[size],
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
      <StyledView className={initialsClassName}>
        <Text className={fontSizeClassName}>{initials}</Text>
      </StyledView>
    </AbstractAvatar>
  );
};
