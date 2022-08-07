import React, { ReactNode } from 'react';

import { CheckboxGroupState, useCheckboxGroupState } from '@react-stately/checkbox';

interface ICheckboxGroup {
  children: ReactNode;
  onChange(selected: string[]): void;
  value: string[];
}

export const CheckboxGroupContext = React.createContext<CheckboxGroupState | null>(null);

export const useCheckboxGroupContext = () => {
  const context = React.useContext(CheckboxGroupContext);
  if (context === null) {
    throw new Error('useCheckboxGroupContext must be used within a CheckboxGroupContext');
  }
  return context;
};

export function CheckboxGroupProvider({ children, onChange, value }: ICheckboxGroup) {
  const state = useCheckboxGroupState({ onChange, value });

  return <CheckboxGroupContext.Provider value={state}>{children}</CheckboxGroupContext.Provider>;
}
