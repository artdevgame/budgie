import { StyledComponent } from 'nativewind';
import React, { cloneElement, ReactElement } from 'react';
import { View } from 'react-native';

import { Divider, IDivider } from './Divider';

export type IconDividerProps = Pick<IDivider, Exclude<keyof IDivider, 'children'>> & {
  children: ReactElement;
};

export const IconDivider = ({ children, ...props }: IconDividerProps): ReactElement => {
  const icon = cloneElement(children, {
    className: 'h-5 w-5',
    fill: 'text-gray-500',
    viewBox: '0 0 20 20',
  });

  return (
    <Divider {...props}>
      <StyledComponent component={View} className="bg-white text-gray-500">
        {icon}
      </StyledComponent>
    </Divider>
  );
};
