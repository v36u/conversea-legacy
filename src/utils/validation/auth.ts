import { z } from 'zod';

/* -------------------------------------------------------------------------- */
/*                            See https://zod.dev/                            */
/* -------------------------------------------------------------------------- */

const emailValidation = z
  .string({
    invalid_type_error: 'Email invalid.',
    required_error: 'Acest câmp este obligatoriu.',
  })
  .email({
    message: 'Email invalid.',
  });

const minPasswordCharacters = 4;
const maxPasswordCharacters = 32;
const passwordValidation = z
  .string({
    required_error: 'Parolă invalidă.',
  })
  .min(minPasswordCharacters, {
    message: `Parola trebuie să conțină minim ${minPasswordCharacters} caractere.`,
  })
  .max(maxPasswordCharacters, {
    message: `Parola trebuie să conțină maxim ${maxPasswordCharacters} caractere.`,
  });

const minUsernameCharacters = 2;
const maxUsernameCharacters = 64;
const usernameValidation = z
  .string({
    required_error: 'Acest câmp este obligatoriu.',
  })
  .min(minUsernameCharacters, {
    message: `Numele de utilizator trebuie să conțină minim ${minUsernameCharacters} caractere.`,
  })
  .max(maxUsernameCharacters, {
    message: `Numele de utilizator trebuie să conțină maxim ${maxUsernameCharacters} caractere.`,
  });

/* -------------------------------------------------------------------------- */

export const registrationSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Te rugăm să introduci aceeași parolă ca mai sus.',
        path: ['confirmPassword'],
      });
    }
  });

export type RegistrationFields = z.infer<typeof registrationSchema>;

/* -------------------------------------------------------------------------- */

export const credentialsAuthSchema = z.object({
  emailOrUsername: emailValidation.or(usernameValidation),
  password: passwordValidation,
});

export type CredentialsAuthFields = z.infer<typeof credentialsAuthSchema>;

/* -------------------------------------------------------------------------- */

export const userInfoSchema = z.object({
  username: usernameValidation,
});

export type UserInfoFields = z.infer<typeof userInfoSchema>;
