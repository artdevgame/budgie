import '../styles/globals.css';

import { urql } from 'lib/urql';
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { Provider as UrqlProvider } from 'urql';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <UrqlProvider value={urql}>
        <Component {...pageProps} />
      </UrqlProvider>
    </>
  );
}

export default MyApp;
