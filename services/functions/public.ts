import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import { useSentry } from '@budgie/core/lib/sentry';

const main: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: `Hello, World! Your request was received at ${event.requestContext.time}.`,
  };
};

export const handler: typeof main = useSentry(main);
