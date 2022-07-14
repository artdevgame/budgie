import { APIGatewayProxyHandlerV2WithJWTAuthorizer } from 'aws-lambda';

import { useSentry } from '@budgie/core/lib/sentry';

const main: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (event) => {
  return {
    statusCode: 200,
    body: `Hello ${event.requestContext.authorizer.jwt.claims.sub}!`,
  };
};

export const handler: typeof main = useSentry(main);
