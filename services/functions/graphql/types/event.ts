import { Event } from '@budgie/core/models/event';
import { Event as IEvent } from '@prisma/client';

import { builder, TQueryFieldBuilder } from '../builder';

function getEvents(fieldBuilder: TQueryFieldBuilder) {
  return fieldBuilder.field({
    type: [BudgetType],
    resolve: async (_, {}, { authId }) => Event.getEvents(authId),
  });
}

const BudgetType = builder.objectRef<IEvent>('Event').implement({
  fields: (t) => ({
    id: t.exposeString('id'),
    data: t.expose('data', { type: 'JSON' }),
    sequence: t.exposeInt('sequence'),
    timestamp: t.expose('timestamp', { type: 'DateTime' }),
    version: t.exposeString('version'),
  }),
});

builder.queryFields((fieldBuilder) => ({
  events: getEvents(fieldBuilder),
}));
