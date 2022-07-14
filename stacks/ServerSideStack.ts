import { StackContext } from '@serverless-stack/resources';

import { getApi } from './resources/api';
import { getAuth } from './resources/auth';
import { getEventBus } from './resources/bus';
import { attachLambdaLayers } from './resources/layers';

export function ServerSideStack(context: StackContext) {
  const { stack } = context;

  attachLambdaLayers(context);

  const auth = getAuth(context);
  const bus = getEventBus(context);
  const api = getApi(context, {
    BUS_NAME: bus.eventBusName,
  });

  api.attachPermissions([bus]);
  auth.attachPermissionsForAuthUsers([api]);

  stack.addOutputs({
    ApiEndpoint: api.url,
    IdentityPoolId: auth.cognitoIdentityPoolId!,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  return api;
}
