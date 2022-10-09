import { DateTime } from 'luxon';
import { ChevronLeftIcon, ChevronRightIcon, HStack, IconButton, Text } from 'native-base';
import { useState } from 'react';

export const DateNavigator = () => {
  const [activeDate, setActiveDate] = useState(DateTime.now());
  return (
    <HStack alignItems="center" space="0.5">
      <IconButton
        size="lg"
        colorScheme="muted"
        icon={<ChevronLeftIcon color="warmGray.700" />}
        onPress={() => setActiveDate((p) => p.minus({ month: 1 }))}
      />{' '}
      <Text fontSize="sm" color="warmGray.700">
        {activeDate.toLocaleString({ month: 'short', year: 'numeric' })}
      </Text>{' '}
      <IconButton
        size="lg"
        colorScheme="muted"
        icon={<ChevronRightIcon color="warmGray.700" />}
        onPress={() => setActiveDate((p) => p.plus({ month: 1 }))}
      />
    </HStack>
  );
};
