import { cache } from "../../lib/cache";

interface IUser {
  userId: string;
  givenName: string;
  familyName: string;
  email: string;
}

export async function getUser(authId: string) {
  const cacheResult = await cache.get(`user:${authId}`);

  if (!cacheResult) {
    throw new Error(`No user with authId: ${authId}`);
  }

  return JSON.parse(cacheResult) as IUser[];
}