import { Menu } from 'features/common/components/Menu/Menu';
import { HStack, useMediaQuery, useTheme, VStack } from 'native-base';
import { PropsWithChildren } from 'react';

import { InteractiveMenu } from './Menu/InteractiveMenu';

export const MainLayout = ({ children }: PropsWithChildren) => {
  const { breakpoints } = useTheme();

  const [isSmallScreen] = useMediaQuery({
    maxWidth: Number(breakpoints.md),
  });

  return (
    <HStack minHeight="full">
      {isSmallScreen ? <InteractiveMenu /> : <Menu />}
      <VStack flexGrow="1" bgColor="gray.100">
        {children}
      </VStack>
    </HStack>
  );
};
