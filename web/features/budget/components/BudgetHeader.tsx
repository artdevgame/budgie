import { DateNavigator } from 'features/common/components/DateNavigator';
import { HamburgerButton } from 'features/common/components/Menu/HamburgerButton';
import { Box, Heading, HStack, useMediaQuery, useTheme, VStack } from 'native-base';
import { ReactElement, useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export const BudgetHeader = () => {
  const [header, setHeader] = useState<ReactElement>(null);
  const [x, setX] = useState(0);

  const { breakpoints } = useTheme();

  const [isSmallScreen] = useMediaQuery({
    maxWidth: Number(breakpoints.md),
  });

  const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { width } = nativeEvent.layout;
    setX(Number(`-${width / 2}`));
  };

  useEffect(() => {
    if (isSmallScreen) {
      setHeader(
        <VStack alignItems="center" bgColor="muted.50">
          <Box position="absolute" left="4" top="2">
            <HamburgerButton />
          </Box>
          <VStack alignItems="center" p="4">
            <Heading fontSize="2xl" color="warmGray.700">
              £0.00
            </Heading>
            <Heading fontSize="xs" color="warmGray.400">
              To be budgeted
            </Heading>
          </VStack>
          <Box borderTopWidth="5" borderTopColor="gray.100" width="full" alignItems="center">
            <DateNavigator />
          </Box>
        </VStack>,
      );
    } else {
      setHeader(
        <HStack minH="24" p="4" alignItems="center" bgColor="muted.50">
          <Box width="1/2">
            <DateNavigator />
          </Box>
          <Box style={{ transform: [{ translateX: x }] }}>
            <VStack alignItems="center" onLayout={handleLayout}>
              <Heading fontSize="2xl" color="warmGray.700">
                £0.00
              </Heading>
              <Heading fontSize="xs" color="warmGray.400">
                To be budgeted
              </Heading>
            </VStack>
          </Box>
        </HStack>,
      );
    }
  }, [isSmallScreen]);

  return header;
};
