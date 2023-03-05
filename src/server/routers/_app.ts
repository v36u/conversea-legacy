/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { postsRouter } from './posts';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'OK'),

  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
