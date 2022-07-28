import { BudgetCategoryGroup, ICategoryGroup } from '@budgie/core/budget-category-group';

import { builder } from '../builder';

const BudgetCategoryGroupType = builder.objectRef<ICategoryGroup>('BudgetCategoryGroup').implement({
  fields: (t) => ({
    categoryGroupId: t.exposeString('categoryGroupId'),
    name: t.exposeString('name'),
    order: t.exposeInt('order'),
  }),
});

builder.queryFields((t) => ({
  categoryGroups: t.field({
    type: [BudgetCategoryGroupType],
    resolve: async (_, {}) => {
      const categoryGroups = await BudgetCategoryGroup.getGroups();
      return Object.entries(categoryGroups).map(([categoryGroupId, categoryGroup]) => {
        return { ...categoryGroup, categoryGroupId };
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createCategoryGroup: t.field({
    type: BudgetCategoryGroupType,
    args: {
      name: t.arg.string({ required: true }),
      order: t.arg.int({ defaultValue: 0 }),
    },
    resolve: async (_, { name, order }) => BudgetCategoryGroup.createGroup({ name, ...(order && { order }) }),
  }),
  deleteCategoryGroup: t.field({
    type: BudgetCategoryGroupType,
    args: {
      categoryGroupId: t.arg.string({ required: true }),
    },
    resolve: async (_, { categoryGroupId }) => BudgetCategoryGroup.deleteGroup({ categoryGroupId }),
  }),
  updateCategoryGroup: t.field({
    type: BudgetCategoryGroupType,
    args: {
      categoryGroupId: t.arg.string({ required: true }),
      name: t.arg.string(),
      order: t.arg.int(),
    },
    resolve: async (_, { categoryGroupId, name, order }) =>
      BudgetCategoryGroup.updateGroup({ categoryGroupId, ...(name && { name }), ...(order && { order }) }),
  }),
}));
