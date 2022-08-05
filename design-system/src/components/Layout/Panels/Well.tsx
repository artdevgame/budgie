import { styled } from 'nativewind';
import React, { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export type IWell = PropsWithChildren<{
  isFullWidth?: boolean;
  isGray?: boolean;
}>;

const StyledView = styled(View);

export const Well = ({ children, isFullWidth, isGray }: IWell): ReactElement => (
  <StyledView
    className={twMerge(
      'overflow-hidden',
      isFullWidth ? 'sm:rounded-lg' : 'rounded-lg',
      isGray ? 'bg-gray-200' : 'bg-gray-50',
    )}
  >
    <StyledView className="px-4 py-5 sm:p-6">{children}</StyledView>
  </StyledView>
);
