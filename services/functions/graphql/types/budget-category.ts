import { dispatchEvent } from '@budgie/core/helpers/dispatchEvent';
import { Category, ICategory } from '@budgie/core/models/category';
import { createEvent } from '@budgie/core/models/event';
import { TWithAuth } from '@budgie/core/types/TWithAuth';

import { builder, TMutationFieldBuilder, TQueryFieldBuilder } from '../builder';

function createCategory(fieldBuilder: TMutationFieldBuilder) {
  return fieldBuilder.field({
    type: BudgetCategoryType,
    args: {
      categoryGroupId: fieldBuilder.arg.string(),
      name: fieldBuilder.arg.string({ required: true }),
      order: fieldBuilder.arg.int({ defaultValue: 0 }),
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
  });
}

function deleteCategory(fieldBuilder: TMutationFieldBuilder) {
  return fieldBuilder.field({
    type: BudgetCategoryType,
    args: {
      categoryId: fieldBuilder.arg.string({ required: true }),
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
  });
}

function updateCategory(fieldBuilder: TMutationFieldBuilder) {
  return fieldBuilder.field({
    type: BudgetCategoryType,
    args: {
      categoryId: fieldBuilder.arg.string({ required: true }),
      categoryGroupId: fieldBuilder.arg.string(),
      name: fieldBuilder.arg.string(),
      order: fieldBuilder.arg.int(),
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
  });
}

function getCategories(fieldBuilder: TQueryFieldBuilder) {
  return fieldBuilder.field({
    type: [BudgetCategoryType],
    resolve: async (_, {}, { authId }) => {
      const categories = await Category.getCategories(authId);
      return Object.entries(categories).map(([categoryId, category]) => {
        return { ...category, categoryId };
      });
    },
  });
}

const BudgetCategoryType = builder.objectRef<ICategory>('BudgetCategory').implement({
  fields: (t) => ({
    categoryId: t.exposeString('categoryId'),
    categoryGroupId: t.exposeString('categoryGroupId'),
    name: t.exposeString('name'),
    order: t.exposeInt('order'),
  }),
});

builder.queryFields((fieldBuilder) => ({
  categories: getCategories(fieldBuilder),
}));

builder.mutationFields((fieldBuilder) => ({
  createCategory: createCategory(fieldBuilder),
  deleteCategory: deleteCategory(fieldBuilder),
  updateCategory: updateCategory(fieldBuilder),
}));
