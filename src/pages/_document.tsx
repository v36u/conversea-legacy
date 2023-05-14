import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { FC } from 'react';

const Document: FC = () => {
  return (
    <Html>
      <Head>
        <Script strategy="beforeInteractive" src="/js/jquery.1.11.1.js" />
        <Script strategy="beforeInteractive" src="/js/bootstrap.js" />

        <link href="/fonts/font-awesome/css/all.min.css" rel="stylesheet" />
        <link href="/css/nivo-lightbox/nivo-lightbox.css" rel="stylesheet" />
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
