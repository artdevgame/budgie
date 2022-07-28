import { styled } from 'nativewind';
import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { View as NativeView } from 'react-native';
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

const View = styled(NativeView);

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
    <View className={styles}>
      {header}
      <View className={twMerge('px-4 py-5 sm:p-6', isGrayBody && 'bg-gray-50', bodyClassName)}>{children}</View>
      {footer}
    </View>
  );
};

export const CardFooter = ({ children, isGray }: ICardFooter): ReactElement => (
  <View className={twMerge('border-t border-gray-200 px-4 py-4 sm:px-6', isGray && 'bg-gray-50')}>{children}</View>
);

export const CardHeader = ({ children }: ICardHeader): ReactElement => (
  <View className="px-4 py-5 sm:px-6">{children}</View>
);
