import { useUser } from 'features/common/hooks/useUser';
import { Center } from 'native-base';
import { useRouter } from 'next/router';

export default function App() {
  const router = useRouter();
  const [user] = useUser();

  if (user) {
    router.push(`/budget`);
  }

  return <Center>Loading</Center>;
}
