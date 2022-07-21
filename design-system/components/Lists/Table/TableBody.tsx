import { StyledComponent } from 'nativewind';
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { IRow } from './Row';
import { useTableContext } from './TableContext';

export interface ITableBody {
  children: ReactElement<IRow> | ReactElement<IRow>[];
}

export const TableBody = ({ children }: ITableBody) => {
  const { striped } = useTableContext();

  const rows = React.Children.map(children, (row, index) => {
    if (!React.isValidElement(row) || !striped) {
      return row;
    }
    return React.cloneElement(row, {
      ...row.props,
      className: twMerge(row.props.className, striped && index % 2 ? 'bg-gray-50' : ''),
    });
  });

  return (
    <StyledComponent component={View} className="divide-y divide-gray-200 bg-white">
      {rows}
    </StyledComponent>
  );
};
