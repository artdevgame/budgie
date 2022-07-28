import { IUser, User } from '@budgie/core/user';

import { builder } from '../builder';

const UserType = builder.objectRef<IUser>('User').implement({
  fields: (t) => ({
    email: t.exposeString('email'),
    familyName: t.exposeString('familyName'),
    givenName: t.exposeString('givenName'),
  }),
});

builder.queryFields((t) => ({
  user: t.field({
    type: UserType,
    resolve: () => User.me(),
    nullable: true,
  }),
}));

builder.mutationFields((t) => ({
  createUser: t.field({
    type: UserType,
    args: {
      authId: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
      familyName: t.arg.string({ required: true }),
      givenName: t.arg.string({ required: true }),
    },
    resolve: async (_, { authId, email, familyName, givenName }) =>
      User.createUser({ authId, email, familyName, givenName, role: 'user' }),
  }),
  updateUser: t.field({
    type: UserType,
    args: {
      email: t.arg.string(),
      familyName: t.arg.string(),
      givenName: t.arg.string(),
    },
    resolve: async (_, { email, familyName, givenName }) =>
      User.updateUser({
        ...(email && { email }),
        ...(familyName && { familyName }),
        ...(givenName && { givenName }),
      }),
  }),
}));
