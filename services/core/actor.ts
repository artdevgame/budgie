import { SessionTypes } from '@serverless-stack/lambda/auth';

import { useUser } from './hooks/useUser';

export * as Actor from './actor';

export async function assertRole(role: keyof SessionTypes) {
  const user = await useUser();
  if (user.role !== role) {
    throw new Error(`User must have "${role}" role`);
  }
}
