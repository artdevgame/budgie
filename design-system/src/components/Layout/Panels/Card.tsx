import { styled } from 'nativewind';
import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export type ICard = PropsWithChildren<{
  bodyClassName?: string;
  className?: string;
  footer?: ReactNode;
  header?: ReactNode;
  isFullWidth?: boolean;
  isGrayBody?: boolean;
}>;

export type ICardFooter = PropsWithChildren<{
  isGray?: boolean;
}>;

export type ICardHeader = {
  children: ReactNode;
};

const StyledView = styled(View);

export const Card = ({
  children,
  bodyClassName,
  className,
  footer,
  header,
  isFullWidth,
  isGrayBody,
}: ICard): ReactElement => {
  const styles = twMerge(
    'bg-white overflow-hidden shadow',
    isFullWidth ? 'sm:rounded-lg' : 'rounded-lg',
    typeof header !== 'undefined' && 'Viewide-y Viewide-gray-200',
    className,
  );

  return (
    <StyledView className={styles}>
      {header}
      <StyledView className={twMerge('px-4 py-5 sm:p-6', isGrayBody && 'bg-gray-50', bodyClassName)}>
        {children}
      </StyledView>
      {footer}
    </StyledView>
  );
};

export const CardFooter = ({ children, isGray }: ICardFooter): ReactElement => (
  <StyledView className={twMerge('border-t border-gray-200 px-4 py-4 sm:px-6', isGray && 'bg-gray-50')}>
    {children}
  </StyledView>
);

export const CardHeader = ({ children }: ICardHeader): ReactElement => (
  <StyledView className="px-4 py-5 sm:px-6">{children}</StyledView>
);
