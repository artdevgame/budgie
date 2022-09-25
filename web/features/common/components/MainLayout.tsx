import { Menu } from 'features/common/components/Menu/Menu';
import { HStack, useMediaQuery, useTheme, VStack } from 'native-base';
import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';

import { InteractiveMenu } from './Menu/InteractiveMenu';

export const MainLayout = ({ children }: PropsWithChildren) => {
  const [menu, setMenu] = useState<ReactElement>();
  const { breakpoints } = useTheme();

  const [isSmallScreen] = useMediaQuery({
    maxWidth: Number(breakpoints.md),
  });

  useEffect(() => {
    setMenu(isSmallScreen ? <InteractiveMenu /> : <Menu />);
  }, [isSmallScreen]);

  return (
    <HStack minHeight="full">
      {menu}
      <VStack flexGrow="1" bgColor="gray.100">
        {children}
      </VStack>
    </HStack>
  );
};
