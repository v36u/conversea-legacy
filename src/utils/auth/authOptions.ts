import { verify } from 'argon2';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '~/server/prisma';
import { credentialsAuthSchema } from '~/utils/validation/auth';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Parolă',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        /* ------------------------- Data format validation ------------------------- */
        const schemaValidationResult =
          await credentialsAuthSchema.safeParseAsync(credentials);
        if (!schemaValidationResult.success) {
          return null;
        }
        const { emailOrUsername, password: plainPassword } =
          schemaValidationResult.data;

        /* ------------------------- Database user retrieval ------------------------ */
        const dbQueryResult = await prisma.user.findFirst({
          where: {
            OR: [
              {
                email: emailOrUsername,
              },
              {
                username: emailOrUsername,
              },
            ],
          },
        });
        if (!dbQueryResult) {
          return null;
        }
        const {
          id: userId,
          email: userEmail,
          username,
          password: hashedPassword,
        } = dbQueryResult;

        /* --------------------------- Password validation -------------------------- */
        const isValidPassword = await verify(hashedPassword, plainPassword);
        if (!isValidPassword) {
          return null;
        }

        /* ------------- Return data of successfully authenticated user ------------- */
        return {
          id: userId,
          email: userEmail,
          username,
        };
      },
    }),
  ],
  callbacks: {
    /**
     * @summary
     * This callback is called whenever a JSON Web Token is created (i.e., at sign in) or updated (i.e., whenever a session is accessed in the client).
     * The returned value will be encrypted, and it is stored in a cookie.
     *
     * @see https://next-auth.js.org/configuration/callbacks#jwt-callback
     */
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email;
        token.username = user.username;
      }

      return token;
    },
    /**
     * @summary
     * The session callback is called whenever a session is checked. By default, only a subset of the token is returned for increased security.
     * If you want to make something available you added to the token via the jwt() callback, you have to explicitly forward it here to make it available to the client.
     *
     * @see https://next-auth.js.org/configuration/callbacks#session-callback
     */
    session: async ({ session, token }) => {
      if (token) {
        session.user.email = token.email;
        session.user.username = token.username;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 60 * 60, // 15 days
  },
  pages: {
    signIn: '/auth/login/',
    signOut: '/auth/logout/',
    error: '/auth/error/',
    verifyRequest: '/auth/verify/',
    newUser: '/auth/new-user/',
  },
};
