import { StyledComponent } from 'nativewind';
import React, { cloneElement, ReactElement } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { sizeMap, TSize } from '@budgie/design-system/common/size';

import { TAnyAvatar } from './common';

type TStackOrder = 'bottom-to-top' | 'top-to-bottom';

export interface IAvatarStack {
  avatars: TAnyAvatar[];
  size: Exclude<TSize, '2xl' | '3xl' | '4xl'>;
  stackOrder: TStackOrder;
}

export const AvatarStack = ({
  avatars = [],
  size = 'md',
  stackOrder = 'bottom-to-top',
}: IAvatarStack): ReactElement => {
  const stackClassName = twMerge(
    'flex overflow-hidden',
    sizeMap[size] > 1 ? '-space-x-2' : '-space-x-1',
    stackOrder === 'top-to-bottom' && 'relative z-0',
  );

  const orderedAvatars: IAvatarStack['avatars'] = [];
  const totalAvatars = avatars.length;

  for (let avatarIdx = 0; avatarIdx < totalAvatars; avatarIdx++) {
    const avatar = avatars[avatarIdx];
    const addClassNames = ['ring-2', 'ring-white'];

    if (stackOrder === 'top-to-bottom') {
      const zIndex = avatarIdx === 0 ? (totalAvatars + 1) * 10 : Math.ceil(totalAvatars - avatarIdx) * 10;
      addClassNames.push('relative', `z-${zIndex}`);
    }

    orderedAvatars.push(
      cloneElement(avatar, {
        size,
        className: twMerge(avatar.props.className, addClassNames.join(' ')),
      }) as TAnyAvatar,
    );
  }

  return (
    <StyledComponent component={View} className={stackClassName}>
      {orderedAvatars}
    </StyledComponent>
  );
};
