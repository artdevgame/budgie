import { dispatchEvent } from '@budgie/core/helpers/dispatchEvent';
import { CategoryGroup, ICategoryGroup } from '@budgie/core/models/category-group';
import { createEvent } from '@budgie/core/models/event';
import { TWithAuth } from '@budgie/core/types/TWithAuth';

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
    resolve: async (_, {}, { authId }) => {
      const categoryGroups = await CategoryGroup.getCategoryGroups(authId);
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
    resolve: async (_, { name, order }) => {
      const event = await createEvent({
        command: 'CREATE_CATEGORY_GROUP',
        name,
        ...(order && { order }),
      });
      const categoryGroup = CategoryGroup.fromEvent(event);

      await dispatchEvent('CATEGORY_GROUP_CREATED', categoryGroup);

      return categoryGroup;
    },
  }),
  deleteCategoryGroup: t.field({
    type: BudgetCategoryGroupType,
    args: {
      categoryGroupId: t.arg.string({ required: true }),
    },
    resolve: async (_, { categoryGroupId }, { authId }) => {
      const event = await createEvent({
        command: 'DELETE_CATEGORY_GROUP',
        categoryGroupId,
      });
      const categoryGroup = CategoryGroup.fromEvent(event);

      await dispatchEvent<TWithAuth<ICategoryGroup>>('CATEGORY_GROUP_DELETED', { authId, ...categoryGroup });

      return categoryGroup;
    },
  }),
  updateCategoryGroup: t.field({
    type: BudgetCategoryGroupType,
    args: {
      categoryGroupId: t.arg.string({ required: true }),
      name: t.arg.string(),
      order: t.arg.int(),
    },
    resolve: async (_, { categoryGroupId, name, order }, { authId }) => {
      const event = await createEvent({
        command: 'UPDATE_CATEGORY_GROUP',
        categoryGroupId,
        ...(name && { name }),
        ...(order && { order }),
      });
      const categoryGroup = CategoryGroup.fromEvent(event);

      await dispatchEvent<TWithAuth<ICategoryGroup>>('CATEGORY_GROUP_UPDATED', { authId, ...categoryGroup });

      return categoryGroup;
    },
  }),
}));
