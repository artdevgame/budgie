import { Event } from '@prisma/client';

import { dispatchEvent } from '../helpers/dispatchEvent';
import { cache } from '../lib/cache';
import { database } from '../lib/database';
import { createEvent } from './event';

export * as User from './user';

export interface IUser {
  authId: string;
  givenName: string;
  familyName: string;
  email: string;
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

export function fromEvent(event: Event) {
  const { givenName, familyName, email } = event.data as unknown as IUser;
  return { givenName, familyName, email } as IUser;
}
