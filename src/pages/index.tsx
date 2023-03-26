import { Anchor, Container } from '@mantine/core';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';

const IndexPage: FC = () => {
  return (
    <Container mt="xl">
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
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
