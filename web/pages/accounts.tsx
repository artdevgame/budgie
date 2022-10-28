import { AccountsHeader } from 'features/accounts/components/AccountsHeader';
import { SelectedActions } from 'features/accounts/components/SelectedActions';
import { Transaction } from 'features/accounts/components/Transaction';
import { MainLayout } from 'features/common/components/MainLayout';
import { ledgerStub } from 'features/common/stubs/ledger';
import { Box, Button, Checkbox, HStack, Text, useMediaQuery, useTheme, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Accounts() {
  const { formatMessage } = useIntl();
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

  const { breakpoints, colors, fontSizes } = useTheme();

  const [isSmallScreen] = useMediaQuery({
    maxWidth: Number(breakpoints.md),
  });

  const allTransactions = new Set<string>(ledgerStub.map((transaction) => transaction.txId));
  const totalTransactions = Array.from(allTransactions).length;

  const handleToggleRows = (isSelected: boolean) => {
    if (!isSelected) {
      return setSelectedTransactions([]);
    }

    setSelectedTransactions(Array.from(allTransactions));
  };

  const ledger = ledgerStub.map((transaction) => {
    return <Transaction key={`transaction-${transaction.txId}`} {...transaction} />;
  });

  useEffect(() => {
    setSelectedTransactions([]);
  }, [isSmallScreen]);

  return (
    <MainLayout>
      <AccountsHeader />
      <Box flexGrow="1" bgColor="white" m="4" mb="0">
        <HStack
          p="2"
          pr="4"
          bgColor="gray.50"
          borderBottomStyle="dotted"
          borderBottomColor="light.200"
          borderBottomWidth="1"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            onPress={() => console.log('sync transactions')}
            variant="unstyled"
            fontWeight="medium"
            size="xs"
            startIcon={<ArrowPathIcon color={colors.muted['900']} width={fontSizes['sm']} />}
          >
            {formatMessage({ defaultMessage: 'Sync Transactions' })}
          </Button>

          <Text fontSize="2xs" color="muted.500" numberOfLines={1} maxW="1/2">
            {/* 00-12-34 22845621 (Monzo) */}
            {formatMessage({ defaultMessage: 'All accounts' })}
          </Text>
        </HStack>
        <HStack bgColor="gray.50" p="4" space="4" alignItems="center">
          {!isSmallScreen && (
            <>
              <Checkbox
                value="-"
                accessibilityLabel="Toggle rows"
                onChange={handleToggleRows}
                isChecked={selectedTransactions.length === totalTransactions}
              />

              <Text minW="20" fontSize="xs" fontWeight="medium" color="muted.500">
                {formatMessage({ defaultMessage: 'DATE' })}
              </Text>
              <Text minW="1/5" textAlign="left" fontSize="xs" fontWeight="medium" color="muted.500">
                {formatMessage({ defaultMessage: 'NAME' })}
              </Text>
              <Text flexGrow="1" textAlign="left" fontSize="xs" fontWeight="medium" color="muted.500">
                {formatMessage({ defaultMessage: 'REFERENCE' })}
              </Text>
              <Text minW="1/5" textAlign="left" fontSize="xs" fontWeight="medium" color="muted.500">
                {formatMessage({ defaultMessage: 'CATEGORY' })}
              </Text>
              <Text minW="20" textAlign="right" fontSize="xs" fontWeight="medium" color="muted.500">
                {formatMessage({ defaultMessage: 'AMOUNT' })}
              </Text>
            </>
          )}
          {isSmallScreen && (
            <>
              <Text minW="20" fontSize="xs" fontWeight="medium" color="muted.500">
                {formatMessage({ defaultMessage: 'DATE' })}
              </Text>
              <Text flexGrow={1} textAlign="left" fontSize="xs" fontWeight="medium" color="muted.500">
                {formatMessage({ defaultMessage: 'DETAILS' })}
              </Text>
              <Text minW="20" textAlign="right" fontSize="xs" fontWeight="medium" color="muted.500">
                {formatMessage({ defaultMessage: 'AMOUNT' })}
              </Text>
            </>
          )}
        </HStack>

        <VStack flexGrow="1">
          <Checkbox.Group
            key={selectedTransactions.length}
            accessibilityLabel="Transacitons"
            defaultValue={selectedTransactions}
            onChange={setSelectedTransactions}
          >
            {ledger}
          </Checkbox.Group>
        </VStack>

        {selectedTransactions.length > 0 && <SelectedActions transactionIds={selectedTransactions} />}
      </Box>
    </MainLayout>
  );
}
