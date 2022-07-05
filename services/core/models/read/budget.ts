import { cache } from "../../lib/cache";

type TBudgetDate = string;

type TBudget = Record<TBudgetDate, number>;

export async function getBudget(categoryId: string, date: string) {
  try {
    const cacheResult = await cache.get(`budget:${categoryId}`);

    if (!cacheResult) {
      throw new Error(`No budget for category: ${categoryId}`);
    }

    const all = JSON.parse(cacheResult) as TBudget;
    const budget = all[date];

    if (!budget) {
      return 0;
    }

    return Number(budget);
  } catch (err) {
    // log error
    return 0
  }
}