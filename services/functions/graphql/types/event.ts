import { Event } from '@budgie/core/event';
import { Event as IEvent } from '@prisma/client';

import { builder } from '../builder';

const EventType = builder.objectRef<IEvent>('Event').implement({
  fields: (t) => ({
    id: t.exposeString('id'),
    data: t.expose('data', { type: 'JSON' }),
    sequence: t.exposeInt('sequence'),
    timestamp: t.expose('timestamp', { type: 'DateTime' }),
    version: t.exposeString('version'),
  }),
});

builder.queryFields((t) => ({
  events: t.field({
    type: [EventType],
    resolve: async (_, {}, { authId }) => Event.getEvents(authId),
  }),
}));
