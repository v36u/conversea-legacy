import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ConverseaVideo from '~/client/components/shared/converseaVideo';
import { nextAuthOptions } from '~/utils/auth/authOptions';
import HttpStatusCode from '~/utils/enums/HttpStatusCode';
import {
  CredentialsAuthFields,
  credentialsAuthSchema,
} from '~/utils/validation/auth';

const LoginPage: FC = () => {
  const { push } = useRouter();
  const { control, handleSubmit, formState } = useForm<CredentialsAuthFields>({
    resolver: zodResolver(credentialsAuthSchema),
    reValidateMode: 'onChange',
  });
  const [generalError, setGeneralError] = useState('');

  const onSubmit = useCallback(
    async (data: CredentialsAuthFields) => {
      setGeneralError('');
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      if (response?.status !== HttpStatusCode.OK) {
        const error = response?.error ?? 'A fost întâlnită o eroare!';

        setGeneralError(error);
        return;
      }
      push('/');
    },
    [push],
  );

  return (
    <>
      <ConverseaVideo />
      <div className="form-wrapper">
        <div className="row main-content bg-success text-center">
          <div className="col-md-4 text-center company__info">
            <span className="company__logo">
              <img src="/assets/converseaLogo.png" alt="logo" width="70%" />
              <h2 className="login-slogan">
                Învață. Conversează. Socializează.
              </h2>
            </span>
          </div>
          <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
            <div className="container-fluid">
              <div className="row">
                <h2 className="auth-title">Bine ai revenit!</h2>
              </div>
              <div className="row">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    await handleSubmit(onSubmit)();
                  }}
                  noValidate
                  className="form-group"
                >
                  <div className="row">
                    <Controller
                      name="emailOrUsername"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          name="emailOrUsername"
                          id="emailOrUsername"
                          className="form__input"
                          placeholder="Email sau nume de utilizator"
                        />
                      )}
                    />
                    <span className="auth-error">
                      {formState.errors.emailOrUsername?.message}
                    </span>
                  </div>
                  <div className="row">
                    <Controller
                      name="password"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="password"
                          name="password"
                          id="password"
                          className="form__input"
                          placeholder="Parolă"
                        />
                      )}
                    />
                    <span className="auth-error">
                      {formState.errors.password?.message}
                    </span>
                  </div>
                  <div className="row">
                    <button type="submit" className="btn">
                      Autentificare
                    </button>
                  </div>
                  <span className="general-error auth-error">
                    {generalError}
                  </span>
                </form>
              </div>
              <div className="row auth-bottom-text">
                <p>
                  Nu ai un cont?{' '}
                  <Link href="/auth/register/">Înregistrează-te</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
