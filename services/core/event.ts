import { sql } from 'kysely';
import { ulid } from 'ulid';

import { database } from './lib/database';

export * as Event from './event';

interface IAccountCreate {
  command: 'CREATE_ACCOUNT';
  name: string;
}

interface IAccountClose {
  command: 'CLOSE_ACCOUNT';
  accountId: string;
}

interface IAccountRetrieve {
  command: 'GET_ACCOUNTS';
}

interface IAccountUpdate {
  command: 'UPDATE_ACCOUNT';
  accountId: string;
  name: string;
}

interface IBudgetRetrieve {
  command: 'GET_BUDGET';
  categoryId: string;
  date: string;
}

interface IBudgetUpdate {
  command: 'UPDATE_BUDGET';
  amount: number;
  categoryId: string;
  date: string;
}

interface ICategoryCreate {
  command: 'CREATE_CATEGORY';
  categoryGroupId?: string;
  name: string;
  order?: number;
}

interface ICategoryDelete {
  command: 'DELETE_CATEGORY';
  categoryId: string;
}

interface ICategoryUpdate extends Partial<Omit<ICategoryCreate, 'command'>> {
  command: 'UPDATE_CATEGORY';
  categoryId: string;
}

interface ICategoryGroupCreate {
  command: 'CREATE_CATEGORY_GROUP';
  name: string;
  order?: number;
}

interface ICategoryGroupDelete {
  command: 'DELETE_CATEGORY_GROUP';
  categoryGroupId: string;
}

interface ICategoryGroupUpdate extends Partial<Omit<ICategoryGroupCreate, 'command'>> {
  command: 'UPDATE_CATEGORY_GROUP';
  categoryGroupId: string;
}

interface ITransactionAdd {
  command: 'ADD_TRANSACTION';
  authId: string;
  accountId: string;
  categoryId?: string;
  txId?: string;
  txReference?: string;
  txInformation?: string;
  amount: number;
  currency: string;
  amountDir: 'credit' | 'debit';
}

interface ITransactionRetrieve {
  command: 'GET_TRANSACTIONS';
  accountId: string;
}

interface IUserCreate {
  command: 'CREATE_USER';
  authId: string;
  givenName: string;
  familyName: string;
  email: string;
}

interface IUserLogin {
  command: 'LOGIN';
}

interface IUserLogout {
  command: 'LOGOUT';
  userId: string;
}

interface IUserUpdate extends Partial<Omit<IUserCreate, 'command'>> {
  command: 'UPDATE_USER';
}

export type TEventData =
  | IAccountCreate
  | IAccountClose
  | IAccountRetrieve
  | IAccountUpdate
  | IBudgetRetrieve
  | IBudgetUpdate
  | ICategoryCreate
  | ICategoryDelete
  | ICategoryUpdate
  | ICategoryGroupCreate
  | ICategoryGroupDelete
  | ICategoryGroupUpdate
  | ITransactionAdd
  | ITransactionRetrieve
  | IUserCreate
  | IUserLogin
  | IUserLogout
  | IUserUpdate;

export interface IEvent {
  data: TEventData;
  id: string;
  sequence: number;
  timestamp?: string;
  version: '1.0.0';
}

export interface IEventEntity extends Omit<IEvent, 'data'> {
  data: string;
}

export async function createEvent(data: TEventData, sequence: number = 0) {
  const event: IEvent = {
    data,
    id: ulid(),
    sequence,
    // timestamp: new Date().toISOString(),
    version: '1.0.0',
  };
  await database
    .insertInto('events')
    .values({ ...event, data: JSON.stringify(data) })
    .executeTakeFirst();
  return event;
}

export async function getEvents({ authId, limit = 0 }: { authId: string; limit?: number }) {
  return database
    .selectFrom('events')
    .selectAll()
    .where(sql`JSON_EXTRACT(data, "$.authId")`, '=', authId)
    .limit(limit)
    .execute() as unknown as Promise<IEvent[]>;
}
