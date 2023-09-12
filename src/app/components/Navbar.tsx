import { Chakra_Petch } from 'next/font/google';

import Link from 'next/link';
const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });
import { RxHamburgerMenu as BurgerMenu } from 'react-icons/rx';

const Navbar = () => {
  return (
    <nav className='w-full mt-4 inline-block'>
      <div className='flex w-full justify-between items-center'>
        <Link href={'/'} className={`${chakraP.className} lg:text-3xl text-2xl uppercase text-text-red z-10`}>
          au-delà
        </Link>
        <div className={` w-[22rem] md:flex items-center justify-between text-base text-main-white hidden`}>
          <p>Our mission</p>
          <p>About</p>
          <p>Contact</p>
        </div>
        <BurgerMenu className='md:hidden text-main-white text-2xl' />
      </div>
    </nav>
  );
};

export default Navbar;
