import { useTypedQuery } from 'lib/urql';
import React from 'react';

import { ImageAvatar } from '@budgie/design-system/components/Elements/Avatars/ImageAvatar';
import { Button } from '@budgie/design-system/components/Elements/Buttons/Button';
import { Text } from '@budgie/design-system/components/Elements/Typography/Text';
import { Card } from '@budgie/design-system/components/Layout/Panels/Card';

export default function App() {
  const [users] = useTypedQuery({
    query: {
      user: {
        email: true,
      },
    },
  });

  console.log(users);

  return (
    <Card className="m-4 max-w-fit">
      <ImageAvatar imageUrl="https://avatars.githubusercontent.com/u/353729?v=4" size="xl" />

      <Text className="mb-4">React Native for Web & Next.js</Text>

      <Button>Yo!</Button>
    </Card>
  );
}
