import { useTypedQuery } from 'lib/urql';
import { Avatar, Button, Card, Text } from 'native-base';
import React from 'react';

const LoggedInView = ({ user }) => {
  const handleLogout = () => {
    // todo: needs implementing in sst / or new endpoint to clear session
    location.href = '/';
  };

  return (
    <Card m="4" maxW="container" alignItems="center">
      <Avatar source={{ uri: `/api/profile-pic?url=${user.picture}` }} size="xl" mb="2.5" />

      <Text mb="1" size="xl">
        {user.givenName} {user.familyName}
      </Text>
      <Text mb="4">{user.email}</Text>

      <Button onPress={handleLogout}>Logout</Button>
    </Card>
  );
};

const LoggedOutView = () => {
  const handleLogin = () => {
    location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/authorize`;
  };

  return (
    <Card m="4" maxW="container" alignItems="center">
      <Avatar source={{ uri: 'https://avatars.githubusercontent.com/u/353729?v=4' }} size="xl" mb="2.5" />

      <Button onPress={handleLogin}>Sign in</Button>
    </Card>
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
    return <Text>Getting ready</Text>;
  }

  if (!data?.user) {
    return <LoggedOutView />;
  }

  return <LoggedInView user={data.user} />;
}
