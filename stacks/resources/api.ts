import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

import { Api, StackContext } from '@serverless-stack/resources';

export function getApi({ stack }: StackContext, environment: Record<string, string>) {
  const customDomain = !process.env.IS_LOCAL && {
    isExternalDomain: true,
    domainName: 'budgie.highsnr.dev',
    cdk: {
      certificate: Certificate.fromCertificateArn(
        stack,
        'highsnr.dev',
        'arn:aws:acm:us-east-1:807572323218:certificate/32d76744-faea-4524-ae82-b2e063853d54',
      ),
    },
  };

  return new Api(stack, 'ServerSide', {
    ...(customDomain && { customDomain }),
    cors: {
      allowCredentials: true,
      allowHeaders: ['content-type'],
      allowMethods: ['ANY'],
      allowOrigins: ['http://localhost:3000'],
    },
    defaults: {
      function: {
        environment: {
          ...environment,
          CACHE_URL: process.env.CACHE_URL,
          DATABASE_URL: process.env.DATABASE_URL,
          GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
          SENTRY_DSN: process.env.SENTRY_DSN,
        },
        bundle: {
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
