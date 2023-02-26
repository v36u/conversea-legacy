import dotenvFlow from 'dotenv-flow';
import { z } from 'zod';

export const configEnv = () => {
  dotenvFlow.config();

  const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
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
