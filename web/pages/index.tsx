import { useTypedQuery } from 'lib/urql';
import { Avatar, Box, Button, Text } from 'native-base';
import React from 'react';

const LoggedInView = ({ user }) => {
  const handleLogout = () => {
    // todo: needs implementing in sst / or new endpoint to clear session
    location.href = '/';
  };

  return (
    <Box shadow="2" maxWidth="sm" p="8" borderRadius="lg" alignItems="center" m="8">
      <Avatar source={{ uri: `/api/avatar?url=${user.picture}` }} size="lg" mb="2.5" />
      <Text mb="1" fontWeight="semibold" fontSize="xl">
        {user.givenName} {user.familyName}
      </Text>
      <Text mb="4">{user.email}</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </Box>
  );
};

const LoggedOutView = () => {
  const handleLogin = () => {
    location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/authorize`;
  };

  return (
    <Box shadow="2" maxWidth="sm" p="8" borderRadius="lg" alignItems="center" m="8">
      <Avatar source={{ uri: 'https://avatars.githubusercontent.com/u/353729?v=4' }} size="xl" mb="2.5" />

      <Button onPress={handleLogin}>Sign in</Button>
    </Box>
  );
};

export default function App() {
  const [{ data, fetching }] = useTypedQuery({
    query: {
      user: {
        email: true,
        familyName: true,
        givenName: true,
        picture: true,
      },
    },
  });

  if (fetching) {
    return (
      <Box shadow="2" maxWidth="sm" p="8" borderRadius="lg" alignItems="center" m="8">
        <Text>Getting ready</Text>
      </Box>
    );
  }

  if (!data?.user) {
    return <LoggedOutView />;
  }

  return <LoggedInView user={data.user} />;
}
