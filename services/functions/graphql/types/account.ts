import { dispatchEvent } from '@budgie/core/helpers/dispatchEvent';
import { Account, IAccount } from '@budgie/core/models/account';
import { createEvent } from '@budgie/core/models/event';
import { TWithAuth } from '@budgie/core/types/TWithAuth';

import { builder } from '../builder';

const AccountType = builder.objectRef<IAccount>('Account').implement({
  fields: (t) => ({
    accountId: t.exposeString('accountId'),
    name: t.exposeString('name'),
    active: t.exposeBoolean('active', { description: 'Has this account been closed?' }),
  }),
});

builder.queryFields((t) => ({
  accounts: t.field({
    type: [AccountType],
    resolve: async (_, {}, { authId }) => {
      const accounts = await Account.getAccounts(authId);
      return Object.entries(accounts).map(([accountId, account]) => {
        return { ...account, accountId };
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createAccount: t.field({
    type: AccountType,
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (_, { name }, { authId }) => {
      const event = await createEvent({ command: 'CREATE_ACCOUNT', name });
      const account = Account.fromEvent(event);

      await dispatchEvent<TWithAuth<IAccount>>('ACCOUNT_CREATED', { authId, ...account });

      return account;
    },
  }),
  updateAccount: t.field({
    type: AccountType,
    args: {
      accountId: t.arg.string({ required: true }),
      name: t.arg.string({ required: true }),
    },
    resolve: async (_, { accountId, name }, { authId }) => {
      const event = await createEvent({
        command: 'UPDATE_ACCOUNT',
        accountId,
        name,
      });
      const account = Account.fromEvent(event);

      await dispatchEvent<TWithAuth<IAccount>>('ACCOUNT_UPDATED', { authId, ...account });

      return account;
    },
  }),
  closeAccount: t.field({
    type: AccountType,
    args: {
      accountId: t.arg.string({ required: true }),
    },
    resolve: async (_, { accountId }, { authId }) => {
      const event = await createEvent({
        command: 'CLOSE_ACCOUNT',
        accountId,
      });
      const account = Account.fromEvent(event);

      await dispatchEvent<TWithAuth<IAccount>>('ACCOUNT_CLOSED', { authId, ...account });

      return account;
    },
  }),
}));
