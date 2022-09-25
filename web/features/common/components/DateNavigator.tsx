import { Box, ChevronLeftIcon, ChevronRightIcon, HStack, IconButton, Text } from 'native-base';

export const DateNavigator = () => {
  return (
    <HStack alignItems="center" space="0.5">
      <IconButton size="lg" colorScheme="muted" icon={<ChevronLeftIcon color="warmGray.700" />} />{' '}
      <Text fontSize="sm" color="warmGray.700">
        Sept 2022
      </Text>{' '}
      <IconButton size="lg" colorScheme="muted" icon={<ChevronRightIcon color="warmGray.700" />} />
    </HStack>
  );
};
