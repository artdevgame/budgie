import Dinero, { Currency } from 'dinero.js';
import { DateTime } from 'luxon';
import {
    Badge, Box, Button, Checkbox, HStack, Link, Pressable, Text, useMediaQuery, useTheme, VStack
} from 'native-base';
import { useModal } from 'react-modal-hook';
import { categoriesStub } from 'stubs/categories';

import { AssignCategoryModal } from './AssignCategoryModal';

export type TransactionAmountDir = 'credit' | 'debit';

interface TransactionProps {
  accountId: string;
  amount: string; // units; no decimals
  amountDir: TransactionAmountDir;
  categoryId: string | null;
  currency: string;
  txDate: string;
  txId: string;
  txName: string;
  txReference: string;
}

export const Transaction = ({
  amount,
  amountDir,
  categoryId,
  currency,
  txDate,
  txId,
  txName,
  txReference,
}: TransactionProps) => {
  const { breakpoints } = useTheme();
  const dinero = Dinero({
    amount: Number(amountDir === 'debit' ? `-${amount}` : amount),
    currency: currency as Currency,
  });
  const formattedAmount = dinero.toFormat();
  const date = DateTime.fromISO(txDate).toLocaleString();
  const category = categoriesStub[categoryId]?.name;
  const badgeColorScheme = dinero.isZero() ? 'muted' : dinero.isPositive() ? 'success' : 'error';

  const [showAssignCategoryModal, hideAssignCategoryModal] = useModal(() => (
    <AssignCategoryModal transactionIds={[txId]} onClose={hideAssignCategoryModal} />
  ));

  const [isSmallScreen] = useMediaQuery({
    maxWidth: Number(breakpoints.md),
  });

  if (isSmallScreen) {
    return (
      <Pressable
        onPress={showAssignCategoryModal}
        borderTopColor="blueGray.300"
        borderTopWidth="1"
        borderTopStyle="dotted"
        width="full"
      >
        <Box bgColor="warmGray.700" overflowX="hidden">
          <HStack alignItems="flex-start" px="4" py="2.5" space="4" bgColor="white">
            <Text minW="20" fontSize="xs" fontWeight="medium" color="muted.600">
              {date}
            </Text>
            <VStack alignItems="flex-start" flexGrow="1">
              <Text fontSize="xs" fontWeight="medium" color="muted.600">
                {txName}
              </Text>
              <Text textAlign="right" fontSize="xs" color="muted.500">
                {txReference}
              </Text>
            </VStack>
            <Box alignItems="flex-end">
              <Badge variant="outline" colorScheme={badgeColorScheme}>
                {formattedAmount}
              </Badge>
            </Box>
          </HStack>
        </Box>
      </Pressable>
    );
  }

  return (
    <Box overflowX="hidden" borderTopColor="blueGray.300" borderTopWidth="1" borderTopStyle="dotted" width="full">
      <HStack alignItems="center" px="4" py="2.5" space="4">
        <Checkbox value={txId} accessibilityLabel={`${txDate}: ${txName} ${formattedAmount}`} />

        <Text minW="20" fontSize="xs" fontWeight="medium" color="muted.600">
          {date}
        </Text>

        <Text minW="1/5" fontSize="xs" fontWeight="medium" color="muted.600">
          {txName}
        </Text>

        <Text flexGrow="1" textAlign="left" fontSize="xs" fontWeight="medium" color="muted.600" numberOfLines={1}>
          {txReference}
        </Text>

        <Box minW="1/5">
          <Button
            onPress={showAssignCategoryModal}
            w="0"
            size="sm"
            variant="link"
            padding="0"
            justifyContent="flex-start"
          >
            {category || 'Unassigned'}
          </Button>
        </Box>

        <Box minW="20" alignItems="flex-end">
          <Badge variant="outline" colorScheme={badgeColorScheme}>
            {formattedAmount}
          </Badge>
        </Box>
      </HStack>
    </Box>
  );
};
