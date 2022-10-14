import { Box, Button, Heading, HStack, IconButton, theme, useTheme, VStack } from 'native-base';
import { ResponsiveValue } from 'native-base/lib/typescript/components/types';
import { useIntl } from 'react-intl';

import {
    ArrowSmallRightIcon, BuildingLibraryIcon, MinusCircleIcon, ShoppingBagIcon
} from '@heroicons/react/24/outline';

import { accountsStub } from '../../stubs/accounts';
import { AppName } from '../Logo/AppName';
import { AuthenticatedUser } from './AuthenticatedUser';

interface MenuProps {
  width?: ResponsiveValue<string>;
}

export const Menu = ({ width = '56' }: MenuProps) => {
  const { formatMessage } = useIntl();
  const accounts = Object.entries(accountsStub).filter(([, account]) => account.active);

  const { colors, fontSizes } = useTheme();

  return (
    <VStack width={width} backgroundColor="white" height="full" borderRightColor="coolGray.100" borderRightWidth="2">
      <Box minH="24" p="4" justifyContent="center" borderBottomColor={colors.muted['200']} borderBottomWidth="1">
        <AppName />
      </Box>
      <Box p="4" mt="4" flexGrow="1">
        <VStack mb="8">
          <Heading display="flex" fontSize="sm" color="black" mb="4" alignItems="center">
            <ShoppingBagIcon
              width={fontSizes['xl']}
              style={{ transform: `translateY(-2px)`, marginRight: theme.space['1'] }}
            />
            {formatMessage({ defaultMessage: 'Budget' })}
          </Heading>
          <Button
            variant="ghost"
            size="sm"
            colorScheme="primary"
            leftIcon={<ArrowSmallRightIcon color={colors.primary['500']} width={fontSizes['sm']} />}
            justifyContent="flex-start"
          >
            {formatMessage({ defaultMessage: 'Manage budget' })}
          </Button>
        </VStack>
        <VStack>
          <Heading display="flex" fontSize="sm" color="black" mb="4" alignItems="center">
            <BuildingLibraryIcon
              width={fontSizes['xl']}
              style={{ transform: `translateY(-2px)`, marginRight: theme.space['1'] }}
            />
            {formatMessage({ defaultMessage: 'Accounts' })}
          </Heading>
          {accounts.length > 0 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                colorScheme="primary"
                leftIcon={<ArrowSmallRightIcon color={colors.primary['500']} width={fontSizes['sm']} />}
                justifyContent="flex-start"
              >
                {formatMessage({ defaultMessage: 'All accounts' })}
              </Button>
              {accounts.map(([accountId, account]) => (
                <HStack key={`account-${accountId}`}>
                  <Button
                    key={`account-${accountId}`}
                    variant="ghost"
                    size="sm"
                    flexGrow="1"
                    colorScheme="secondary"
                    leftIcon={<ArrowSmallRightIcon color={colors.secondary['500']} width={fontSizes['sm']} />}
                    justifyContent="flex-start"
                  >
                    {account.name}
                  </Button>
                  <IconButton
                    variant="ghost"
                    colorScheme="secondary"
                    size="sm"
                    icon={<MinusCircleIcon color={colors.red['600']} width={fontSizes['xl']} />}
                  />
                </HStack>
              ))}
            </>
          )}
          <Button size="xs" mt="4">
            {formatMessage({ defaultMessage: 'Add account' })}
          </Button>
        </VStack>
      </Box>
      <AuthenticatedUser />
    </VStack>
  );
};
