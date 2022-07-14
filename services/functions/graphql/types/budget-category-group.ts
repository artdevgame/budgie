import { dispatchEvent } from '@budgie/core/helpers/dispatchEvent';
import { CategoryGroup, ICategoryGroup } from '@budgie/core/models/category-group';
import { createEvent } from '@budgie/core/models/event';
import { TWithAuth } from '@budgie/core/types/TWithAuth';

import { builder, TMutationFieldBuilder, TQueryFieldBuilder } from '../builder';

function createCategoryGroup(fieldBuilder: TMutationFieldBuilder) {
  return fieldBuilder.field({
    type: BudgetCategoryGroupType,
    args: {
      name: fieldBuilder.arg.string({ required: true }),
      order: fieldBuilder.arg.int({ defaultValue: 0 }),
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
  });
}

function deleteCategoryGroup(fieldBuilder: TMutationFieldBuilder) {
  return fieldBuilder.field({
    type: BudgetCategoryGroupType,
    args: {
      categoryGroupId: fieldBuilder.arg.string({ required: true }),
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
  });
}

function updateCategoryGroup(fieldBuilder: TMutationFieldBuilder) {
  return fieldBuilder.field({
    type: BudgetCategoryGroupType,
    args: {
      categoryGroupId: fieldBuilder.arg.string({ required: true }),
      name: fieldBuilder.arg.string(),
      order: fieldBuilder.arg.int(),
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
  });
}

function getCategoryGroups(fieldBuilder: TQueryFieldBuilder) {
  return fieldBuilder.field({
    type: [BudgetCategoryGroupType],
    resolve: async (_, {}, { authId }) => {
      const categoryGroups = await CategoryGroup.getCategoryGroups(authId);
      return Object.entries(categoryGroups).map(([categoryGroupId, categoryGroup]) => {
        return { ...categoryGroup, categoryGroupId };
      });
    },
  });
}

const BudgetCategoryGroupType = builder.objectRef<ICategoryGroup>('BudgetCategoryGroup').implement({
  fields: (t) => ({
    categoryGroupId: t.exposeString('categoryGroupId'),
    name: t.exposeString('name'),
    order: t.exposeInt('order'),
  }),
});

builder.queryFields((fieldBuilder) => ({
  categoryGroups: getCategoryGroups(fieldBuilder),
}));

builder.mutationFields((fieldBuilder) => ({
  createCategoryGroup: createCategoryGroup(fieldBuilder),
  deleteCategoryGroup: deleteCategoryGroup(fieldBuilder),
  updateCategoryGroup: updateCategoryGroup(fieldBuilder),
}));
