import { APIGatewayProxyWithCognitoAuthorizerHandler } from 'aws-lambda';

import { useSentry } from '@budgie/core/lib/sentry';

const main: APIGatewayProxyWithCognitoAuthorizerHandler = async (event) => {
  const { authorizer } = event.requestContext;

  console.log('Private route', authorizer);

  return {
    statusCode: 200,
    body: `Hello Private`,
  };
};

export const handler: typeof main = useSentry(main);
