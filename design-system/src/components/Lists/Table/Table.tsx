import { styled } from 'nativewind';
import React, { ReactElement } from 'react';
import { View, ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { ITableBody, TableBody } from './TableBody';
import { initialTableContext, ITableContext, TableContext } from './TableContext';
import { ITableHead, TableHead } from './TableHead';

interface ITable extends ViewProps, ITableContext {
  children: ReactElement<ITableBody | ITableHead>[];
  className?: string;
}

const StyledView = styled(View);

export const Table = ({ children, className, columns, condensed, striped, ...rest }: ITable) => {
  const context = { columns, condensed, striped };
  const elements = React.Children.toArray(children);

  const THead = elements.find((child) => (child as ReactElement).type === TableHead);
  const TBody = elements.find((child) => (child as ReactElement).type === TableBody);

  return (
    <TableContext.Provider value={context ?? initialTableContext}>
      <StyledView {...rest} className={twMerge('flex flex-col', className)}>
        <StyledView className="-my-1 overflow-x-auto flex-row px-0.5">
          <StyledView className="inline-block min-w-full py-0.5 align-middle">
            <StyledView className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <StyledView className="min-w-full divide-y divide-gray-300">
                {THead}
                {TBody}
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    </TableContext.Provider>
  );
};
