import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FC, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { nextAuthOptions } from '~/utils/auth/authOptions';
import HttpStatusCode from '~/utils/enums/HttpStatusCode';
import {
  CredentialsAuthFields,
  credentialsAuthSchema,
} from '~/utils/validation/auth';

const LoginPage: FC = () => {
  const { control, handleSubmit, formState } = useForm<CredentialsAuthFields>({
    resolver: zodResolver(credentialsAuthSchema),
    reValidateMode: 'onChange',
  });

  const onSubmit = useCallback(async (data: CredentialsAuthFields) => {
    await signIn('credentials', {
      ...data,
      callbackUrl: '/',
    });
  }, []);

  // TODO: Fix styling, because this used Mantine which has been uninstalled
  return (
    <div>
      <h1>Bine ai revenit!</h1>
      <p>
        Nu ai un cont? <Link href="/auth/register/">Înregistrează-te</Link>
      </p>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="emailOrUsername"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <>
                <label htmlFor="username">Email sau nume de utilizator</label>
                <input
                  {...field}
                  name="username"
                  placeholder="exemplu@website.ro"
                  required
                />
                <p>{formState.errors.emailOrUsername?.message}</p>
              </>
            )}
          />
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <>
                <label htmlFor="password">Parolă</label>
                <input
                  {...field}
                  type="password"
                  placeholder="Parola ta"
                  required
                />
                <p>{formState.errors.password?.message}</p>
              </>
            )}
          />
          <div>
            <label htmlFor="remember-me">Ține-mă minte</label>
            <input type="checkbox" name="remember-me" />
            <link href="/auth/forgot-password/">Ai uitat parola?</link>
          </div>
          <button type="submit">Autentificare</button>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  if (session) {
    return {
      redirect: {
        destination: '/',
        statusCode: HttpStatusCode.TEMPORARY_REDIRECT,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
