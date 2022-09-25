import '../styles/global.css';

import { InteractiveMenuProvider } from 'features/common/context/InteractiveMenu';
import { urql } from 'lib/urql';
import { NativeBaseProvider } from 'native-base';
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { theme } from 'theme';
import { Provider as UrqlProvider } from 'urql';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      </Head>
      <NativeBaseProvider theme={theme}>
        <UrqlProvider value={urql}>
          <InteractiveMenuProvider>
            <Component {...pageProps} />
          </InteractiveMenuProvider>
        </UrqlProvider>
      </NativeBaseProvider>
    </>
  );
}

export default MyApp;
