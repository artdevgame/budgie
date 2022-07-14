import { StackContext, use, ViteStaticSite } from '@serverless-stack/resources';
import { ServerSideStack } from './ServerSideStack';

export function ClientSideStack({ stack }: StackContext) {
  const api = use(ServerSideStack);

  const site = new ViteStaticSite(stack, 'ClientSide', {
    path: 'web',
    buildCommand: 'npm run build',
    environment: {
      VITE_GRAPHQL_URL: api.url + '/graphql',
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });

  return api;
}
