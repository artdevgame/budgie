import { useTypedQuery } from 'lib/urql';

export const useUser = () => {
  const [{ data, ...queryState }] = useTypedQuery({
    query: {
      user: {
        email: true,
        familyName: true,
        givenName: true,
        picture: true,
      },
    },
  });

  const user = data?.user;

  return [user, queryState] as const;
};
