import { StyledComponent } from 'nativewind';
import React, { ReactElement } from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { AbstractAvatar } from './AbstractAvatar';
import { IAvatarCommon, sizeClassMap } from './common';
import { getScaledSize } from './getScaledSize';

export interface IImageAvatar extends IAvatarCommon {
  imageUrl: string;
}

export const ImageAvatar = ({
  imageUrl,
  notificationPosition = 'none',
  rounded = false,
  size = 'md',
  ...rest
}: IImageAvatar): ReactElement => {
  const imageClassName = twMerge(
    notificationPosition === 'none' && 'inline-block',
    rounded ? 'rounded-md' : 'rounded-full',
    sizeClassMap[size],
  );

  const avatarProps = {
    ...rest,
    notificationPosition,
    rounded,
    size,
  };

  return (
    <AbstractAvatar {...avatarProps}>
      <StyledComponent component={Image} className={imageClassName} source={imageUrl as ImageSourcePropType} />
    </AbstractAvatar>
  );
};
