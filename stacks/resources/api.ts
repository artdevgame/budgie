import { Api, StackContext } from '@serverless-stack/resources';

export function getApi({ app, stack }: StackContext, environment: Record<string, string>) {
  return new Api(stack, 'ServerSide', {
    defaults: {
      authorizer: 'iam',
      function: {
        environment: {
          ...environment,
          DATABASE_URL: process.env.DATABASE_URL,
          CACHE_URL: process.env.CACHE_URL,
          SENTRY_DSN: process.env.SENTRY_DSN,
        },
        bundle: {
          // Only reference external modules when deployed
          externalModules: app.local ? [] : ['@prisma/client', '.prisma'],
          format: 'esm',
        },
      },
    },
    routes: {
      'POST /graphql': {
        type: 'pothos',
        authorizer: 'none',
        function: {
          handler: 'functions/graphql/graphql.handler',
        },
        schema: 'services/functions/graphql/schema.ts',
        output: 'graphql/schema.graphql',
        commands: ['npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm'],
      },
      'ANY /auth/{proxy+}': 'functions/auth/auth.handler',
    },
  });
}
