import { dispatchEvent } from '@budgie/core/helpers/dispatchEvent';
import { createEvent } from '@budgie/core/models/event';
import { ITransaction, Ledger } from '@budgie/core/models/ledger';
import { TWithAuth } from '@budgie/core/types/TWithAuth';

import { builder, TMutationFieldBuilder, TQueryFieldBuilder } from '../builder';

function addTransaction(fieldBuilder: TMutationFieldBuilder) {
  return fieldBuilder.field({
    type: TransactionType,
    args: {
      accountId: fieldBuilder.arg.string({ required: true }),
      categoryId: fieldBuilder.arg.string(),
      txId: fieldBuilder.arg.string(),
      txReference: fieldBuilder.arg.string(),
      txInformation: fieldBuilder.arg.string(),
      amount: fieldBuilder.arg.int({ required: true }),
      currency: fieldBuilder.arg.string({ required: true }),
      amountDir: fieldBuilder.arg({ type: AmountDir, required: true }),
    },
    resolve: async (
      _,
      { accountId, categoryId, txId, txReference, txInformation, amount, currency, amountDir },
      { authId },
    ) => {
      const event = await createEvent({
        command: 'ADD_TRANSACTION',
        accountId,
        amount,
        amountDir,
        authId,
        currency,
        ...(categoryId && { categoryId }),
        ...(txId && { txId }),
        ...(txInformation && { txInformation }),
        ...(txReference && { txReference }),
      });
      const transaction = Ledger.fromEvent(event);

      await dispatchEvent<TWithAuth<ITransaction>>('TRANSACTION_ADDED', { authId, ...transaction });

      return transaction;
    },
  });
}

function getTransactions(fieldBuilder: TQueryFieldBuilder) {
  return fieldBuilder.field({
    type: [TransactionType],
    args: {
      accountId: fieldBuilder.arg.string({ required: true }),
    },
    resolve: (_, { accountId }, { authId }) => Ledger.getTransactions(authId, accountId),
  });
}

const AmountDir = builder.enumType('AmountDir', {
  values: ['credit', 'debit'] as const,
});

const TransactionType = builder.objectRef<ITransaction>('Transaction').implement({
  fields: (t) => ({
    accountId: t.exposeString('accountId'),
    categoryId: t.exposeString('categoryId'),
    txId: t.exposeString('txId', {
      description: 'Unique identifier for the transaction within an servicing institution.',
    }),
    txReference: t.exposeString('txReference', {
      description: 'Unique reference for the transaction. This reference is optionally populated.',
    }),
    txInformation: t.exposeString('txInformation', { description: 'Further details of the transaction' }),
    amount: t.exposeInt('amount', { description: 'A number of monetary units' }),
    currency: t.exposeString('currency', { description: 'Currency code (ISO-4217)' }),
    amountDir: t.expose('amountDir', { type: AmountDir, description: 'Supply "credit" or "debit"' }),
  }),
});

builder.queryFields((fieldBuilder) => ({
  transactions: getTransactions(fieldBuilder),
}));

builder.mutationFields((fieldBuilder) => ({
  addTransaction: addTransaction(fieldBuilder),
}));
