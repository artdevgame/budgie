import React from 'react';

type TColumnId = string;

export interface ITableContext {
  columns: Record<TColumnId, { width: string }>;
  condensed?: boolean;
  striped?: boolean;
}

export const initialTableContext: ITableContext = {
  columns: {},
  condensed: false,
  striped: false,
};

export const TableContext = React.createContext<ITableContext>(initialTableContext);

export const useTableContext = () => {
  const context = React.useContext(TableContext);
  if (context === undefined) {
    throw new Error('useTableContext must be used within a <Table />');
  }
  return context;
};
