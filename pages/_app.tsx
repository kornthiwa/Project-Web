// _app.tsx
import { AppProps } from 'next/app';
import { MyProvider } from '../Context/dataContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MyProvider>
      <Component {...pageProps} />
    </MyProvider>
  );
}

export default MyApp;
