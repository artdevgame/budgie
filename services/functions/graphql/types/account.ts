import { Account, IAccount } from '@budgie/core/account';

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
    resolve: async (_, {}) => {
      const accounts = await Account.getAccounts();
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
    resolve: async (_, { name }) => Account.createAccount({ name }),
  }),
  updateAccount: t.field({
    type: AccountType,
    args: {
      accountId: t.arg.string({ required: true }),
      name: t.arg.string({ required: true }),
    },
    resolve: async (_, { accountId, name }) => Account.updateAccount({ accountId, name }),
  }),
  closeAccount: t.field({
    type: AccountType,
    args: {
      accountId: t.arg.string({ required: true }),
    },
    resolve: async (_, { accountId }) => Account.closeAccount({ accountId }),
  }),
}));
