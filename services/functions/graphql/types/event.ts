import { builder } from '../builder'

builder.prismaObject('Event', {
  name: 'Event',
  fields: (t) => ({
    id: t.exposeID('id'),
    data: t.expose('data', { type: 'JSON' }),
    sequence: t.exposeInt('sequence'),
    timestamp: t.expose('timestamp', { type: 'DateTime' }),
    version: t.exposeString('version'),
  })
})