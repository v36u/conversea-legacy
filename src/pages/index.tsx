import {
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Container,
  Loader,
  Stack,
  Title,
} from '@mantine/core';
import { GetServerSideProps } from 'next';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC } from 'react';

const IndexPage: FC = () => {
  const { status } = useSession();

  return (
    <Container mt="xl" fluid>
      {status === 'loading' && <Loader variant="bars" color="cyan" />}
      {status === 'unauthenticated' && (
        <>
          <Link href="/auth/login/">
            <Anchor size="sm" component="button">
              Autentifică-te
            </Anchor>
          </Link>
          <br />
          <Link href="/auth/register/">
            <Anchor size="sm" component="button">
              Înregistrează-te
            </Anchor>
          </Link>
        </>
      )}
      {status === 'authenticated' && (
        <Button onClick={async () => await signOut()}>Deautentificare</Button>
      )}

      <Title order={1} align="center">
        Conversea
      </Title>

      <Title mt={50} order={3} align="center">
        Insert pompous motto
      </Title>

      <Box
        mx="auto"
        mt={50}
        p="md"
        h={400}
        w={400}
        sx={(theme) => ({
          backgroundColor: theme.colors.indigo[0],
          textAlign: 'center',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
        })}
      >
        <BackgroundImage src="/assets/logoConversea.png">
          <Stack mx="auto" align="center" h={400} spacing="xl" justify="center">
            <Button
              variant="gradient"
              gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
            >
              Inregistrare
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
            >
              Logare
            </Button>
          </Stack>
        </BackgroundImage>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
