'use client'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaShoppingCart, FaSkull } from 'react-icons/fa';
import deadWestLogoNoFill from '../../../public/images/dead-west-logo-nofill.svg'



const navigation = [
  { name: 'Gallery', href: '#' },
  { name: 'Shop', href: '#' }
]

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="bg-none h-28">
      <nav aria-label="Global" className="mx-auto h-full flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <div>
              <span className="sr-only">Dead West</span>
              <FaSkull className='size-7 text-desert-green-dark' />
            </div>
          </Link>
        </div>
        {pathname != '/' && <Link href="/"><Image src={deadWestLogoNoFill} alt='dead west logo' height={75} width={75} className='mx-auto'></Image></Link>
        }
        <div className="flex flex-1 justify-end">
          <button className='snipcart-checkout'>
            <FaShoppingCart className='size-7 text-desert-green-dark' />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header;