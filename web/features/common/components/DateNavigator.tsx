import { DateTime } from 'luxon';
import { ChevronLeftIcon, ChevronRightIcon, HStack, IconButton, Text } from 'native-base';
import { useState } from 'react';

interface DateNavigatorProps {
  earliestDate?: string;
  latestDate?: string;
}

export const DateNavigator = ({ earliestDate, latestDate }: DateNavigatorProps) => {
  const [activeDate, setActiveDate] = useState(DateTime.now());

  const canNavigateEarlier = !earliestDate || activeDate.startOf('day') > DateTime.fromISO(earliestDate).startOf('day');
  const canNavigateLater = !latestDate || activeDate.startOf('day') < DateTime.fromISO(latestDate).startOf('day');

  return (
    <HStack alignItems="center" space="0.5">
      <IconButton
        size="lg"
        colorScheme="muted"
        icon={<ChevronLeftIcon color={canNavigateEarlier ? 'warmGray.700' : 'muted.300'} />}
        onPress={() => setActiveDate((p) => p.minus({ month: 1 }))}
        disabled={!canNavigateEarlier}
      />{' '}
      <Text fontSize="sm" color="warmGray.700">
        {activeDate.toLocaleString({ month: 'short', year: 'numeric' })}
      </Text>{' '}
      <IconButton
        size="lg"
        colorScheme="muted"
        icon={<ChevronRightIcon color={canNavigateLater ? 'warmGray.700' : 'muted.300'} />}
        onPress={() => setActiveDate((p) => p.plus({ month: 1 }))}
        disabled={!canNavigateLater}
      />
    </HStack>
  );
};
