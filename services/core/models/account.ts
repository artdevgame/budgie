import { Event } from '@prisma/client';

import { cache } from '../lib/cache';

export * as Account from './account';

export type TAccountId = string;

export interface IAccount {
  accountId: TAccountId;
  name: string;
  active: boolean;
}

export type TAccounts = Record<TAccountId, TAccountEntry>;
export type TAccountEntry = Omit<IAccount, 'accountId'>;

export async function getAccounts(authId: string) {
  try {
    const cacheResult = await cache.get(`accounts:${authId}`);

    if (!cacheResult) {
      throw new Error(`No accounts for user: ${authId}`);
    }

    return JSON.parse(cacheResult) as TAccounts;
  } catch (err) {
    // log error
    return {} as TAccounts;
  }
}

export function fromEvent(event: Event) {
  const { accountId, name, active } = event.data as unknown as IAccount;
  return { accountId, active, name } as IAccount;
}
