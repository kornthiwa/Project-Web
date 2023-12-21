// _app.tsx
import { AppProps } from 'next/app';
import { MyProvider } from '../Context/dataContext';
import Layout from '@/layout/drawerComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';

<style>
  @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&family=Oswald:wght@700&display=swap');
</style>


const theme = createTheme({
  typography: {
    fontFamily: 'Dosis, Oswald, sans-serif',
    fontWeightBold: 700, 
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>

    <Layout>

    <MyProvider>
      <Component {...pageProps} />
    </MyProvider>

     </Layout>
     </ThemeProvider>

  );
}

export default MyApp;
