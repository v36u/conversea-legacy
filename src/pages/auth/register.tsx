import { zodResolver } from '@hookform/resolvers/zod';
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
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
    <Container size={480} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Acesta este începutul călătoriei!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Ai cont deja?{' '}
        <Link href="/auth/login/">
          <Anchor size="sm" component="button">
            Autentifică-te
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Email"
                placeholder="exemplu@website.ro"
                required
                error={formState.errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                label="Parolă"
                placeholder="Parola ta"
                required
                mt="md"
                error={formState.errors.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                label="Confirmă parola"
                placeholder="Introdu aceeași parolă ca mai sus"
                required
                mt="md"
                error={formState.errors.confirmPassword?.message}
              />
            )}
          />
          <Button type="submit" fullWidth mt="xl">
            Înregistrare
          </Button>
        </form>
      </Paper>
    </Container>
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
