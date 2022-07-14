import { dispatchEvent } from '@budgie/core/helpers/dispatchEvent';
import { Budget, IBudget } from '@budgie/core/models/budget';
import { createEvent } from '@budgie/core/models/event';
import { TWithAuth } from '@budgie/core/types/TWithAuth';

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
    resolve: async (_, { date }, { authId }) => {
      const budget = await Budget.getBudget(authId, date);
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
    resolve: async (_, { amount, categoryId, date }, { authId }) => {
      const event = await createEvent({
        command: 'UPDATE_BUDGET',
        amount,
        categoryId,
        date,
      });
      const budget = Budget.fromEvent(event);

      await dispatchEvent<TWithAuth<IBudget>>('BUDGET_UPDATED', { authId, ...budget });

      return budget;
    },
  }),
}));
