'use client'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaShoppingCart, FaSkull } from 'react-icons/fa';
import deadWestLogo from '../../../public/images/dead-west-logo.svg'



const navigation = [
  { name: 'Gallery', href: '#' },
  { name: 'Shop', href: '#' }
]

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="bg-none">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <div>
              <span className="sr-only">Dead West</span>
              <FaSkull className='size-8 text-desert-green-dark' />
            </div>
          </Link>
        </div>
        {pathname != '/' && <Image src={deadWestLogo} alt='dead west logo' height={75} width={75} className='mx-auto'></Image>
        }
        <div className="flex flex-1 justify-end">
          <button className='snipcart-checkout'>
            <FaShoppingCart className='size-6 text-desert-green-dark' />
          </button>
        </div>
      </nav>
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