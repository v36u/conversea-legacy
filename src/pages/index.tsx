import { Anchor, Button, Container, Loader, Stack, Title } from '@mantine/core';
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
      <Stack
        mx="auto"
        mt="xl"
        align="center"
        h={300}
        w={300}
        spacing="xl"
        justify="center"
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[0],
        })}
      >
        <Button variant="outline">Inregistrare</Button>
        <Button variant="outline">Logare</Button>
      </Stack>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
