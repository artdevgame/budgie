import SchemaBuilder from '@pothos/core';
import GraphQLJSON from 'graphql-type-json'
import { PrismaClient } from '@prisma/client';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';

const prisma = new PrismaClient({});

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: { Input: Date; Output: Date; },
    JSON: { Input: string; Output: unknown; },
  }
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

builder.scalarType('DateTime', {
  serialize: (date) => date.toISOString(),
  parseValue: (date) => {
    if (typeof date !== 'string') {
      throw new Error('Invalid date, expected ISO 8601 string')
    }
    return new Date(date)
  },
})

builder.addScalarType('JSON', GraphQLJSON, {});
