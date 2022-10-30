import '../styles/global.css';

import Dinero from 'dinero.js';
import { InteractiveMenuProvider } from 'features/common/context/InteractiveMenu';
import { useUser } from 'features/common/hooks/useUser';
import { urql } from 'lib/urql';
import { DateTime } from 'luxon';
import { NativeBaseProvider } from 'native-base';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { ModalProvider } from 'react-modal-hook';
import { theme } from 'theme';
import { Provider as UrqlProvider } from 'urql';

const language = 'en-GB';

Dinero.globalLocale = language;
DateTime.local().setLocale(language);

const PageWrapper = ({ children }) => {
  const router = useRouter();
  const [user, { fetching }] = useUser();

  if (fetching) {
    return null;
  }

  if (!user) {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/authorize`);
    return null;
  }

  return children;
};

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
                <PageWrapper>
                  <Component {...pageProps} />
                </PageWrapper>
              </ModalProvider>
            </InteractiveMenuProvider>
          </UrqlProvider>
        </NativeBaseProvider>
      </IntlProvider>
    </>
  );
}

export default MyApp;
