// _app.tsx
import { AppProps } from 'next/app';
import { MyProvider } from '../Context/dataContext';
import Layout from '@/layout/drawerComponent';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>

    <MyProvider>
      <Component {...pageProps} />
    </MyProvider>
     </Layout>
  );
}

export default MyApp;
