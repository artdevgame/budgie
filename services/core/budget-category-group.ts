import { Event } from '@prisma/client';

import { Actor } from './actor';
import { createEvent } from './event';
import { dispatchEvent } from './helpers/dispatchEvent';
import { useUser } from './hooks/useUser';
import { cache } from './lib/cache';
import { TOptional } from './types/TOptional';
import { TWithAuth } from './types/TWithAuth';

export * as BudgetCategoryGroup from './budget-category-group';

export type TCategoryGroupId = string;

export interface ICategoryGroup {
  categoryGroupId: TCategoryGroupId;
  name: string;
  order: number;
}

export type TCategoryGroups = Record<TCategoryGroupId, TCategoryGroupEntry>;
export type TCategoryGroupEntry = Omit<ICategoryGroup, 'categoryGroupId'>;

export async function createGroup({ name, order }: TOptional<TCategoryGroupEntry, 'order'>) {
  Actor.assertRole('user');

  const { authId } = await useUser();

  const event = await createEvent({
    command: 'CREATE_CATEGORY_GROUP',
    name,
    ...(order && { order }),
  });
  const categoryGroup = fromEvent(event);

  await dispatchEvent<TWithAuth<ICategoryGroup>>('CATEGORY_GROUP_CREATED', { authId, ...categoryGroup });

  return categoryGroup;
}

export async function deleteGroup({ categoryGroupId }: Pick<ICategoryGroup, 'categoryGroupId'>) {
  Actor.assertRole('user');

  const { authId } = await useUser();

  const event = await createEvent({
    command: 'DELETE_CATEGORY_GROUP',
    categoryGroupId,
  });
  const categoryGroup = fromEvent(event);

  await dispatchEvent<TWithAuth<ICategoryGroup>>('CATEGORY_GROUP_DELETED', { authId, ...categoryGroup });

  return categoryGroup;
}

export async function updateGroup({ categoryGroupId, name, order }: TOptional<ICategoryGroup, 'name' | 'order'>) {
  Actor.assertRole('user');

  const { authId } = await useUser();

  const event = await createEvent({
    command: 'UPDATE_CATEGORY_GROUP',
    categoryGroupId,
    ...(name && { name }),
    ...(order && { order }),
  });
  const categoryGroup = fromEvent(event);

  await dispatchEvent<TWithAuth<ICategoryGroup>>('CATEGORY_GROUP_UPDATED', { authId, ...categoryGroup });

  return categoryGroup;
}

export async function getGroups() {
  Actor.assertRole('user');

  const { authId } = await useUser();

  try {
    const cacheResult = await cache.get(`categoryGroups:${authId}`);

    if (!cacheResult) {
      throw new Error(`No category groups for user: ${authId}`);
    }

    return JSON.parse(cacheResult) as TCategoryGroups;
  } catch (err) {
    // log error
    return {} as TCategoryGroups;
  }
}

export function fromEvent(event: Event) {
  const { categoryGroupId, name, order } = event.data as unknown as ICategoryGroup;
  return { categoryGroupId, name, order } as ICategoryGroup;
}
