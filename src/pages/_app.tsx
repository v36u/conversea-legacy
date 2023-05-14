import type { Session } from 'next-auth';
import type { AppProps, AppType } from 'next/app';
import Head from 'next/head';
import { trpc } from '~/utils/trpc';

import { SessionProvider } from 'next-auth/react';
import Navigation from '~/client/components/home/navigation';

import '../client/styles/styles.css';

interface CustomAppProps extends AppProps {
  pageProps: {
    session?: Session;
  } & AppProps['pageProps'];
}

const App = (({ pageProps, Component }: CustomAppProps) => {
  const { session } = pageProps;

  return (
    <>
      <Head>
        <title>Conversea</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <Navigation />
        <main>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </>
  );
}) as AppType;

const appWithTRPC = trpc.withTRPC(App);

export default appWithTRPC;
