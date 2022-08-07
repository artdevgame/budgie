import { styled } from 'nativewind';
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Checkbox, ICheckbox } from './Checkbox';
import { CheckboxGroupProvider } from './CheckboxGroup';

interface ICheckboxList {
  checkboxPlacement?: 'left' | 'right';
  children: ReactElement<ICheckbox>[];
  className?: string;
  onChange(selected: string[]): void;
  selected: string[];
}

const StyledView = styled(View);

export const CheckboxList = ({
  checkboxPlacement = 'left',
  children,
  className,
  onChange,
  selected,
}: ICheckboxList) => {
  const content = React.Children.map(children, (child) => {
    if (child.type !== Checkbox) {
      return child;
    }
    return React.cloneElement(child, { placement: checkboxPlacement });
  });
  return checkboxPlacement === 'left' ? (
    <CheckboxGroupProvider onChange={onChange} value={selected}>
      <StyledView className={twMerge('space-y-5', className)}>{content}</StyledView>
    </CheckboxGroupProvider>
  ) : (
    <CheckboxGroupProvider onChange={onChange} value={selected}>
      <StyledView className={twMerge('border-t border-b border-gray-200 divide-y divide-gray-200', className)}>
        {content}
      </StyledView>
    </CheckboxGroupProvider>
  );
};
