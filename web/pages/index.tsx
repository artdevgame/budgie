import { useUser } from 'features/common/hooks/useUser';
import { Center } from 'native-base';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App() {
  const router = useRouter();
  const [user, { fetching }] = useUser();

  useEffect(() => {
    if (fetching) {
      return;
    }

    if (!user) {
      router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/authorize`);
    }

    router.push(`/budget`);
  }, [fetching, user]);

  return <Center>Loading</Center>;
}
