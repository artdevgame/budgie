import { User } from '@budgie/core/user';
import { AuthHandler, GoogleAdapter, Session } from '@serverless-stack/lambda/auth';

// import { useSentry } from '@budgie/core/lib/sentry';

declare module '@serverless-stack/lambda/auth' {
  export interface SessionTypes {
    user: {
      authId: string;
    };
  }
}

const main = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: 'oidc',
      clientID: process.env.GOOGLE_CLIENT_ID!,
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims();

        let user = await User.withAuthId(claims.sub);

        if (!user) {
          user = await User.createUser({
            authId: claims.sub,
            givenName: claims.given_name!,
            familyName: claims.family_name!,
            email: claims.email!,
            role: 'user',
            picture: claims.picture,
          });
        }

        return Session.parameter({
          redirect: 'http://localhost:3000/',
          type: 'user',
          properties: {
            authId: user.authId,
          },
          options: {
            expiresIn: 1000 * 60 * 60 * 24,
          },
        });
      },
    }),
  },
});

// export const handler: typeof main = useSentry(main);
export const handler = main;
