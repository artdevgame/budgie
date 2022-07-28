import { useEffect, useState } from 'react';
import {
    createClient, defaultExchanges, OperationContext, RequestPolicy, useMutation, useQuery
} from 'urql';

import {
    generateMutationOp, generateQueryOp, MutationRequest, MutationResult, QueryRequest, QueryResult
} from '@budgie/graphql/genql';

export { Provider as UrqlProvider } from 'urql';

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

const authToken = localStorage.getItem('x-budgie-auth');

export const urql = createClient({
  url: process.env.GRAPHQL_URL,
  exchanges: defaultExchanges,
  fetchOptions: {
    credentials: 'include',
    headers: {
      ...(authToken && { authorization: `Bearer ${authToken}` }),
    },
  },
});
