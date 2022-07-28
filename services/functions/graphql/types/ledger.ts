import { ITransaction, Ledger } from '@budgie/core/ledger';

import { builder } from '../builder';

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

builder.queryFields((t) => ({
  transactions: t.field({
    type: [TransactionType],
    args: {
      accountId: t.arg.string({ required: true }),
    },
    resolve: (_, { accountId }) => Ledger.withAccountId({ accountId }),
  }),
}));

builder.mutationFields((t) => ({
  addTransaction: t.field({
    type: TransactionType,
    args: {
      accountId: t.arg.string({ required: true }),
      categoryId: t.arg.string(),
      txId: t.arg.string(),
      txReference: t.arg.string(),
      txInformation: t.arg.string(),
      amount: t.arg.int({ required: true }),
      currency: t.arg.string({ required: true }),
      amountDir: t.arg({ type: AmountDir, required: true }),
    },
    resolve: async (_, { accountId, categoryId, txId, txReference, txInformation, amount, currency, amountDir }) =>
      Ledger.addTransaction({
        accountId,
        amount,
        amountDir,
        currency,
        ...(categoryId && { categoryId }),
        ...(txId && { txId }),
        ...(txInformation && { txInformation }),
        ...(txReference && { txReference }),
      }),
  }),
}));
