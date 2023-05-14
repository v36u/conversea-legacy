'use client';

import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import About from '~/client/components/home/about';
import Features from '~/client/components/home/features';
import Services from '~/client/components/home/service';
import Team from '~/client/components/home/team';
import data from '~/client/data/data.json';

const DynamicHeader = dynamic(
  () => {
    const test = import('~/client/components/home/header');
    return test;
  },
  {
    ssr: false,
  },
);

const IndexPage: FC = () => {
  return (
    <div>
      <DynamicHeader data={data} />
      <Features />
      <About />
      <Services />
      <Team />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
