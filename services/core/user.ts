import { SessionTypes } from '@serverless-stack/lambda/auth';

import { Actor } from './actor';
import { createEvent, getEvents, IEvent } from './event';
import { dispatchEvent } from './helpers/dispatchEvent';
import { useUser } from './hooks/useUser';
import { cache } from './lib/cache';

export * as User from './user';

export interface IUser {
  authId: string;
  givenName: string;
  familyName: string;
  email: string;
  role: keyof SessionTypes;
  picture?: string;
}

export async function createUser(user: IUser) {
  const event = await createEvent({
    command: 'CREATE_USER',
    ...user,
  });

  const createdUser = fromEvent(event);

  await dispatchEvent<IUser>('USER_CREATED', createdUser);

  return createdUser;
}

export async function updateUser({
  email,
  familyName,
  givenName,
}: Partial<Pick<IUser, 'email' | 'familyName' | 'givenName'>>) {
  Actor.assertRole('user');

  const { authId } = await useUser();

  const event = await createEvent({
    command: 'UPDATE_USER',
    authId,
    ...(email && { email }),
    ...(familyName && { familyName }),
    ...(givenName && { givenName }),
  });
  const user = fromEvent(event);

  await dispatchEvent<IUser>('USER_UPDATED', user);

  return user;
}

export async function withAuthId(authId: IUser['authId']) {
  const cacheResult = await cache.get(`user:${authId}`);

  if (cacheResult) {
    return JSON.parse(cacheResult) as IUser;
  }

  const userInEvents = await getEvents({ authId, limit: 1 });

  if (userInEvents.length) {
    const existingUser = fromEvent(userInEvents[0]);
    await dispatchEvent<IUser>('USER_CREATED', existingUser);
    return existingUser;
  }
}

export async function me() {
  const { authId } = await useUser();
  return withAuthId(authId);
}

export function fromEvent(event: IEvent) {
  const { authId, givenName, familyName, email, picture } = event.data as unknown as IUser;
  return { authId, givenName, familyName, email, role: 'user', picture } as IUser;
}
