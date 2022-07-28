import { useTypedQuery } from 'lib/urql';
import React from 'react';

import { ImageAvatar } from '@budgie/design-system/components/Elements/Avatars/ImageAvatar';
import { Button } from '@budgie/design-system/components/Elements/Buttons/Button';
import { Text } from '@budgie/design-system/components/Elements/Typography/Text';
import { Card } from '@budgie/design-system/components/Layout/Panels/Card';

const LoggedInView = () => {
  const [{ data }] = useTypedQuery({
    query: {
      user: {
        email: true,
        familyName: true,
        givenName: true,
        picture: true,
      },
    },
  });

  const handleLogout = () => {
    window?.localStorage.removeItem('x-budgie-auth');
    location.href = '/';
  };

  if (!data?.user) {
    return null;
  }

  const { user } = data;

  return (
    <Card className="m-4 max-w-fit" bodyClassName="items-center">
      <ImageAvatar imageUrl={user.picture} size="xl" className="mb-2.5" />

      <Text className="mb-1 text-xl">
        {user.givenName} {user.familyName}
      </Text>
      <Text className="mb-4">{user.email}</Text>

      <Button onPress={handleLogout}>Logout</Button>
    </Card>
  );
};

const LoggedOutView = () => {
  const handleLogin = () => {
    location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/authorize`;
  };

  return (
    <Card className="m-4 max-w-fit" bodyClassName="items-center">
      <ImageAvatar imageUrl="https://avatars.githubusercontent.com/u/353729?v=4" size="xl" className="mb-2.5" />

      <Button onPress={handleLogin}>Sign in</Button>
    </Card>
  );
};

export default function App() {
  if (typeof window === 'undefined' || !window.localStorage.getItem('x-budgie-auth')) {
    return <LoggedOutView />;
  }
  return <LoggedInView />;
}
