import dotenvExpand from 'dotenv-expand';
import { z } from 'zod';

export const configEnv = () => {
  /**
   * Because `dotenv-flow` is called as a command via the cli, it is no longer
   * required to call `dotenvFlow.config()` because the vars have already been added.
   * Now, we just need to expand them.
   */
  dotenvExpand.expand({
    parsed: {
      ...process.env,
    },
  });

  const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']),
    PRISMA_DATABASE_URL: z.string().url(),
  });

  const envSchemaValidationResult = envSchema.safeParse(process.env);

  if (!envSchemaValidationResult.success) {
    console.error(
      '❌ Invalid environment variables:',
      JSON.stringify(envSchemaValidationResult.error.format(), null, 4),
    );
    process.exit(1);
  }
};
