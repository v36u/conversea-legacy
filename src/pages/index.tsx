import { Anchor, Button, Container, Loader } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC } from 'react';

const IndexPage: FC = () => {
  const { status } = useSession();

  return (
    <Container mt="xl">
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
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
