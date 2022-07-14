import { Event } from '@prisma/client';

import { cache } from '../lib/cache';

export * as CategoryGroup from './category-group';

export type TCategoryGroupId = string;

export interface ICategoryGroup {
  categoryGroupId: TCategoryGroupId;
  name: string;
  order: number;
}

export type TCategoryGroups = Record<TCategoryGroupId, TCategoryGroupEntry>;
export type TCategoryGroupEntry = Omit<ICategoryGroup, 'categoryGroupId'>;

export async function getCategoryGroups(authId: string) {
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
