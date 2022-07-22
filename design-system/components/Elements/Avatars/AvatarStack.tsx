import { styled, StyledComponent } from 'nativewind';
import React, { cloneElement, ReactElement } from 'react';
import { View as NativeView } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { sizeMap, TSize } from '@budgie/design-system/common/size';

import { TAnyAvatar } from './common';

type TStackOrder = 'bottom-to-top' | 'top-to-bottom';

export interface IAvatarStack {
  avatars: TAnyAvatar[];
  size: Exclude<TSize, '2xl' | '3xl' | '4xl'>;
  stackOrder: TStackOrder;
}

const View = styled(NativeView);

export const AvatarStack = ({
  avatars = [],
  size = 'md',
  stackOrder = 'bottom-to-top',
}: IAvatarStack): ReactElement => {
  const stackClassName = twMerge(
    'flex flex-row overflow-hidden',
    stackOrder === 'bottom-to-top' && (sizeMap[size] > 1 ? '-space-x-2' : '-space-x-1'),
    stackOrder === 'top-to-bottom' && 'flex-row-reverse',
  );

  const orderedAvatars: IAvatarStack['avatars'] = [];
  const totalAvatars = avatars.length;

  for (let avatarIdx = 0; avatarIdx < totalAvatars; avatarIdx++) {
    const avatar = avatars[avatarIdx];
    orderedAvatars.push(
      cloneElement(avatar, {
        size,
        className: twMerge(
          avatar.props.className,
          'ring-2 ring-white',
          avatarIdx > 0 && (sizeMap[size] > 1 ? '-ml-2' : '-ml-1'),
        ),
      }) as TAnyAvatar,
    );
  }

  if (stackOrder === 'top-to-bottom') {
    orderedAvatars.reverse();
  }

  return (
    <View className="inline-flex">
      <View className={stackClassName}>{orderedAvatars}</View>
    </View>
  );
};
