import * as trpc from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession, Session } from 'next-auth';
import { nextAuthOptions } from '~/utils/auth/authOptions';
import { prisma } from './prisma';

/* -------------------------------------------------------------------------- */
/*       See https://trpc.io/docs/server/context#inner-and-outer-context      */
/* -------------------------------------------------------------------------- */

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  session: Session | null;
}

/**
 * Inner context is where you define context which doesn’t depend on the request, e.g. your database connection.
 * You can use this function for integration testing or SSG helpers, where you don’t have a request object.
 * Whatever is defined here will always be available in your procedures.
 */
export const createContextInner = async ({
  session,
}: CreateInnerContextOptions) => {
  return {
    prisma,
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  const contextInner = await createContextInner({ session });

  return {
    ...contextInner,
    req,
    res,
  };
};
