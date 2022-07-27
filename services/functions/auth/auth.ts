import { User } from '@budgie/core/models/user';
import { AuthHandler, GoogleAdapter, Session } from '@serverless-stack/lambda/auth';

// import { useSentry } from '@budgie/core/lib/sentry';

const main = AuthHandler({
  providers: {
    google: {
      adapter: GoogleAdapter,
      clientID: process.env.GOOGLE_CLIENT_ID!,
      onSuccess: async (claims) => {
        let user = await User.withAuthId(claims.sub);

        if (!user) {
          user = await User.createUser({
            authId: claims.sub,
            givenName: claims.given_name!,
            familyName: claims.family_name!,
            email: claims.email!,
          });
        }

        const token = Session.create({
          type: 'user',
          properties: {
            authId: user.authId,
          },
          options: {
            expiresIn: 1000 * 60 * 60 * 24,
          },
        });

        return {
          statusCode: 302,
          headers: {
            location: `http://localhost:5173?token=${token}`,
          },
        };
      },
    },
  },
});

// export const handler: typeof main = useSentry(main);
export const handler = main;
