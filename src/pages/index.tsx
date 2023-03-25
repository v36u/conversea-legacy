import { Container } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

const IndexPage: FC = () => {
  return <Container mt="xl">Test</Container>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
