import { Actor } from './actor';
import { TCategoryId } from './budget-category';
import { createEvent, IEventEntity } from './event';
import { dispatchEvent } from './helpers/dispatchEvent';
import { useUser } from './hooks/useUser';
import { cache } from './lib/cache';
import { TWithAuth } from './types/TWithAuth';

export * as Budget from './budget';

export interface IBudget {
  amount: number;
  categoryId: TCategoryId;
  date: string;
}

export type TBudget = Record<TCategoryId, number>;

export async function upsertBudget({ amount, categoryId, date }: IBudget) {
  Actor.assertRole('user');

  const { authId } = await useUser();

  const event = await createEvent({
    command: 'UPDATE_BUDGET',
    amount,
    categoryId,
    date,
  });
  const budget = fromEvent(event);

  await dispatchEvent<TWithAuth<IBudget>>('BUDGET_UPDATED', { authId, ...budget });

  return budget;
}

export async function withDate(date: string) {
  Actor.assertRole('user');

  const { authId } = await useUser();

  const dateKey = date.substring(0, 7); // YYYY-MM

  try {
    const cacheResult = await cache.get(`budget:${authId}:${dateKey}`);

    if (!cacheResult) {
      throw new Error(`No budget for category: ${authId} for date: ${dateKey}`);
    }

    const all = JSON.parse(cacheResult) as TBudget;
    const budget = all[dateKey];

    return budget ?? ({} as TBudget);
  } catch (err) {
    // log error
    return {} as TBudget;
  }
}

export function fromEvent(event: IEventEntity) {
  const { categoryId, date, amount } = event.data as unknown as IBudget;
  return { categoryId, date, amount } as IBudget;
}
