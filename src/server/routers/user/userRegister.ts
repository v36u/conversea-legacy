import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { publicProcedure } from '~/server/trpc';
import HttpStatusCode from '~/utils/enums/HttpStatusCode';
import { registrationSchema } from '~/utils/validation/auth';

export const userRegister = publicProcedure
  .input(registrationSchema)
  .mutation(async ({ input, ctx }) => {
    const { email, password } = input;

    /* ---------------------- Check if user already exists ---------------------- */
    const existingUser = await ctx.prisma.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Acest email este deja asociat unui cont.',
      });
    }

    /* ----------------------------- Create new user ---------------------------- */
    const hashedPassword = await hash(password);
    const creationResult = await ctx.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return {
      status: HttpStatusCode.CREATED,
      message: 'Cont creat cu succes.',
      result: creationResult.email,
    };
  });
