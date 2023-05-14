import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ConverseaVideo from '~/client/components/shared/converseaVideo';
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
  const [generalError, setGeneralError] = useState('');
  const { mutateAsync: register } = trpc.user.register.useMutation();

  const onSubmit = useCallback(
    async (data: RegistrationFields) => {
      setGeneralError('');

      try {
        const response = await register(data);
        if (response?.status !== HttpStatusCode.CREATED) {
          setGeneralError(response.message);
          return;
        }
        push('/auth/login/');
      } catch (err: any) {
        setGeneralError(err.message);
      }
    },
    [push, register],
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
                <h2 className="auth-title">
                  Acesta este începutul călătoriei!
                </h2>
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
                      name="email"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          name="email"
                          id="email"
                          className="form__input"
                          placeholder="Email"
                        />
                      )}
                    />
                    <span className="auth-error">
                      {formState.errors.email?.message}
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
                    <Controller
                      name="confirmPassword"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          className="form__input"
                          placeholder="Confirmă parola"
                        />
                      )}
                    />
                    <span className="auth-error">
                      {formState.errors.confirmPassword?.message}
                    </span>
                  </div>
                  <div className="row">
                    <button type="submit" className="btn">
                      Înregistrare
                    </button>
                  </div>
                  <span className="general-error auth-error">
                    {generalError}
                  </span>
                </form>
              </div>
              <div className="row auth-bottom-text">
                <p>
                  Ai cont deja? <Link href="/auth/login/">Autentifică-te</Link>
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

export default RegisterPage;
