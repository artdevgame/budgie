import { useUser } from 'features/common/hooks/useUser';
import { Avatar, HStack, Skeleton, Text, useTheme, VStack } from 'native-base';

export const AuthenticatedUser = () => {
  const [user] = useUser();
  const { colors } = useTheme();

  if (!user) {
    return <AuthenticatedUserSkeleton />;
  }

  return (
    <HStack p="4" borderTopColor={colors.muted['200']} borderTopWidth="1">
      <Avatar source={{ uri: `/api/avatar?url=${user.picture}` }} size="sm" />
      <VStack ml="2">
        <Text fontSize="xs" color="text.700">
          {user.givenName} {user.familyName}
        </Text>
        <Text fontSize="2xs" color="text.700">
          {user.email}
        </Text>
      </VStack>
    </HStack>
  );
};

const AuthenticatedUserSkeleton = () => {
  const { colors } = useTheme();
  return (
    <HStack p="4" borderTopColor={colors.muted['200']} borderTopWidth="1">
      <Skeleton rounded="full" />
    </HStack>
  );
};
