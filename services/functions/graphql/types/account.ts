import { createEvent } from "@budgie/core/models/write/event";
import { builder } from "../builder";
import { ulid } from "ulid";
import { MutationFieldBuilder } from "@pothos/core";

type TMutationFieldBuilder = MutationFieldBuilder<PothosSchemaTypes.ExtendDefaultTypes<{}>, {}>;
type TQueryFieldBuilder = PothosSchemaTypes.QueryFieldBuilder<PothosSchemaTypes.ExtendDefaultTypes<{}>, {}>;

function createAccount(fieldBuilder: TMutationFieldBuilder) {
  return fieldBuilder.field({
    type: AccountType,
    args: {
      name: fieldBuilder.arg.string({ required: true })
    },
    resolve: async (_, args) => {
      const account = {
        accountId: ulid(),
        active: true,
        name: args.name,
      };

      await createEvent({ command: 'CREATE_ACCOUNT', name: args.name })
      return account;
    }
  });
}

function updateAccount(fieldBuilder: TMutationFieldBuilder) {
  return fieldBuilder.field({
    type: AccountType,
    args: {
      accountId: fieldBuilder.arg.string({ required: true }),
      name: fieldBuilder.arg.string({ required: true })
    },
    resolve: async (_, args) => {
      const account = {
        accountId: args.accountId,
        active: true,
        name: args.name,
      };

      await createEvent('UPDATE_ACCOUNT', account)
      return account;
    }
  });
}

function closeAccount(fieldBuilder: TMutationFieldBuilder) {
  return fieldBuilder.field({
    type: AccountType,
    args: {
      accountId: fieldBuilder.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      const account = {
        accountId: args.accountId,
        active: false,
      };

      await createEvent('CLOSE_ACCOUNT', account)
      return account;
    }
  });
}

function getAccounts(fieldBuilder: TQueryFieldBuilder) {
  return fieldBuilder.field({
    type: [AccountType],
    resolve: () => Article.list()
  })
}

const AccountType = builder.objectRef<IAccount>("Account").implement({
  fields: t => ({
    accountId: t.exposeString("accountId"),
    name: t.exposeString("name"),
    active: t.exposeBoolean('active')
  })
});

builder.queryFields(fieldBuilder => ({
  accounts: getAccounts(fieldBuilder)
}));

builder.mutationFields(fieldBuilder => ({
  createAccount: createAccount(fieldBuilder),
  updateAccount: updateAccount(fieldBuilder),
  closeAccount: closeAccount(fieldBuilder),
}))
