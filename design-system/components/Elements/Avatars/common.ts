import { ReactElement } from 'react';

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
}

export const notificationPosition = {
  bottom: 'bottom',
  none: 'none',
  top: 'top',
};

export type TNotificationPosition = keyof typeof notificationPosition;
