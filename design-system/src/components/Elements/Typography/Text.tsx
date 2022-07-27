import { styled } from 'nativewind';
import { PropsWithChildren } from 'react';
import { Text as NativeText, TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface IText extends PropsWithChildren, TextProps {
  className?: string;
}

const StyledText = styled(NativeText);

export const Text = ({ children, className, ...props }: IText) => {
  const styles = twMerge('font-sans', className);
  return (
    <StyledText {...props} className={styles}>
      {children}
    </StyledText>
  );
};
