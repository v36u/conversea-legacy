import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { nextAuthOptions } from '~/utils/auth/authOptions';
import HttpStatusCode from '~/utils/enums/HttpStatusCode';
import { trpc } from '~/utils/trpc';
import {
  RegistrationFields,
  registrationSchema,
} from '~/utils/validation/auth';

const RegisterPage: FC = () => {
  const { push } = useRouter();

  const { control, handleSubmit, formState } = useForm<RegistrationFields>({
    resolver: zodResolver(registrationSchema),
    reValidateMode: 'onChange',
  });

  const { mutateAsync: registerAsync } = trpc.user.register.useMutation();

  // TODO: Fix styling, because this used Mantine which has been uninstalled
  const onSubmit = useCallback(
    async (data: RegistrationFields) => {
      const result = await registerAsync(data);
      if (result.status === HttpStatusCode.CREATED) {
        push('/auth/login/');
      }
    },
    [push, registerAsync],
  );

  return (
    <div className="row">
      <h1>Acesta este începutul călătoriei!</h1>
      <h1>
        Ai cont deja? <Link href="/auth/login/">Autentifică-te</Link>
      </h1>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="g-3 needs-validation"
          noValidate
        >
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              value="Mark"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>

          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <>
                <label htmlFor="email">Email</label>
                <input
                  {...field}
                  name="email"
                  placeholder="exemplu@website.ro"
                  required
                />
                <p>{formState.errors.email?.message}</p>
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
                  name="password"
                  placeholder="Parola ta"
                  required
                />
                <p>{formState.errors.password?.message}</p>
              </>
            )}
          />
          <Controller
            name="confirmPassword"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <>
                <label htmlFor="confirm-password">Parolă</label>
                <input
                  {...field}
                  type="password"
                  name="confirm-password"
                  placeholder="Introdu aceeași parolă ca mai sus"
                  required
                />
                <p>{formState.errors.confirmPassword?.message}</p>
              </>
            )}
          />
          <button type="submit">Înregistrare</button>
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

export default RegisterPage;
