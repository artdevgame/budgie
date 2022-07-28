import { JSONResolver } from 'graphql-scalars';

import SchemaBuilder from '@pothos/core';

type TCustomBuilderType = {
  Context: {
    authId: string;
  };
  Scalars: {
    JSON: { Input: string; Output: unknown };
  };
};

export const builder = new SchemaBuilder<TCustomBuilderType>({});

builder.addScalarType('JSON', JSONResolver, {});

builder.queryType({});
builder.mutationType({});
