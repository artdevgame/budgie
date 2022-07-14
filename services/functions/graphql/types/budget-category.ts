import { dispatchEvent } from '@budgie/core/helpers/dispatchEvent';
import { Category, ICategory } from '@budgie/core/models/category';
import { createEvent } from '@budgie/core/models/event';
import { TWithAuth } from '@budgie/core/types/TWithAuth';

import { builder } from '../builder';

const BudgetCategoryType = builder.objectRef<ICategory>('BudgetCategory').implement({
  fields: (t) => ({
    categoryId: t.exposeString('categoryId'),
    categoryGroupId: t.exposeString('categoryGroupId'),
    name: t.exposeString('name'),
    order: t.exposeInt('order'),
  }),
});

builder.queryFields((t) => ({
  categories: t.field({
    type: [BudgetCategoryType],
    resolve: async (_, {}, { authId }) => {
      const categories = await Category.getCategories(authId);
      return Object.entries(categories).map(([categoryId, category]) => {
        return { ...category, categoryId };
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createCategory: t.field({
    type: BudgetCategoryType,
    args: {
      categoryGroupId: t.arg.string(),
      name: t.arg.string({ required: true }),
      order: t.arg.int({ defaultValue: 0 }),
    },
    resolve: async (_, { categoryGroupId, name, order }, { authId }) => {
      const event = await createEvent({
        command: 'CREATE_CATEGORY',
        name,
        ...(categoryGroupId && { categoryGroupId }),
        ...(order && { order }),
      });
      const category = Category.fromEvent(event);

      await dispatchEvent<TWithAuth<ICategory>>('CATEGORY_CREATED', { authId, ...category });

      return category;
    },
  }),
  deleteCategory: t.field({
    type: BudgetCategoryType,
    args: {
      categoryId: t.arg.string({ required: true }),
    },
    resolve: async (_, { categoryId }, { authId }) => {
      const event = await createEvent({
        command: 'DELETE_CATEGORY',
        categoryId,
      });
      const category = Category.fromEvent(event);

      await dispatchEvent<TWithAuth<ICategory>>('CATEGORY_DELETED', { authId, ...category });

      return category;
    },
  }),
  updateCategory: t.field({
    type: BudgetCategoryType,
    args: {
      categoryId: t.arg.string({ required: true }),
      categoryGroupId: t.arg.string(),
      name: t.arg.string(),
      order: t.arg.int(),
    },
    resolve: async (_, { categoryId, categoryGroupId, name, order }, { authId }) => {
      const event = await createEvent({
        command: 'UPDATE_CATEGORY',
        categoryId,
        ...(categoryGroupId && { categoryGroupId }),
        ...(name && { name }),
        ...(order && { order }),
      });
      const category = Category.fromEvent(event);

      await dispatchEvent<TWithAuth<ICategory>>('CATEGORY_UPDATED', { authId, ...category });

      return category;
    },
  }),
}));
