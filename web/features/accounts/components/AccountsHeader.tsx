import { DateNavigator } from 'features/common/components/DateNavigator';
import { Heading, Input, SearchIcon, Stack, VStack } from 'native-base';

export const AccountsHeader = () => {
  return (
    <Stack direction="row">
      <DateNavigator />
      <VStack>
        <Heading size="xl" color="warmGray.700">
          £0.00
        </Heading>
        <Heading size="xs" color="warmGray.400">
          To be budgeted
        </Heading>
      </VStack>
      <Input variant="rounded" placeholder="Search transactions..." InputLeftElement={<SearchIcon />} />
    </Stack>
  );
};
