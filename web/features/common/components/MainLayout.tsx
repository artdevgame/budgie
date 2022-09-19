import { Menu } from 'features/common/components/Menu/Menu';
import { HStack, VStack } from 'native-base';
import { PropsWithChildren } from 'react';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <HStack minHeight="full">
      <Menu />
      <VStack flexGrow="1" bgColor="gray.100">
        {children}
      </VStack>
    </HStack>
  );
};
