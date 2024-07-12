import { SnipcartProvider } from 'use-snipcart';
import '@styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <SnipcartProvider>
      <Component {...pageProps} />
    </SnipcartProvider>
  );
}

export default MyApp
