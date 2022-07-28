import { Event } from '@prisma/client';

import { Actor } from './actor';
import { createEvent } from './event';
import { dispatchEvent } from './helpers/dispatchEvent';
import { useUser } from './hooks/useUser';
import { cache } from './lib/cache';
import { TOptional } from './types/TOptional';
import { TWithAuth } from './types/TWithAuth';

export * as BudgetCategory from './budget-category';

export interface ICategory {
  categoryId: TCategoryId;
  categoryGroupId: string;
  name: string;
  order: number;
}

export type TCategoryId = string;
export type TCategories = Record<TCategoryId, TCategoryEntry>;
export type TCategoryEntry = Omit<ICategory, 'categoryId'>;

export async function createCategory({
  name,
  categoryGroupId,
  order,
}: TOptional<TCategoryEntry, 'categoryGroupId' | 'order'>) {
  Actor.assertRole('user');

  const { authId } = await useUser();

  const event = await createEvent({
    command: 'CREATE_CATEGORY',
    name,
    ...(categoryGroupId && { categoryGroupId }),
    ...(order && { order }),
  });
  const category = fromEvent(event);

  await dispatchEvent<TWithAuth<ICategory>>('CATEGORY_CREATED', { authId, ...category });

  return category;
}

export async function deleteCategory({ categoryId }: Pick<ICategory, 'categoryId'>) {
  Actor.assertRole('user');

  const { authId } = await useUser();

  const event = await createEvent({
    command: 'DELETE_CATEGORY',
    categoryId,
  });
  const category = fromEvent(event);

  await dispatchEvent<TWithAuth<ICategory>>('CATEGORY_DELETED', { authId, ...category });

  return category;
}

export async function updateCategory({
  categoryId,
  categoryGroupId,
  name,
  order,
}: TOptional<ICategory, 'categoryGroupId' | 'name' | 'order'>) {
  Actor.assertRole('user');

  const { authId } = await useUser();

  const event = await createEvent({
    command: 'UPDATE_CATEGORY',
    categoryId,
    ...(categoryGroupId && { categoryGroupId }),
    ...(name && { name }),
    ...(order && { order }),
  });
  const category = fromEvent(event);

  await dispatchEvent<TWithAuth<ICategory>>('CATEGORY_UPDATED', { authId, ...category });

  return category;
}

export async function getCategories() {
  Actor.assertRole('user');

  const { authId } = await useUser();

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
