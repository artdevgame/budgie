import { Budget, IBudget } from '@budgie/core/budget';

import { builder } from '../builder';

const BudgetType = builder.objectRef<IBudget>('Budget').implement({
  fields: (t) => ({
    categoryId: t.exposeString('categoryId'),
    date: t.exposeString('date', { description: 'Date in ISO-8601 format (YYYY-MM-DD)' }),
    amount: t.exposeInt('amount', { description: 'Amount as a round number (smallest unit of the currency)' }),
  }),
});

builder.queryFields((t) => ({
  budget: t.field({
    type: [BudgetType],
    args: {
      date: t.arg.string({ required: true }),
    },
    resolve: async (_, { date }) => {
      const budget = await Budget.withDate(date);
      return Object.entries(budget).map(([categoryId, amount]) => {
        return { categoryId, date, amount };
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  upsertBudget: t.field({
    type: BudgetType,
    args: {
      categoryId: t.arg.string({ required: true }),
      date: t.arg.string({ required: true }),
      amount: t.arg.int({ required: true }),
    },
    resolve: async (_, { amount, categoryId, date }) => Budget.upsertBudget({ amount, categoryId, date }),
  }),
}));
