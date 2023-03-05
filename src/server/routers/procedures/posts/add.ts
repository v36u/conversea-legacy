import { z } from 'zod';
import { prisma } from '~/server/prisma';
import { publicProcedure } from '~/server/trpc';
import { defaultPostSelect } from './utils/selectors';

export const postsAdd = publicProcedure
  .input(
    z.object({
      id: z.string().uuid().optional(),
      title: z.string().min(1).max(32),
      text: z.string().min(1),
    }),
  )
  .mutation(async ({ input }) => {
    const post = await prisma.post.create({
      data: input,
      select: defaultPostSelect,
    });
    return post;
  });
