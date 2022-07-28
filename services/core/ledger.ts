import { Event } from '@prisma/client';

import { createEvent } from './event';
import { dispatchEvent } from './helpers/dispatchEvent';
import { useUser } from './hooks/useUser';
import { cache } from './lib/cache';
import { TOptional } from './types/TOptional';
import { TWithAuth } from './types/TWithAuth';
import { User } from './user';

export * as Ledger from './ledger';

export interface ITransaction {
  accountId: string;
  amount: number;
  amountDir: 'debit' | 'credit';
  categoryId: string;
  currency: string; // 3-letter ISO code
  txId: string;
  txInformation: string;
  txReference: string;
}

export async function addTransaction({
  accountId,
  amount,
  amountDir,
  categoryId,
  currency,
  txId,
  txInformation,
  txReference,
}: TOptional<ITransaction, 'categoryId' | 'txId' | 'txInformation' | 'txReference'>) {
  User.assertRole('user');

  const { authId } = await useUser();

  const event = await createEvent({
    command: 'ADD_TRANSACTION',
    accountId,
    amount,
    amountDir,
    authId,
    currency,
    ...(categoryId && { categoryId }),
    ...(txId && { txId }),
    ...(txInformation && { txInformation }),
    ...(txReference && { txReference }),
  });
  const transaction = fromEvent(event);

  await dispatchEvent<TWithAuth<ITransaction>>('TRANSACTION_ADDED', { authId, ...transaction });

  return transaction;
}

export async function withAccountId({ accountId }: Pick<ITransaction, 'accountId'>) {
  User.assertRole('user');

  const { authId } = await useUser();

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
