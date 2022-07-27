import { StyledComponent } from 'nativewind';
import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { TSize } from '@budgie/design-system/common/size';

import { Text } from '../../Elements/Typography/Text';
import { Divider, IDivider } from './Divider';

export type LabelDividerSize = Extract<TSize, 'md' | 'lg'>;

export type LabelDividerProps = Pick<IDivider, Exclude<keyof IDivider, 'children'>> & {
  children: string;
  size: LabelDividerSize;
};

const sizeClassNames = {
  md: 'bg-white text-sm text-gray-500',
  lg: 'bg-white text-lg font-medium text-gray-900',
};

export const LabelDivider = ({ children, size = 'md', ...props }: LabelDividerProps): ReactElement => (
  <Divider size={size} {...props}>
    <Text className={sizeClassNames[size]}>{children}</Text>
  </Divider>
);
