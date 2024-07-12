import Link from 'next/link';
import { useSnipcart } from 'use-snipcart';
import { FaShoppingCart, FaSkull } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { Bars3Icon } from '@heroicons/react/24/outline'

import Container from '@components/Container';

import styles from './Header.module.scss';
import { useState } from 'react';

const navigation = [
  { name: 'Gallery', href: '#' },
  { name: 'Shop', href: '#' }
]

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale: activeLocale, locales, asPath } = useRouter();
  const availableLocales = locales.filter(locale => locale !== activeLocale);
  const { cart = {} } = useSnipcart();
  const { subtotal = '0' } = cart;
  return (
    <header className="bg-none">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex flex-1">
          <Link href="#" className="-m-1.5 p-1.5">
            <div>
              <span className="sr-only">Dead West</span>
              <FaSkull className='size-8 text-desert-red' />
            </div>
          </Link>
        </div>
        {/* <div className="flex lg:hidden">
          <button
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
          >
            <span className="sr-only">Open Main Menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div> */}
        {/* <div className='flex gap-x-12'>
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className='text-sm font-semibold leading-6 text-gray-900'>
              {item.name}
            </Link>
          ))}
        </div> */}
        <div className="flex flex-1 justify-end">
          <button className='snipcart-checkout'>
            <FaShoppingCart className='size-6 text-desert-red' />
          </button>
        </div>
      </nav>
      {/* <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className='fixed inset-0 z-50' />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <div>
                <span className='sr-only'>Dead West</span>
                <img
                  alt=""
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </div>
            </Link>
          </div>
        </DialogPanel>
      </Dialog> */}
    </header>


    // <header className={styles.header}>
    //   <Container className={styles.headerContainer}>
    //     <p className={styles.headerTitle}>
    //       <Link href="/">
    //         <a>Dead West</a>
    //       </Link>
    //     </p>
    //     <ul className={styles.headerLinks}>
    //       <li>
    //         <Link href="/categories/featured">
    //           <a>Featured</a>
    //         </Link>
    //       </li>
    //       <li>
    //         <Link href="/categories/apparel">
    //           <a>Apparel</a>
    //         </Link>
    //       </li>
    //       <li>
    //         <Link href="#">
    //           <a>Link</a>
    //         </Link>
    //       </li>
    //     </ul>
    //     <p className={styles.headerCart}>
    //       <button className='snipcart-checkout'>
    //         <FaShoppingCart />
    //         <span>
    //           ${subtotal}
    //         </span>
    //       </button>
    //     </p>
    //     <ul className={styles.headerLocales}>
    //       {availableLocales.map(locale => {
    //         return (
    //           <li key={locale}>
    //             <Link href={asPath} locale={locale}>
    //               <a className='localeOption'>{locale}</a>
    //             </Link>
    //           </li>
    //         )
    //       })}
    //     </ul>
    //   </Container>
    // </header>
  )
}

export default Header;