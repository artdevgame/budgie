import { urql } from 'lib/urql';
import { NativeBaseProvider } from 'native-base';
import { AppProps } from 'next/app';
// import Head from 'next/head';
import * as React from 'react';
import { Provider as UrqlProvider } from 'urql';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      </Head> */}
      <NativeBaseProvider>
        <UrqlProvider value={urql}>
          <Component {...pageProps} />
        </UrqlProvider>
      </NativeBaseProvider>
    </>
  );
}

export default MyApp;
