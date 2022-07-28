import { NextjsSite, StackContext, use } from '@serverless-stack/resources';

import { ServerSideStack } from './ServerSideStack';

export function ClientSideStack({ stack }: StackContext) {
  const api = use(ServerSideStack);

  const site = new NextjsSite(stack, 'ClientSide', {
    path: 'web',
    environment: {
      NEXT_PUBLIC_GRAPHQL_URL: api.url + '/graphql',
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });

  return api;
}
