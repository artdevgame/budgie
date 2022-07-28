import { Event, IEventEntity } from '@budgie/core/event';

import { builder } from '../builder';

const EventType = builder.objectRef<IEventEntity>('Event').implement({
  fields: (t) => ({
    id: t.exposeString('id'),
    data: t.expose('data', { type: 'JSON' }),
    sequence: t.exposeInt('sequence'),
    timestamp: t.exposeString('timestamp'),
    version: t.exposeString('version'),
  }),
});

builder.queryFields((t) => ({
  events: t.field({
    type: [EventType],
    resolve: async (_, {}, { authId }) => Event.getEvents({ authId }),
  }),
}));
