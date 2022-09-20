import { BudgetHeader } from 'features/budget/components/BudgetHeader';
import { CategoryGroup } from 'features/budget/components/CategoryGroup';
import { MainLayout } from 'features/common/components/MainLayout';
import { categoryGroupsStub } from 'features/common/stubs/category-groups';
import { AddIcon, Box, Button, Checkbox, HStack, Text, VStack } from 'native-base';

export default function Budget() {
  const budget = Object.entries(categoryGroupsStub)
    .sort((a, b) => (a[1].order > b[1].order ? 1 : -1))
    .map(([groupId, group]) => {
      return <CategoryGroup id={groupId} {...group} />;
    });

  return (
    <MainLayout>
      <BudgetHeader />
      <Box flexGrow="1" bgColor="white" m="4" mb="0">
        <Box
          p="2"
          bgColor="gray.50"
          alignItems="flex-start"
          borderBottomStyle="dotted"
          borderBottomColor="light.200"
          borderBottomWidth="1"
        >
          <Button variant="unstyled" size="xs" startIcon={<AddIcon size="2xs" />}>
            Category
          </Button>
        </Box>
        <HStack bgColor="gray.50" p="4" space="4" alignItems="center">
          <Checkbox value="-" />
          <Text flexGrow="1" fontSize="xs" fontWeight="medium" color="muted.500">
            CATEGORY
          </Text>
          <Text textAlign="right" flexBasis="15%" fontSize="xs" fontWeight="medium" color="muted.500">
            BUDGETED
          </Text>
          <Text textAlign="right" flexBasis="15%" fontSize="xs" fontWeight="medium" color="muted.500">
            ACTIVITY
          </Text>
          <Text textAlign="right" flexBasis="15%" fontSize="xs" fontWeight="medium" color="muted.500">
            AVAILABLE
          </Text>
        </HStack>
        <VStack>{budget}</VStack>
      </Box>
    </MainLayout>
  );
}
