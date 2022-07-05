import { cache } from '../../lib/cache';

interface IAccount {
  name: string;
  active: boolean;
}

export async function getAccounts(userId: string) {
  try {
    const cacheResult = await cache.get(`account:${userId}`);

    if (!cacheResult) {
      throw new Error(`No accounts for user: ${userId}`);
    }

    return JSON.parse(cacheResult) as IAccount[];
  } catch (err) {
    // log error
    return []
  }
}