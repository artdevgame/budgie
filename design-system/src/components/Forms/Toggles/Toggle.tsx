import { styled, StyledComponent } from 'nativewind';
import React, { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Switch } from '@headlessui/react';

import { TToggleContent } from './ToggleContent';

interface IToggle {
  enabled: boolean;
  handleClassName?: string;
  iconDisabled?: ReactElement;
  iconEnabled?: ReactElement;
  onChange(enabled: boolean): void;
  trackClassName?: string;
  variant?: keyof typeof variants;
}

interface IWrappedToggle extends IToggle {
  children?: ReactElement<TToggleContent>;
}

const StyledView = styled(View);

const variants = {
  default: {
    handle:
      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
  },
  short: {
    handle:
      'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200',
  },
};

const Toggle = ({
  enabled,
  handleClassName,
  iconDisabled,
  iconEnabled,
  onChange,
  trackClassName,
  variant = 'default',
}: IToggle) => {
  const styles = variants[variant];

  const trackColor = enabled ? 'bg-indigo-600' : 'bg-gray-200';

  const className =
    variant === 'short'
      ? 'flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      : twMerge(
          trackColor,
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
          trackClassName,
        );

  const handleChange = () => {
    onChange(!enabled);
  };

  return (
    <Switch checked={enabled} onChange={handleChange} className={className}>
      {variant === 'short' && (
        <>
          <StyledView aria-hidden="true" className="pointer-events-none absolute bg-white w-full h-full rounded-md" />
          <StyledView
            aria-hidden="true"
            className={twMerge(
              enabled ? 'bg-indigo-600' : 'bg-gray-200',
              'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200',
              trackClassName,
            )}
          />
        </>
      )}
      <StyledView
        aria-hidden="true"
        className={twMerge(enabled ? 'translate-x-5' : 'translate-x-0', styles.handle, handleClassName)}
      >
        {iconDisabled && (
          <span
            className={twMerge(
              enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            {React.cloneElement(iconDisabled, {
              className: twMerge('h-3 w-3 text-gray-400', iconDisabled.props.className),
            })}
          </span>
        )}
        {iconEnabled && (
          <span
            className={twMerge(
              enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            {React.cloneElement(iconEnabled, {
              className: twMerge('h-3 w-3 text-indigo-600', iconEnabled.props.className),
            })}
          </span>
        )}
      </StyledView>
    </Switch>
  );
};

const WrappedToggle = ({ children, ...toggleProps }: IWrappedToggle) => {
  if (!React.isValidElement(children)) {
    return <Toggle {...toggleProps} />;
  }

  const { props } = children;

  if (props.placement === 'left') {
    return (
      <Switch.Group>
        <StyledView className={twMerge('flex flex-row items-center justify-between gap-2', props.className)}>
          {children} <Toggle {...toggleProps} />
        </StyledView>
      </Switch.Group>
    );
  }

  return (
    <Switch.Group>
      <StyledView className={twMerge('flex flex-row items-center', props.className)}>
        <Toggle {...toggleProps} />
        {children}
      </StyledView>
    </Switch.Group>
  );
};

export { WrappedToggle as Toggle };
