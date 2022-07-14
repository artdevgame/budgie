import { Event } from '@prisma/client';

import { cache } from '../lib/cache';
import { TAccountId } from './account';

export * as Ledger from './ledger';

export interface ITransaction {
  accountId: string;
  categoryId: string;
  txId: string;
  txReference: string;
  txInformation: string;
  amount: number;
  currency: string; // 3-letter ISO code
  amountDir: 'debit' | 'credit';
}

export async function getTransactions(authId: string, accountId: string) {
  try {
    const cacheResult = await cache.get(`ledger:${authId}:${accountId}`);

    if (!cacheResult) {
      throw new Error(`No ledger for user: ${authId}`);
    }

    const transactions = JSON.parse(cacheResult) as ITransaction[];

    return transactions ?? ([] as ITransaction[]);
  } catch (err) {
    // log error
    return [] as ITransaction[];
  }
}

export function fromEvent(event: Event) {
  const { accountId, categoryId, txId, txReference, txInformation, amount, currency, amountDir } =
    event.data as unknown as ITransaction;
  return { accountId, categoryId, txId, txReference, txInformation, amount, currency, amountDir } as ITransaction;
}
