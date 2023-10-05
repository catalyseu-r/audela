'use client';

import { Chakra_Petch } from 'next/font/google';
import Link from 'next/link';
import React from 'react';
const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });
import { RxHamburgerMenu as BurgerMenu } from 'react-icons/rx';
import { TfiClose as CloseIcon } from 'react-icons/tfi';
import { motion, useAnimation } from 'framer-motion';
import { BiPlanet as PlanetIcon } from 'react-icons/bi';
import { BsChevronDown as DownIcon, BsImage as ImageIcon } from 'react-icons/bs';
import { AiOutlineLock as LockIcon } from 'react-icons/ai';
import SocialStack from './SocialStack';
import { navLinks } from '../staticData/navLinks';
import { usePathname } from 'next/navigation';
import UserInput from './UserInput';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isDropdown, setIsDropdown] = React.useState<boolean>(false);
  const containerControls = useAnimation();
  const linkControls = useAnimation();
  const handleNav = () => setIsOpen(!isOpen);
  const pathName = usePathname();

  React.useEffect(() => {
    containerControls.start({ opacity: 0, transform: 'translateY(-200%)' });
    linkControls.start({ opacity: 0, transform: 'translateX(-25%)', transition: { delay: 0 } });
    if (isOpen) {
      containerControls.start({ opacity: 1, transform: 'translateY(0)' });
      linkControls.start({ opacity: 1, transform: 'translateX(0)' });
    }

    return () => setIsDropdown(false);
  }, [containerControls, isOpen, linkControls]);

  return (
    <nav
      className={`w-full pt-4 inline-block   border-b border-dimmed-white-full  z-50 fixed top-0 ${
        pathName === '/' ? 'bg-transparent' : 'bg-main-black'
      }`}
    >
      <div className='flex w-full gap-4 justify-between  items-center  lg:max-w-container-lg md:w-5/6 mx-auto md:px-0 px-4 overflow-hidden'>
        <Link
          href={'/'}
          className={` ${chakraP.className} lg:text-3xl text-2xl uppercase z-40  ${
            isOpen ? 'text-main-orange-accent ' : 'text-text-red'
          } transition-all `}
        >
          au-delà
        </Link>
        <div className={` md:flex items-center justify-between gap-16 text-base font-light text-main-white hidden`}>
          {navLinks.map((link) => {
            return link.title !== 'Explore' ? <p key={link.title}>{link.title}</p> : null;
          })}
        </div>
        <UserInput />
        {isOpen ? (
          <CloseIcon className='md:hidden text-main-orange-accent text-2xl z-40 ' onClick={handleNav} />
        ) : (
          <BurgerMenu className='md:hidden text-main-white text-2xl z-40 ' onClick={handleNav} />
        )}
      </div>
      <motion.div
        animate={containerControls}
        initial={{ opacity: 0, transform: 'translateY(-200%)' }}
        transition={{ duration: 0.25 }}
        className={`w-full  h-screen bg-main-black  px-4 z-30 fixed top-0 lg:hidden`}
      >
        <div className='flex flex-col mt-32 mx-auto gap-14 max-w-max '>
          {navLinks.map((link, index) => {
            if (link.title === 'Explore') {
              return (
                <motion.div
                  initial={{ opacity: 0, transform: 'translateX(-25%)' }}
                  transition={{ duration: 0.75, delay: link.delay }}
                  animate={linkControls}
                  key={link.title}
                  className={`flex justify-start items-center py-2 px-4 border  gap-8 relative ${
                    isDropdown ? ' border-transparent' : 'border-dimmed-accent'
                  }`}
                >
                  {link.icon}
                  <motion.div
                    onClick={() => setIsDropdown(!isDropdown)}
                    className={`
                    ${isOpen && 'cursor-auto '}
                    cursor-pointer`}
                  >
                    <div className='flex justify-between items-center gap-4'>
                      <p className='text-main-white text-base font-light'>Explore</p>
                      <DownIcon
                        className={`text-base  ${
                          isDropdown ? 'rotate-180 text-main-orange-accent' : 'rotate-0 text-main-white'
                        } transition-all`}
                      />
                    </div>
                    <div
                      className={`w-max transition-[top] z-50 duration-250 ease-in-out flex-col left-0 gap-16 absolute  h-auto bg-second-black px-4 py-2 items-start justify-start ${
                        isDropdown ? 'flex top-12 border border-dimmed-accent' : 'invisible top-0'
                      }`}
                    >
                      {link.subOptions?.map((sub) => (
                        <Link
                          className={`${
                            sub.title === 'Image of the day' || sub.title === 'Planets'
                              ? 'text-main-white'
                              : 'text-dimmed-white'
                          } text-base font-light flex justify-start items-center content-start w-full gap-4`}
                          key={sub.title}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.title === 'Image of the day' ? (
                            <ImageIcon />
                          ) : sub.title === 'Planets' ? (
                            <PlanetIcon />
                          ) : (
                            <LockIcon />
                          )}
                          <p onClick={() => setIsOpen(false)}>{sub.title}</p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            }
            return (
              <motion.div
                key={link.title}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.75, delay: link.delay }}
                animate={linkControls}
                className={`${isDropdown ? '-z-10' : ''} flex justify-start items-center py-2 px-4 w-max gap-8 `}
              >
                {link.icon}
                <p
                  onClick={() => setIsOpen(false)}
                  className='text-main-white text-base font-light leading-6 text-left'
                >
                  {link.title}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className='w-48 h-px bg-dimmed-white-full mx-auto mt-16'></div>

        <div className='flex w-full justify-between items-center gap-4 mt-16'>
          <SocialStack isInMenu />
          <div className='w-px h-20 bg-dimmed-white-full'></div>
          <p className='text-main-white text-xl leading-10 font-light'>Have an app idea? Get in touch! 📱</p>
        </div>

        <div className='flex flex-col items-center justify-center mt-16'>
          <h2
            className={` ${chakraP.className}  text-main-red text-3xl leading-[3.5rem] uppercase tracking-wide text-center`}
          >
            au-delà
          </h2>
          <p className='text-dimmed-white text-center lowercase text-xs'>The stargazer’s dream</p>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
