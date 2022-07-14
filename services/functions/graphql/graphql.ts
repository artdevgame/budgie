import { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

import { createGQLHandler } from '@serverless-stack/node/graphql';

import { schema } from './schema';

export const handler = createGQLHandler({
  context: async ({ event }) => {
    const { requestContext } = event as APIGatewayProxyEventV2WithJWTAuthorizer;
    return { authId: requestContext.authorizer.jwt.claims.sub };
  },
  schema,
});
