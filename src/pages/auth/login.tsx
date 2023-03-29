import { zodResolver } from '@hookform/resolvers/zod';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
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

  return (
    <Container size={480} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Bine ai revenit!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Nu ai un cont?{' '}
        <Link href="/auth/register/">
          <Anchor size="sm" component="button">
            Înregistrează-te
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="emailOrUsername"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Email sau nume de utilizator"
                placeholder="exemplu@website.ro"
                required
                error={formState.errors.emailOrUsername?.message}
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
          <Group position="apart" mt="lg">
            <Checkbox label="Ține-mă minte" />
            <Link href="/auth/forgot-password/">
              <Anchor component="button" size="sm">
                Ai uitat parola?
              </Anchor>
            </Link>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Autentificare
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

export default LoginPage;
