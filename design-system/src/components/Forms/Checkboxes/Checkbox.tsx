import { styled } from 'nativewind';
import React, { ReactNode, useRef } from 'react';
import { Pressable, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { CheckIcon } from '@heroicons/react/solid';
import { useCheckboxGroupItem } from '@react-native-aria/checkbox';

import { useCheckboxGroupContext } from './CheckboxGroup';

export interface ICheckbox {
  children?: ReactNode;
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  placement?: 'left' | 'right';
  value: string;
}

const StyledView = styled(View);

function Checkbox({ checked, children, className, disabled = false, placement = 'left' }: ICheckbox) {
  const iconStyles = twMerge(
    'h-4 w-4 focus:ring-indigo-500 border-gray-300 border rounded',
    checked && 'bg-indigo-600 text-white border-transparent',
    disabled && 'bg-gray-300',
    className,
  );

  const icon = checked ? <CheckIcon className={iconStyles} /> : <StyledView className={iconStyles} />;

  return placement === 'left' ? (
    <StyledView className="relative flex flex-row">
      <StyledView className="flex items-center border-t-2 border-transparent">{icon}</StyledView>
      <StyledView className="ml-3 shrink">{children}</StyledView>
    </StyledView>
  ) : (
    <StyledView className="divide-y divide-gray-200">
      <StyledView className="relative flex flex-row py-4">
        <StyledView className="min-w-0 flex-1 text-sm">{children}</StyledView>
        <StyledView className="ml-3 flex items-center border-t-2 border-transparent">{icon}</StyledView>
      </StyledView>
    </StyledView>
  );
}

const WrappedCheckbox = (props: ICheckbox) => {
  const groupState = useCheckboxGroupContext();
  const inputRef = useRef<ICheckbox>(null);

  const { inputProps } = useCheckboxGroupItem({ ...props, isDisabled: props.disabled }, groupState, inputRef);

  return (
    <Pressable {...inputProps}>
      <Checkbox {...props} checked={inputProps.checked} />
    </Pressable>
  );
};

export { WrappedCheckbox as Checkbox };
