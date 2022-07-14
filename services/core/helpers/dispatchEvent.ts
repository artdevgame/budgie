import { bus } from '@budgie/core/lib/bus';

import { TEventName } from '../types/TEventName';

export function dispatchEvent<TPayload = unknown>(eventName: TEventName, payload: TPayload) {
  return bus.putEvents({
    Entries: [
      {
        EventBusName: process.env.BUS_NAME,
        Source: `budgie:${eventName}`,
        DetailType: 'Account',
        Detail: JSON.stringify(payload),
      },
    ],
  });
}
