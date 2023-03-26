/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { userRouter } from './user';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'OK'),

  user: userRouter,
});

export type AppRouter = typeof appRouter;
