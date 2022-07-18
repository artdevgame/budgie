import { JSONResolver } from 'graphql-scalars';

import SchemaBuilder from '@pothos/core';

type TCustomBuilderType = {
  Context: {
    authId: string;
  };
  Scalars: {
    DateTime: { Input: Date; Output: Date };
    JSON: { Input: string; Output: unknown };
  };
};

export const builder = new SchemaBuilder<TCustomBuilderType>({});

builder.scalarType('DateTime', {
  serialize: (date) => date.toISOString(),
  parseValue: (date) => {
    if (typeof date !== 'string') {
      throw new Error('Invalid date, expected ISO 8601 string');
    }
    return new Date(date);
  },
});

builder.addScalarType('JSON', JSONResolver, {});

builder.queryType({});
builder.mutationType({});
