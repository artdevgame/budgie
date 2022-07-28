import { Event } from '@prisma/client';
import { SessionTypes } from '@serverless-stack/lambda/auth';

import { createEvent } from './event';
import { dispatchEvent } from './helpers/dispatchEvent';
import { useUser } from './hooks/useUser';
import { cache } from './lib/cache';
import { database } from './lib/database';

export * as User from './user';

export interface IUser {
  authId: string;
  givenName: string;
  familyName: string;
  email: string;
  role: keyof SessionTypes;
}

export async function assertRole(role: IUser['role']) {
  const user = await useUser();
  if (user.role !== role) {
    throw new Error(`User must have "${role}" role`);
  }
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
  assertRole('user');

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

  const userInEvents = await database.event.findFirst({ where: { data: { equals: [{ authId }] } } });

  if (userInEvents) {
    const existingUser = fromEvent(userInEvents);
    await dispatchEvent<IUser>('USER_CREATED', existingUser);
    return existingUser;
  }
}

export async function me() {
  const { authId } = await useUser();
  return withAuthId(authId);
}

export function fromEvent(event: Event) {
  const { authId, givenName, familyName, email } = event.data as unknown as IUser;
  return { authId, givenName, familyName, email, role: 'user' } as IUser;
}
