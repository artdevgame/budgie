import { PostAuthenticationTriggerEvent } from 'aws-lambda';

// import { useSentry } from '@budgie/core/lib/sentry';

const main = async (event: PostAuthenticationTriggerEvent) => {
  console.log('Post auth', event.request.userAttributes);

  return {
    statusCode: 200,
    body: `Hello`,
  };
};

// export const handler: typeof main = useSentry(main);
export const handler = main;
