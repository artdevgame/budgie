import { StyledComponent } from 'nativewind';
import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { IRow } from './Row';

export interface ITableHead {
  children: ReactElement<IRow> | ReactElement<IRow>[];
}

export const TableHead = ({ children }: ITableHead) => (
  <StyledComponent component={View} className="bg-gray-50">
    {children}
  </StyledComponent>
);
