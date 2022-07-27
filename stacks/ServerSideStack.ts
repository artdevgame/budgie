import { StackContext } from '@serverless-stack/resources';

import { getApi } from './resources/api';
import { getEventBus } from './resources/bus';
import { attachLambdaLayers } from './resources/layers';

export function ServerSideStack(context: StackContext) {
  const { stack } = context;

  attachLambdaLayers(context);

  const bus = getEventBus(context);
  const api = getApi(context, {
    BUS_NAME: bus.eventBusName,
  });

  // api needs permissions to publish to the bus
  api.attachPermissions([bus]);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}
