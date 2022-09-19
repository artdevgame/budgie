import { DateNavigator } from 'features/common/components/DateNavigator';
import { Box, Heading, Stack, VStack } from 'native-base';
import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export const BudgetHeader = () => {
  const [x, setX] = useState(0);

  const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { width } = nativeEvent.layout;
    setX(Number(`-${width / 2}`));
  };

  return (
    <Stack minH="24" p="4" direction="row" alignItems="center" bgColor="muted.50">
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
    </Stack>
  );
};
