'use client';

import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import About from '~/client/components/about';
import Features from '~/client/components/features';
import Footer from '~/client/components/footer';
import Services from '~/client/components/service';
import Team from '~/client/components/team';
import data from '~/client/data/data.json';

// const DynamicExpenses = dynamic(
//   () => {
//     const test = import('~/client/components/expenses');
//     return test;
//   },
//   {
//     ssr: false,
//   },
// );

const DynamicHeader = dynamic(
  () => {
    const test = import('~/client/components/header');
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
      {/* <DynamicExpenses /> */}
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
