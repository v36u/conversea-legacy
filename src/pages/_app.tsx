import type { Session } from 'next-auth';
import type { AppProps, AppType } from 'next/app';
import Head from 'next/head';
import { trpc } from '~/utils/trpc';

import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';
import Navigation from '~/client/components/navigation';
import '../../public/css/bootstrap.css';
import '../../public/css/nivo-lightbox/nivo-lightbox.css';
import '../../public/fonts/font-awesome/css/font-awesome.css';
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
      <Script strategy="beforeInteractive" src="/js/jquery.1.11.1.js" />
      <Script strategy="beforeInteractive" src="/js/bootstrap.js" />

      <Head>
        <title>Conversea</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900"
          rel="stylesheet"
        />
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
