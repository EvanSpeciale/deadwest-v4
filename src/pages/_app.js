import { SnipcartProvider } from 'use-snipcart';
import '@styles/globals.css'
import localFont from 'next/font/local';

const junkieCowboy = localFont({ src: '../styles/fonts/JunkieCowboy.ttf' })

function MyApp({ Component, pageProps }) {
  return (
    <SnipcartProvider>
      <main className={junkieCowboy.className}>
        <Component {...pageProps} />
      </main>
    </SnipcartProvider>
  );
}

export default MyApp
