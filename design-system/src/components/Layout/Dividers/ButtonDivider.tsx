import { StyledComponent } from 'nativewind';
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { IButton } from '../../Elements/Buttons/Button';
import { IIconButton } from '../../Elements/Buttons/IconButton';
import { Text } from '../../Elements/Typography/Text';
import { Divider } from './Divider';

export interface IButtonDivider {
  children: ReactElement<IButton> | ReactElement<IIconButton>;
  label?: string;
}

export const ButtonDivider = ({ children, label }: IButtonDivider): ReactElement => {
  const placement = label ? 'justify-between' : 'justify-center';
  const size = label ? 'lg' : 'md';

  return (
    <Divider placement={placement} size={size}>
      <>
        <StyledComponent component={View} className={twMerge('bg-white', label && 'pr-3')}>
          <Text className="text-lg font-medium text-gray-900">{label}</Text>
        </StyledComponent>
        {children}
      </>
    </Divider>
  );
};
