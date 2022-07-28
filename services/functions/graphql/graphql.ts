import { GraphQLHandler } from '@serverless-stack/lambda/graphql/graphql';

import { schema } from './schema';

export const handler = GraphQLHandler({
  schema,
});
