import '../styles/global.css';

import { InteractiveMenuProvider } from 'features/common/context/InteractiveMenu';
import { urql } from 'lib/urql';
import { NativeBaseProvider } from 'native-base';
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { ModalProvider } from 'react-modal-hook';
import { theme } from 'theme';
import { Provider as UrqlProvider } from 'urql';

const language = 'en-GB';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      </Head>
      <IntlProvider locale={language} key={language} onError={() => null}>
        <NativeBaseProvider theme={theme}>
          <UrqlProvider value={urql}>
            <InteractiveMenuProvider>
              <ModalProvider>
                <Component {...pageProps} />
              </ModalProvider>
            </InteractiveMenuProvider>
          </UrqlProvider>
        </NativeBaseProvider>
      </IntlProvider>
    </>
  );
}

export default MyApp;
