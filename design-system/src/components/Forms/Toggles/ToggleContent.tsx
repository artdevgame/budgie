import { styled } from 'nativewind';
import { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Switch } from '@headlessui/react';

export type TToggleContent = { className?: string } & (
  | {
      placement: 'left';
      children: ILabel['children'];
    }
  | {
      placement: 'right';
      children: [ReactElement<ILabel>, ReactElement<IDescription> | undefined];
    }
);

interface IDescription {
  className?: string;
  children: ReactNode;
}

interface ILabel {
  className?: string;
  children: ReactNode;
  passive?: boolean;
}

const StyledView = styled(View);

export const ToggleContent = ({ children, placement = 'right' }: TToggleContent) => {
  if (placement === 'left') {
    return <StyledView className="flex-grow flex-shrink flex flex-col">{children}</StyledView>;
  }
  return <Label className="ml-3">{children}</Label>;
};

const Label = ({ children, className, ...rest }: ILabel) => (
  <Switch.Label {...rest} className={twMerge('text-sm font-medium text-gray-900', className)}>
    {children}
  </Switch.Label>
);

const Description = ({ children, className }: IDescription) => (
  <Switch.Description className={twMerge('text-sm text-gray-500', className)}>{children}</Switch.Description>
);

export default {
  Description,
  Label,
};
