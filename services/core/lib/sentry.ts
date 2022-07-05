import { CaptureConsole as CaptureConsoleIntegration } from '@sentry/integrations';
import * as Sentry from '@sentry/serverless';
import { Handler } from 'aws-lambda';

export const useSentry = (handler: Handler) => {
  if (process.env.IS_LOCAL) {
    return handler;
  }

  Sentry.AWSLambda.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new CaptureConsoleIntegration({
      levels: ['warn', 'error']
    })],
  })

  return Sentry.AWSLambda.wrapHandler(handler);
}