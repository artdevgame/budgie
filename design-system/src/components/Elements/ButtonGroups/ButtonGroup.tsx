import { StyledComponent } from 'nativewind';
import React, { cloneElement, ReactElement } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { IButton, IButtonSize } from '../Buttons/Button';
import { IIconButton } from '../Buttons/IconButton';
import { Dropdown, IDropdown } from '../Dropdowns/Dropdown';

export interface IButtonGroup {
  className?: string;
  children: (ReactElement<IButton> | ReactElement<IIconButton> | ReactElement<IDropdown>)[];
  size: IButtonSize;
}

export const ButtonGroup = ({ children = [], className, size = 'md' }: IButtonGroup): ReactElement => {
  const totalComponents = children.length - 1;

  const groupedButtons = children.map((component: ReactElement, buttonIdx: number) => {
    const className = twMerge(
      'text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-none relative focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:z-10 focus:ring-offset-0',
      buttonIdx > 0 && '-ml-px',
      buttonIdx === 0 && 'rounded-l-md',
      buttonIdx === totalComponents && 'rounded-r-md',
      component.props.className,
    );

    if ((component as ReactElement).type === Dropdown) {
      return cloneElement(component, {
        actuator: { type: 'button', className, size },
        key: `grouped-dropdown-${buttonIdx}`,
      });
    }

    return cloneElement(component, {
      variant: 'tertiary',
      className,
      key: `grouped-button-${buttonIdx}`,
      rounded: false,
      size,
    });
  });

  return (
    <StyledComponent
      component={View}
      className={twMerge('flex flex-row relative z-0 inline-flex shadow-sm rounded-md', className)}
    >
      {groupedButtons}
    </StyledComponent>
  );
};
