import { Kysely, MysqlDialect, Selectable } from 'kysely';
import mysql from 'mysql2';

import { IEventEntity } from '../event';

export interface IDatabase {
  events: IEventEntity;
}

export type TRow = {
  [Key in keyof IDatabase]: Selectable<IDatabase[Key]>;
};

let pool: mysql.Pool;

export const getPool = async () => {
  if (pool) {
    return pool;
  }
  pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    queueLimit: 0,
    connectionLimit: 5,
  });
  return pool;
};

export const database = new Kysely<IDatabase>({
  dialect: new MysqlDialect({
    pool: await getPool(),
  }),
});
