import '../styles/globals.css';

import { urql, UrqlProvider } from 'lib/urql';
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';

const token = new URLSearchParams(window.location.search).get('token');
if (token) {
  localStorage.setItem('x-budgie-auth', token);
}

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
