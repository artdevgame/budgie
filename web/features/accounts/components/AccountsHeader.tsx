import { DateNavigator } from 'features/common/components/DateNavigator';
import { HamburgerButton } from 'features/common/components/Menu/HamburgerButton';
import { DateTime } from 'luxon';
import {
    Box, Heading, HStack, IconButton, Input, SearchIcon, useMediaQuery, useTheme, VStack
} from 'native-base';
import { useIntl } from 'react-intl';

export const AccountsHeader = () => {
  const { formatMessage } = useIntl();
  const currentDate = DateTime.now().toISODate();

  const { breakpoints } = useTheme();

  const [isSmallScreen] = useMediaQuery({
    maxWidth: Number(breakpoints.md),
  });

  if (isSmallScreen) {
    return (
      <VStack alignItems="center" bgColor="muted.50">
        <Box position="absolute" left="4" top="2">
          <HamburgerButton />
        </Box>
        <VStack alignItems="center" p="4">
          <Heading fontSize="2xl" color="warmGray.700">
            &pound;0.00
          </Heading>
          <Heading fontSize="xs" color="warmGray.400">
            {formatMessage({ defaultMessage: 'Balance' })}
          </Heading>
        </VStack>
        <Box position="absolute" right="4" top="2">
          {/* <IconButton icon={<SearchIcon />} colorScheme="muted" /> */}
          {/* <Input variant="rounded" InputLeftElement={<SearchIcon pl="2.5" color="muted.300" />} /> */}
        </Box>
        <Box borderTopWidth="5" borderTopColor="gray.100" width="full" alignItems="center">
          <DateNavigator latestDate={currentDate} />
        </Box>
      </VStack>
    );
  }

  return (
    <HStack minH="24" p="4" alignItems="center" bgColor="muted.50" justifyContent="space-between">
      <DateNavigator latestDate={currentDate} />
      <VStack alignItems="center">
        <Heading fontSize="2xl" color="warmGray.700">
          &pound;0.00
        </Heading>
        <Heading fontSize="xs" color="warmGray.400">
          {formatMessage({ defaultMessage: 'Balance' })}
        </Heading>
      </VStack>
      <Input
        variant="rounded"
        placeholder="Search transactions..."
        InputLeftElement={<SearchIcon pl="2.5" color="muted.300" />}
      />
    </HStack>
  );
};
