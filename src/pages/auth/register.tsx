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
import Link from 'next/link';
import { FC } from 'react';

const RegisterPage: FC = () => {
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
        <TextInput label="Email" placeholder="exemplu@webiste.ro" required />
        <PasswordInput
          label="Parolă"
          placeholder="Parola ta"
          required
          mt="md"
        />
        <PasswordInput
          label="Confirmă parola"
          placeholder="Introdu aceeași parolă ca mai sus"
          required
          mt="md"
        />
        <Button type="submit" fullWidth mt="xl">
          Înregistrare
        </Button>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
