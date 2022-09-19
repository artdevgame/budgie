import { BudgetHeader } from 'features/budget/components/BudgetHeader';
import { MainLayout } from 'features/common/components/MainLayout';
import { Box, Text } from 'native-base';

export default function Budget() {
  return (
    <MainLayout>
      <BudgetHeader />
      <Box flexGrow="1" bgColor="white" m="4" mb="0" p="4">
        <Text>Yolo</Text>
      </Box>
    </MainLayout>
  );
}
