import GraphQLJSON from 'graphql-type-json';

import SchemaBuilder, { MutationFieldBuilder } from '@pothos/core';

type TCustomBuilderType = {
  Context: {
    authId: string;
  };
  Scalars: {
    DateTime: { Input: Date; Output: Date };
    JSON: { Input: string; Output: unknown };
  };
};
export type TMutationFieldBuilder = MutationFieldBuilder<PothosSchemaTypes.ExtendDefaultTypes<TCustomBuilderType>, {}>;
export type TQueryFieldBuilder = PothosSchemaTypes.QueryFieldBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<TCustomBuilderType>,
  {}
>;

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

builder.addScalarType('JSON', GraphQLJSON, {});
