import { dispatchEvent } from '@budgie/core/helpers/dispatchEvent';
import { createEvent } from '@budgie/core/models/event';
import { IUser, User } from '@budgie/core/models/user';

import { builder, TMutationFieldBuilder, TQueryFieldBuilder } from '../builder';

function createUser(fieldBuilder: TMutationFieldBuilder) {
  return fieldBuilder.field({
    type: UserType,
    args: {
      authId: fieldBuilder.arg.string({ required: true }),
      email: fieldBuilder.arg.string({ required: true }),
      familyName: fieldBuilder.arg.string({ required: true }),
      givenName: fieldBuilder.arg.string({ required: true }),
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
  });
}

function updateUser(fieldBuilder: TMutationFieldBuilder) {
  return fieldBuilder.field({
    type: UserType,
    args: {
      email: fieldBuilder.arg.string(),
      familyName: fieldBuilder.arg.string(),
      givenName: fieldBuilder.arg.string(),
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
  });
}

function getUser(fieldBuilder: TQueryFieldBuilder) {
  return fieldBuilder.field({
    type: UserType,
    resolve: (_, {}, { authId }) => User.getUser(authId),
  });
}

const UserType = builder.objectRef<IUser>('Account').implement({
  fields: (t) => ({
    email: t.exposeString('email'),
    familyName: t.exposeString('familyName'),
    givenName: t.exposeString('givenName'),
  }),
});

builder.queryFields((fieldBuilder) => ({
  user: getUser(fieldBuilder),
}));

builder.mutationFields((fieldBuilder) => ({
  createUser: createUser(fieldBuilder),
  updateUser: updateUser(fieldBuilder),
}));
