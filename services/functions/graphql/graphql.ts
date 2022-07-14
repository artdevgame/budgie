import { APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';

import { createGQLHandler } from '@serverless-stack/node/graphql';

import { schema } from './schema';

export const handler = createGQLHandler({
  context: async ({ event }) => {
    const { requestContext } = event as unknown as APIGatewayProxyWithCognitoAuthorizerEvent;

    console.log('GQL handler', requestContext);

    return { authId: undefined };
  },
  schema,
});
