import { StyledComponent } from 'nativewind';
import { ReactElement } from 'react';
import { Pressable, PressableProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { isPressable } from '@budgie/design-system/common/isPressable';

import { ICell } from './Cell';

export interface IRow extends PressableProps {
  children: ReactElement<ICell>[];
  className?: string;
}

export const Row = ({ children, className, ...rest }: IRow) => (
  <StyledComponent
    {...rest}
    disabled={!isPressable(rest)}
    component={Pressable}
    className={twMerge('flex-row', className)}
  >
    {children}
  </StyledComponent>
);
