import { cache } from "../../lib/cache";

interface ILedger {
  categoryId: string;
  txId: string;
  txReference: string;
  txInformation: string;
  amount: number;
  currency: string; // 3-letter ISO code
  amountDir: 'debit' | 'credit';
}

export async function getLedger(accountId: string) {
  try {
    const cacheResult = await cache.get(`account:${accountId}`);

    if (!cacheResult) {
      throw new Error(`No ledger for account: ${accountId}`);
    }

    return JSON.parse(cacheResult) as ILedger[];
  } catch (err) {
    // log error
    return []
  }
}