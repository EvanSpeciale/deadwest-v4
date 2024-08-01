import { SnipcartProvider } from 'use-snipcart';
import '@styles/globals.css'
import localFont from 'next/font/local';

const junkieCowboy = localFont({ src: '../styles/fonts/MamaRegular.ttf', variable: '--font-junkie-cowboy' })
const playwriteAR = localFont({ src: '../styles/fonts/PlaywriteAR.ttf', variable: '--font-playwrite-ar' })
function MyApp({ Component, pageProps }) {
  return (
    <SnipcartProvider>
      <main className={`${junkieCowboy.variable} ${playwriteAR.variable}`}>
        <Component {...pageProps} />
      </main>
    </SnipcartProvider>
  );
}

export default MyApp
