import { MantineProvider } from '@mantine/core';
import type { AppProps, AppType } from 'next/app';
import Head from 'next/head';
import { trpc } from '~/utils/trpc';

const App = (({ pageProps, Component }: AppProps) => {
  return (
    <>
      <Head>
        <title>Conversea</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <main>
          <Component {...pageProps} />
        </main>
      </MantineProvider>
    </>
  );
}) as AppType;

const appWithTRPC = trpc.withTRPC(App);

export default appWithTRPC;
