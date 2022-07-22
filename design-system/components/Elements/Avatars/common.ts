import { ReactElement } from 'react';
import { ViewProps } from 'react-native';

import { TColor } from '@budgie/design-system/common/color';
import { TSize } from '@budgie/design-system/common/size';

import { IImageAvatar } from './ImageAvatar';
import { IInitialsAvatar } from './InitialsAvatar';
import { IPlaceholderAvatar } from './PlaceholderAvatar';

export type TAnyAvatar = ReactElement<IImageAvatar> | ReactElement<IInitialsAvatar> | ReactElement<IPlaceholderAvatar>;

export interface IAvatarCommon {
  className?: string;
  notificationColor?: TColor;
  notificationPosition?: TNotificationPosition;
  rounded?: boolean;
  size?: Exclude<TSize, '2xl' | '3xl' | '4xl'>;
  style?: ViewProps['style'];
}

export const notificationPosition = {
  bottom: 'bottom',
  none: 'none',
  top: 'top',
};

export type TNotificationPosition = keyof typeof notificationPosition;

export const sizeClassMap = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-14 w-14',
};
