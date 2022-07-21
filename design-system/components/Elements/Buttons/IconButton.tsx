import React, { cloneElement, ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button, IButton } from './Button';

export interface IIconButton extends IButton {
  icon: ReactElement;
  iconPosition?: IIconPosition;
  size?: Exclude<IButton['size'], 'xs'>;
}

export type IIconPosition = 'before' | 'after';

const classNames = {
  sm: {
    leadingIconClassName: '-ml-0.5 mr-2 h-4 w-4',
    trailingIconClassName: 'ml-2 -mr-0.5 h-4 w-4',
  },
  md: {
    leadingIconClassName: '-ml-1 mr-2 h-5 w-5',
    trailingIconClassName: 'ml-2 -mr-1 h-5 w-5',
  },
  lg: {
    leadingIconClassName: '-ml-1 mr-3 h-5 w-5',
    trailingIconClassName: 'ml-3 -mr-1 h-5 w-5',
  },
  '2xl': {
    leadingIconClassName: '-ml-1 mr-3 h-5 w-5',
    trailingIconClassName: 'ml-3 -mr-1 h-5 w-5',
  },
};

export const IconButton = ({
  children,
  className,
  icon,
  iconPosition = 'before',
  size = 'md',
  ...rest
}: IIconButton): ReactElement | null => {
  if (!classNames[size]) {
    console.error('IconButton size not supported:', size);
    return null;
  }

  const { leadingIconClassName, trailingIconClassName } = classNames[size];

  let iconClassName = iconPosition === 'before' ? leadingIconClassName : trailingIconClassName;

  if (typeof children === 'undefined') {
    iconClassName = twMerge(iconClassName, 'mx-0');
  }

  const Icon = cloneElement(icon as ReactElement, {
    className: twMerge(icon.props.className, iconClassName),
  });

  const content =
    iconPosition === 'before' ? (
      <>
        {Icon}
        {children}
      </>
    ) : (
      <>
        {children}
        {Icon}
      </>
    );

  return (
    <Button
      {...rest}
      size={size as IButton['size']}
      className={twMerge('inline-flex flex-row items-center', className)}
    >
      {content}
    </Button>
  );
};
