import { Event } from '@prisma/client';

import { cache } from '../lib/cache';
import { TCategoryId } from './category';

export * as Budget from './budget';

type TIsoDate = string;

export interface IBudget {
  amount: number;
  categoryId: TCategoryId;
  date: string;
}

export type TBudget = Record<TCategoryId, number>;

export async function getBudget(authId: string, date: string) {
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

export function fromEvent(event: Event) {
  const { categoryId, date, amount } = event.data as unknown as IBudget;
  return { categoryId, date, amount } as IBudget;
}
