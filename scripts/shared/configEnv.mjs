import dotenvFlow from 'dotenv-flow';
import dotenvExpand from 'dotenv-expand';
import { z } from 'zod';

export const configEnv = () => {
  dotenvExpand.expand(dotenvFlow.config());

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
