import { Box, Button, Heading, HStack, IconButton, MinusIcon, useTheme, VStack } from 'native-base';

import {
    ArrowSmallRightIcon, BuildingLibraryIcon, MinusCircleIcon, ShoppingBagIcon
} from '@heroicons/react/24/outline';

import { accountsStub } from '../../stubs/accounts';
import { AppName } from '../Logo/AppName';
import { AuthenticatedUser } from './AuthenticatedUser';

export const Menu = () => {
  const accounts = Object.entries(accountsStub).filter(([, account]) => account.active);

  const { colors, fontSizes } = useTheme();

  return (
    <VStack width="56" borderRightColor="coolGray.100" borderRightWidth="2">
      <Box minH="24" p="4" justifyContent="center" borderBottomColor={colors.muted['200']} borderBottomWidth="1">
        <AppName />
      </Box>
      <Box p="4" mt="4" flexGrow="1">
        <VStack mb="8">
          <Heading display="flex" size="sm" color="black" gap="1" mb="4" alignItems="center">
            <ShoppingBagIcon width={fontSizes['2xl']} style={{ transform: `translateY(-2px)` }} />
            Budget
          </Heading>
          <Button
            variant="ghost"
            size="sm"
            colorScheme="primary"
            leftIcon={<ArrowSmallRightIcon color={colors.primary['500']} width={fontSizes['sm']} />}
            justifyContent="flex-start"
          >
            Manage budget
          </Button>
        </VStack>
        <VStack>
          <Heading display="flex" size="sm" color="black" gap="1" mb="4" alignItems="center">
            <BuildingLibraryIcon width={fontSizes['2xl']} style={{ transform: `translateY(-2px)` }} />
            Accounts
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
                All accounts
              </Button>
              {accounts.map(([accountId, account]) => (
                <HStack>
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
            Add account
          </Button>
        </VStack>
      </Box>
      <AuthenticatedUser />
    </VStack>
  );
};
