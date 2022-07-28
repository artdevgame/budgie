import { useSession } from '@serverless-stack/lambda/auth';
import { Context } from '@serverless-stack/lambda/context';

import { User } from '../user';

export const useUser = Context.memo(async () => {
  const session = useSession();

  if (session.type !== 'user') {
    throw new Error('Session must be a user');
  }

  const user = await User.withAuthId(session.properties.authId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
});
