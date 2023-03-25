import { MantineProvider } from '@mantine/core';
import type { Session } from 'next-auth';
import type { AppProps, AppType } from 'next/app';
import Head from 'next/head';
import { trpc } from '~/utils/trpc';

import { SessionProvider } from 'next-auth/react';
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
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
            globalStyles: (theme) => ({
              body: {
                backgroundColor: theme.colors.indigo[1],
              },
            }),
          }}
        >
          <main>
            <Component {...pageProps} />
          </main>
        </MantineProvider>
      </SessionProvider>
    </>
  );
}) as AppType;

const appWithTRPC = trpc.withTRPC(App);

export default appWithTRPC;
