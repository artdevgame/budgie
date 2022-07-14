import { Handler } from 'aws-lambda';

import { CaptureConsole as CaptureConsoleIntegration } from '@sentry/integrations';
import * as Sentry from '@sentry/serverless';

export const useSentry = (handler: Handler) => {
  if (process.env.IS_LOCAL) {
    return handler;
  }

  Sentry.AWSLambda.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new CaptureConsoleIntegration({
        levels: ['warn', 'error'],
      }),
    ],
    // tracesSampleRate: 0.1,
  });

  return Sentry.AWSLambda.wrapHandler(handler);
};
