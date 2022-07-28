import { Actor } from './actor';
import { createEvent, IEventEntity } from './event';
import { dispatchEvent } from './helpers/dispatchEvent';
import { useUser } from './hooks/useUser';
import { cache } from './lib/cache';
import { TWithAuth } from './types/TWithAuth';

export * as Account from './account';

export type TAccountId = string;

export interface IAccount {
  accountId: TAccountId;
  name: string;
  active: boolean;
}

export type TAccounts = Record<TAccountId, TAccountEntry>;
export type TAccountEntry = Omit<IAccount, 'accountId'>;

export async function createAccount({ name }: Pick<IAccount, 'name'>) {
  Actor.assertRole('user');

  const { authId } = await useUser();
  const event = await createEvent({ command: 'CREATE_ACCOUNT', name });
  const account = fromEvent(event);

  await dispatchEvent<TWithAuth<IAccount>>('ACCOUNT_CREATED', { authId, ...account });

  return account;
}

export async function updateAccount({ accountId, name }: Pick<IAccount, 'accountId' | 'name'>) {
  Actor.assertRole('user');

  const { authId } = await useUser();
  const event = await createEvent({
    command: 'UPDATE_ACCOUNT',
    accountId,
    name,
  });
  const account = fromEvent(event);

  await dispatchEvent<TWithAuth<IAccount>>('ACCOUNT_UPDATED', { authId, ...account });

  return account;
}

export async function closeAccount({ accountId }: Pick<IAccount, 'accountId'>) {
  Actor.assertRole('user');

  const { authId } = await useUser();
  const event = await createEvent({
    command: 'CLOSE_ACCOUNT',
    accountId,
  });
  const account = fromEvent(event);

  await dispatchEvent<TWithAuth<IAccount>>('ACCOUNT_CLOSED', { authId, ...account });

  return account;
}

export async function getAccounts() {
  Actor.assertRole('user');

  const { authId } = await useUser();
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

export function fromEvent(event: IEventEntity) {
  const { accountId, name, active } = event.data as unknown as IAccount;
  return { accountId, active, name } as IAccount;
}
