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
import Link from 'next/link';
import { FC } from 'react';

const LoginPage: FC = () => {
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
        <TextInput label="Email" placeholder="exemplu@webiste.ro" required />
        <PasswordInput
          label="Parolă"
          placeholder="Parola ta"
          required
          mt="md"
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
      </Paper>
    </Container>
  );
};

export default LoginPage;
