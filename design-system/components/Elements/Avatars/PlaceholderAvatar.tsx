import React, { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

import { AbstractAvatar } from './AbstractAvatar';
import { IAvatarCommon } from './common';
import { getScaledSize } from './getScaledSize';

export type IPlaceholderAvatar = IAvatarCommon;

export const PlaceholderAvatar = ({ rounded = false, size = 'md', ...props }: IPlaceholderAvatar): ReactElement => {
  const imageScale = getScaledSize({ size, scale: 2, startAt: 4 });

  const placeholderClassNames = twMerge(
    'bg-gray-100 inline-block overflow-hidden',
    rounded ? 'rounded-md' : 'rounded-full',
    `h-${imageScale} w-${imageScale}`,
  );

  return (
    <AbstractAvatar rounded={rounded} size={size} {...props}>
      <span className={placeholderClassNames}>
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    </AbstractAvatar>
  );
};
