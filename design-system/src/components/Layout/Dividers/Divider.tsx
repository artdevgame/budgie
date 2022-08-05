import { styled } from 'nativewind';
import React, { cloneElement, ReactElement } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { TSize } from '@budgie/design-system/common/size';

import { TDividerPlacement } from './common';

type TLabelSize = Extract<TSize, 'md' | 'lg'>;

interface IDividerBody {
  children: ReactElement;
  placement: TDividerPlacement;
  size: TLabelSize;
}

export interface IDivider {
  children: ReactElement;
  placement?: TDividerPlacement;
  size?: TLabelSize;
}

const StyledView = styled(View);

const placementClassNames = (size: TLabelSize) => ({
  'justify-center': size === 'md' ? 'px-2' : 'px-3',
  'justify-between': undefined,
  'justify-start': size === 'md' ? 'pr-2' : 'pr-3',
});

const DividerBody = ({ children, placement = 'justify-center', size = 'md' }: IDividerBody) => {
  return cloneElement(children, {
    className: twMerge((children as ReactElement).props.className, placementClassNames(size)[placement]),
  });
};

export const Divider = ({ children, placement = 'justify-center', size = 'md' }: IDivider): ReactElement => (
  <StyledView className="relative">
    <StyledView className="absolute inset-0 flex flex-row items-center" aria-hidden="true">
      <StyledView className="w-full border-t border-gray-300"></StyledView>
    </StyledView>
    <StyledView
      className={twMerge('relative flex flex-row', placement, placement === 'justify-between' && 'items-center')}
    >
      <DividerBody placement={placement} size={size}>
        {children}
      </DividerBody>
    </StyledView>
  </StyledView>
);
