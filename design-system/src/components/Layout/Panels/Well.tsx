import { styled } from 'nativewind';
import React, { PropsWithChildren, ReactElement } from 'react';
import { View as NativeView } from 'react-native';
import { twMerge } from 'tailwind-merge';

export type IWell = PropsWithChildren<{
  isFullWidth?: boolean;
  isGray?: boolean;
}>;

const View = styled(NativeView);

export const Well = ({ children, isFullWidth, isGray }: IWell): ReactElement => (
  <View
    className={twMerge(
      'overflow-hidden',
      isFullWidth ? 'sm:rounded-lg' : 'rounded-lg',
      isGray ? 'bg-gray-200' : 'bg-gray-50',
    )}
  >
    <View className="px-4 py-5 sm:p-6">{children}</View>
  </View>
);
