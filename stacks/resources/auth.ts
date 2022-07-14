import { Auth, StackContext } from '@serverless-stack/resources';

export function getAuth({ stack }: StackContext) {
  return new Auth(stack, 'Auth', {
    login: ['email'],
    triggers: {
      postConfirmation: 'functions/auth/postAuthentication.handler',
    },
  });
}
