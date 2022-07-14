import { Event } from '@prisma/client';

import { cache } from '../lib/cache';

export * as Category from './category';

export type TCategoryId = string;

export interface ICategory {
  categoryId: TCategoryId;
  categoryGroupId: string;
  name: string;
  order: number;
}

export type TCategories = Record<TCategoryId, TCategoryEntry>;
export type TCategoryEntry = Omit<ICategory, 'categoryId'>;

export async function getCategories(authId: string) {
  try {
    const cacheResult = await cache.get(`categories:${authId}`);

    if (!cacheResult) {
      throw new Error(`No categories for user: ${authId}`);
    }

    return JSON.parse(cacheResult) as TCategories;
  } catch (err) {
    // log error
    return {} as TCategories;
  }
}

export function fromEvent(event: Event) {
  const { categoryId, categoryGroupId, name, order } = event.data as unknown as ICategory;
  return { categoryId, categoryGroupId, name, order } as ICategory;
}
