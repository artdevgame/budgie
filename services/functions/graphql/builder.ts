import GraphQLJSON from 'graphql-type-json';

import SchemaBuilder, { MutationFieldBuilder } from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import { PrismaClient } from '@prisma/client';

import type PrismaTypes from '@pothos/plugin-prisma/generated';

type TCustomBuilderType = {
  Context: {
    authId: string;
  };
  PrismaTypes: PrismaTypes;
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

const prisma = new PrismaClient({});

export const builder = new SchemaBuilder<TCustomBuilderType>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

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
