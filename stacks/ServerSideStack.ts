import { attachLambdaLayers } from './resources/layers';
import { getApi } from './resources/api';
import { getEventBus } from './resources/bus';
import { StackContext } from '@serverless-stack/resources';

export function ServerSideStack(context: StackContext) {
  const { stack } = context;

  attachLambdaLayers(context);

  const bus = getEventBus(context);
  const api = getApi(context, {
    BUS_NAME: bus.eventBusName,
  });

  api.attachPermissions([bus]);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}
