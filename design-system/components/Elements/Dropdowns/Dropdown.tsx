import { StyledComponent } from 'nativewind';
import React, { Children, cloneElement, ReactElement, ReactNode, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Transition } from '@headlessui/react';
import { ChevronDownIcon, DotsVerticalIcon } from '@heroicons/react/solid';
import { usePress } from '@react-native-aria/interactions';

import { IconButton, IIconButton } from '../Buttons/IconButton';

export type TActuatorType = 'button' | 'minimal';

export interface IDropdownItemCallback {
  item: ReactNode;
  label: string;
}

export interface IDropdownHeader {
  children: ReactNode;
}

export interface IDropdownItem {
  icon?: ReactElement;
  label: string;
  onPress({ item, label }: IDropdownItemCallback): void;
}

export interface IDropdownGroup {
  children: ReactElement<IDropdownItem> | ReactElement<IDropdownItem>[];
}

export interface IDropdown {
  actuator?:
    | {
        className?: string;
        label?: string;
        size?: IIconButton['size'];
        type: 'button';
      }
    | {
        className?: string;
        type: 'minimal';
      };
  children: ReactElement<IDropdownGroup> | ReactElement<IDropdownGroup>[];
  header?: ReactElement<IDropdownHeader>;
}

export const DropdownGroup = ({ children }: IDropdownGroup): ReactElement => (
  <StyledComponent component={View} className="py-1">
    {children}
  </StyledComponent>
);

export const DropdownHeader = ({ children }: IDropdownHeader): ReactElement | null => {
  if (typeof children !== 'undefined')
    return (
      <StyledComponent component={View} className="px-4 py-3">
        {children}
      </StyledComponent>
    );
  return null;
};

export const DropdownItem = ({ icon, label, onPress }: IDropdownItem): ReactElement => {
  const { pressProps } = usePress({
    onPress: ({ nativeEvent: { target } }) => onPress({ item: target, label }),
  });

  const className = twMerge(
    'px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900',
    typeof icon !== 'undefined' ? 'group flex items-center' : 'block',
  );

  const content =
    typeof icon !== 'undefined' ? (
      <StyledComponent component={View} className="flex flex-row justify-start items-center self-start">
        {cloneElement(icon, { className: 'mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500' })}
        <Text>{label}</Text>
      </StyledComponent>
    ) : (
      <StyledComponent component={Text} className="self-start">
        {label}
      </StyledComponent>
    );

  return (
    <StyledComponent component={Pressable} {...pressProps} className={className} accessibilityRole="menuitem">
      {content}
    </StyledComponent>
  );
};

export const Dropdown = ({ children, actuator = { type: 'button', size: 'md' }, header }: IDropdown): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const menuClassName = twMerge(
    'origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5',
    Children.count(children) > 0 && 'divide-y divide-gray-100',
  );

  const actuatorClassName = twMerge('flex flex-row', actuator.className);

  const minimalClassName = twMerge(
    'rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-50 bg-none',
    actuator.className,
  );

  const button =
    actuator.type === 'button' ? (
      <IconButton
        className={actuatorClassName}
        icon={<ChevronDownIcon />}
        iconPosition="after"
        onPress={() => setIsOpen(!isOpen)}
        size={actuator.size}
        variant="tertiary"
      >
        {actuator.label}
      </IconButton>
    ) : (
      <IconButton
        className={minimalClassName}
        icon={<DotsVerticalIcon className="h-5 w-5" />}
        onPress={() => setIsOpen(!isOpen)}
        variant="tertiary"
      />
    );

  return (
    <StyledComponent component={View} className="relative inline-block text-left">
      {button}

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <StyledComponent
            component={View}
            ref={ref}
            className={menuClassName}
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            accessibilityRole="menu"
          >
            {header}
            {children}
          </StyledComponent>
        )}
      </Transition>
    </StyledComponent>
  );
};
