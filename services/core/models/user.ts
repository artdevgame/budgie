import { Event } from '@prisma/client';

import { cache } from '../lib/cache';

export * as User from './user';

export interface IUser {
  authId: string;
  givenName: string;
  familyName: string;
  email: string;
}

export async function getUser(authId: string) {
  const cacheResult = await cache.get(`user:${authId}`);

  if (!cacheResult) {
    throw new Error(`No user with authId: ${authId}`);
  }

  return JSON.parse(cacheResult) as IUser;
}

export function fromEvent(event: Event) {
  const { givenName, familyName, email } = event.data as unknown as IUser;
  return { givenName, familyName, email } as IUser;
}
