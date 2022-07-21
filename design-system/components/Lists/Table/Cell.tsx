import { StyledComponent } from 'nativewind';
import React, { ReactNode } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { isPressable } from '@budgie/design-system/common/isPressable';

import { useTableContext } from './TableContext';

export interface ICell extends PressableProps {
  children: ReactNode;
  className?: string;
  columnId?: string;
  variant: 'td' | 'th';
}

const commonStyles = 'text-ellipsis overflow-hidden whitespace-nowrap px-2 grow';

export const Cell = ({ children, className, columnId, variant, ...rest }: ICell) => {
  const { columns, condensed } = useTableContext();
  const width = columnId && columns[columnId]?.width;

  const spacingStyles = condensed ? 'py-2' : 'py-3.5';

  const styles =
    variant === 'th'
      ? twMerge(commonStyles, 'py-3.5 text-left text-sm font-semibold text-gray-900', className)
      : twMerge(commonStyles, spacingStyles, 'text-sm text-gray-500', className);

  if (!React.isValidElement(children)) {
    return (
      <StyledComponent {...rest} disabled={!isPressable(rest)} component={Pressable} style={{ width }}>
        <StyledComponent component={Text} className={styles}>
          {children}
        </StyledComponent>
      </StyledComponent>
    );
  }

  return (
    <StyledComponent {...rest} disabled={!isPressable(rest)} component={Pressable} className={styles}>
      {children}
    </StyledComponent>
  );
};
