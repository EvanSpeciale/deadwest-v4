import Link from 'next/link';
import { useSnipcart } from 'use-snipcart';
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/router';

import Container from '@components/Container';

import styles from './Header.module.scss';

const Header = () => {
  const { locale: activeLocale, locales, asPath } = useRouter();
  const availableLocales = locales.filter(locale => locale !== activeLocale);
  const { cart = {} } = useSnipcart();
  const { subtotal = '0' } = cart;
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            <a>Dead West</a>
          </Link>
        </p>
        <ul className={styles.headerLinks}>
          <li>
            <Link href="/categories/featured">
              <a>Featured</a>
            </Link>
          </li>
          <li>
            <Link href="/categories/apparel">
              <a>Apparel</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>Link</a>
            </Link>
          </li>
        </ul>
        <p className={styles.headerCart}>
          <button className='snipcart-checkout'>
            <FaShoppingCart />
            <span>
              ${subtotal}
            </span>
          </button>
        </p>
        <ul className={styles.headerLocales}>
          <li>
            <Link href="#">
              <a className='activeLocale'>{activeLocale}</a>
            </Link>
          </li>
          {availableLocales.map(locale => {
            return (
              <li key={locale}>
                <Link href={asPath} locale={locale}>
                  <a className='localeOption'>{locale}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </header>
  )
}

export default Header;