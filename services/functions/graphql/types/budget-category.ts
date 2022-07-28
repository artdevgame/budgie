import { BudgetCategory, ICategory } from '@budgie/core/budget-category';

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
    resolve: async (_, {}) => {
      const categories = await BudgetCategory.getCategories();
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
    resolve: async (_, { categoryGroupId, name, order }) =>
      BudgetCategory.createCategory({
        name,
        ...(categoryGroupId && { categoryGroupId }),
        ...(order && { order }),
      }),
  }),
  deleteCategory: t.field({
    type: BudgetCategoryType,
    args: {
      categoryId: t.arg.string({ required: true }),
    },
    resolve: async (_, { categoryId }) => BudgetCategory.deleteCategory({ categoryId }),
  }),
  updateCategory: t.field({
    type: BudgetCategoryType,
    args: {
      categoryId: t.arg.string({ required: true }),
      categoryGroupId: t.arg.string(),
      name: t.arg.string(),
      order: t.arg.int(),
    },
    resolve: async (_, { categoryId, categoryGroupId, name, order }) =>
      BudgetCategory.updateCategory({
        categoryId,
        ...(categoryGroupId && { categoryGroupId }),
        ...(name && { name }),
        ...(order && { order }),
      }),
  }),
}));
