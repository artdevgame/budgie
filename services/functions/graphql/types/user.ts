import { dispatchEvent } from '@budgie/core/helpers/dispatchEvent';
import { createEvent } from '@budgie/core/models/event';
import { IUser, User } from '@budgie/core/models/user';

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
    resolve: (_, {}, { authId }) => User.getUser(authId),
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
    resolve: async (_, { authId, email, familyName, givenName }) => {
      const event = await createEvent({
        command: 'CREATE_USER',
        authId,
        email,
        familyName,
        givenName,
      });
      const user = User.fromEvent(event);

      await dispatchEvent<IUser>('USER_CREATED', user);

      return user;
    },
  }),
  updateUser: t.field({
    type: UserType,
    args: {
      email: t.arg.string(),
      familyName: t.arg.string(),
      givenName: t.arg.string(),
    },
    resolve: async (_, { email, familyName, givenName }, { authId }) => {
      const event = await createEvent({
        command: 'UPDATE_USER',
        authId,
        ...(email && { email }),
        ...(familyName && { familyName }),
        ...(givenName && { givenName }),
      });
      const user = User.fromEvent(event);

      await dispatchEvent('USER_UPDATED', user);

      return user;
    },
  }),
}));
