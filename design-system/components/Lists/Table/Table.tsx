import { styled } from 'nativewind';
import React, { ReactElement } from 'react';
import { View as NativeView, ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { ITableBody, TableBody } from './TableBody';
import { initialTableContext, ITableContext, TableContext } from './TableContext';
import { ITableHead, TableHead } from './TableHead';

interface ITable extends ViewProps, ITableContext {
  children: ReactElement<ITableBody | ITableHead>[];
  className?: string;
}

const View = styled(NativeView);

export const Table = ({ children, className, columns, condensed, striped, ...rest }: ITable) => {
  const context = { columns, condensed, striped };
  const elements = React.Children.toArray(children);

  const THead = elements.find((child) => (child as ReactElement).type === TableHead);
  const TBody = elements.find((child) => (child as ReactElement).type === TableBody);

  return (
    <TableContext.Provider value={context ?? initialTableContext}>
      <View {...rest} className={twMerge('flex flex-col', className)}>
        <View className="-my-1 overflow-x-auto flex-row px-0.5">
          <View className="inline-block min-w-full py-0.5 align-middle">
            <View className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <View className="min-w-full divide-y divide-gray-300">
                {THead}
                {TBody}
              </View>
            </View>
          </View>
        </View>
      </View>
    </TableContext.Provider>
  );
};
