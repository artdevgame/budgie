import { useEffect, useState } from 'react';
import {
    createClient, defaultExchanges, OperationContext, RequestPolicy, useMutation, useQuery
} from 'urql';

import {
    generateMutationOp, generateQueryOp, MutationRequest, MutationResult, QueryRequest, QueryResult
} from '@budgie/graphql/genql';

export function useTypedQuery<Query extends QueryRequest>(opts: {
  query: Query;
  requestPolicy?: RequestPolicy;
  context?: Partial<OperationContext>;
  pause?: boolean;
}) {
  const { query, variables } = generateQueryOp(opts.query);
  return useQuery<QueryResult<Query>>({
    ...opts,
    query,
    variables,
  });
}

export function useTypedMutation<Variables extends Record<string, any>, Mutation extends MutationRequest>(
  builder: (vars: Variables) => Mutation,
) {
  const [mutation, setMutation] = useState<string>();
  const [variables, setVariables] = useState<any>();
  const [result, execute] = useMutation<MutationResult<Mutation>, Variables>(mutation as any);

  function executeWrapper(vars: Variables) {
    const mut = builder(vars);
    const { query, variables } = generateMutationOp(mut);
    setMutation(query);
    setVariables(variables);
  }

  useEffect(() => {
    if (!mutation) return;
    execute(variables).then(() => setMutation(undefined));
  }, [mutation]);

  return [result, executeWrapper] as const;
}

let authToken;

if (typeof window !== 'undefined') {
  const token = new URLSearchParams(window.location.search).get('token');

  if (token) {
    window.localStorage.setItem('x-budgie-auth', token);
  }

  authToken = window.localStorage.getItem('x-budgie-auth');
}

export const urql = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  exchanges: defaultExchanges,
  fetchOptions: {
    // credentials: 'include',
    headers: {
      ...(authToken && { authorization: `Bearer ${authToken}` }),
    },
  },
});
