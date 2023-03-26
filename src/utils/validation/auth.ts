import { z } from 'zod';

export const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(32),
});

export const userInfoSchema = z.object({
  username: z.string().min(2).max(64),
});

export const credentialsAuthSchema = z.object({
  emailOrUsername: registrationSchema.shape.email.or(
    userInfoSchema.shape.username,
  ),
  password: registrationSchema.shape.password,
});
