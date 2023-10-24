'use client';

import { Chakra_Petch } from 'next/font/google';
import Link from 'next/link';
import React from 'react';
const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });
import { RxHamburgerMenu as BurgerMenu } from 'react-icons/rx';
import { TfiClose as CloseIcon } from 'react-icons/tfi';
import { motion, useAnimation } from 'framer-motion';
import { BiUserCircle as UserIcon } from 'react-icons/bi';
import { BsChevronDown as DownIcon } from 'react-icons/bs';

import SocialStack from './SocialStack';
import { navLinks } from '../staticData/navLinks';
import { usePathname } from 'next/navigation';
import UserInput from './UserInput';
import { useAppContext } from '../contexts/store';

import toast from 'react-hot-toast';

import ElipseEffect from './ElipseEffect';

const Navbar = () => {
  const [isMobileNavOpen, setisMobileNavOpen] = React.useState<boolean>(false);
  const [isDropdown, setIsDropdown] = React.useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);
  const containerControls = useAnimation();
  const linkControls = useAnimation();
  const handleNav = () => setisMobileNavOpen(!isMobileNavOpen);
  const pathName = usePathname();

  const {
    state: { isSearchActive },
  } = useAppContext();

  React.useEffect(() => {
    containerControls.start({ opacity: 0, transform: 'translateY(-200%)' });
    linkControls.start({ opacity: 0, transform: 'translateX(-25%)', transition: { delay: 0 } });
    if (isMobileNavOpen) {
      containerControls.start({ opacity: 1, transform: 'translateY(0)' });
      linkControls.start({ opacity: 1, transform: 'translateX(0)' });
    }

    const updatePosition = () => setScrollPosition(window.scrollY);

    document.addEventListener('scroll', updatePosition);

    return () => {
      setIsDropdown(false);
      document.removeEventListener('scroll', () => updatePosition);
    };
  }, [containerControls, isMobileNavOpen, linkControls]);

  React.useEffect(() => {
    isMobileNavOpen
      ? document.documentElement.classList.add('overflow-hidden')
      : document.documentElement.classList.remove('overflow-hidden');

    return () => document.documentElement.classList.remove('overflow-hidden');
  }, [isMobileNavOpen]);

  const handleProfileClick = () =>
    toast.custom(
      (t) => (
        <div
          // draggable
          className={`${t.visible ? 'animate-enter ' : 'animate-leave'} max-w-md w-full bg-text-white rounded-sm 
              z-50 pointer-events-auto transition-all grid grid-cols-1 px-4 py-2 gap-4`}
        >
          <div className='grid grid-cols-1 gap-2'>
            <p className='text-base font-light leading-normal text-bg-black/50'>
              Looks like you&apos;ve hit profile button 😍
            </p>
            <p className='text-base leading-normal font-light text-bg-black'>
              I&apos;m planning on building profile feature together with comments etc, maybe you will event be able to
              upload your own profile photo 😮 so stay tuned!
            </p>
          </div>

          <button
            onClick={() => toast.dismiss(t.id)}
            className='bg-deep-green text-text-white font-normal text-base w-max place-self-end px-4 py-2 rounded'
          >
            Ok 👩🏻‍🚀
          </button>
        </div>
      ),
      { duration: 4000 }
    );

  return (
    <nav
      className={`w-full pt-4 inline-block py-2  z-40 fixed top-0 ${isSearchActive ? 'px-4' : ''}  ${
        scrollPosition > 150 ? 'backdrop-blur-sm bg-bg-black/50' : 'bg-transparent'
      } transition-all`}
    >
      <div className='flex  gap-4 justify-between relative  items-center  lg:max-w-container-lg md:w-5/6 mx-auto md:px-0 px-4 '>
        <button onClick={handleProfileClick} className={`flex gap-2 items-center ${!isMobileNavOpen && 'hidden'} z-40`}>
          <UserIcon className={`text-text-white/50 text-xl`} />
          <p className='text-text-white leading-6 text-xl font-light italic'>Visitor</p>
        </button>
        <Link
          href={'/'}
          className={` ${chakraP.className}  lg:text-3xl whitespace-nowrap text-2xl uppercase z-40  ${
            isMobileNavOpen ? 'hidden ' : 'text-accent-pink'
          }  ${isSearchActive ? 'hidden' : 'inline-block'} w-fit`}
        >
          au-delà
        </Link>

        <div className='flex items-center gap-14'>
          <div
            className={` ${
              isSearchActive ? 'md:hidden' : 'md:flex'
            } items-center justify-between gap-16 text-base font-light text-text-white hidden`}
          >
            {navLinks.map(
              (link) =>
                link.title !== 'Explore' && (
                  <Link
                    href={link.href || ''}
                    replace={pathName !== '/'}
                    key={link.title}
                    className={`cursor-pointer transition-all hover:text-interactive-green ${
                      isSearchActive ? 'scale-0' : 'scale-100'
                    } origin-top-right `}
                  >
                    {link.title}
                  </Link>
                )
            )}
          </div>

          <div className={`flex items-center gap-6 ${isSearchActive && 'w-full h-[42px]'}  `}>
            <UserInput />
            {isMobileNavOpen ? (
              <CloseIcon className='md:hidden text-deep-green text-2xl z-50' onClick={handleNav} />
            ) : (
              <BurgerMenu
                className={`${
                  isSearchActive ? 'scale-0 hidden' : ''
                } md:hidden text-text-white text-2xl z-50 transition-all`}
                onClick={handleNav}
              />
            )}
          </div>
        </div>
      </div>

      <motion.div
        animate={containerControls}
        initial={{ opacity: 0, transform: 'translateY(-200%)' }}
        transition={{ duration: 0.25 }}
        className={`w-full  h-screen bg-bg-black  px-4 z-30 fixed top-0 lg:hidden`}
      >
        <ElipseEffect />
        <div className='flex flex-col mt-32 mx-auto gap-14 max-w-[12.815rem] '>
          {navLinks.map((link, index) => {
            const Icon = navLinks[index].icon;
            if (link.title === 'Explore') {
              return (
                <motion.div
                  initial={{ opacity: 0, transform: 'translateX(-25%)' }}
                  transition={{ duration: 0.75, delay: link.delay }}
                  animate={linkControls}
                  key={link.title}
                  className={`flex justify-start items-center py-2 px-4 border  gap-8 relative rounded ${
                    isDropdown ? ' border-transparent' : 'border-deep-green'
                  }`}
                >
                  <Icon className={`text-2xl text-deep-green`} />
                  <motion.div
                    onClick={() => setIsDropdown(!isDropdown)}
                    className={`
                    ${isMobileNavOpen && 'cursor-auto '}
                    cursor-pointer`}
                  >
                    <div className='flex justify-between items-center gap-4'>
                      <p className='text-text-white text-xl font-light'>{link.title}</p>
                      <DownIcon
                        className={`text-base  ${
                          isDropdown ? 'rotate-180 text-deep-green' : 'rotate-0 text-text-white'
                        } transition-all`}
                      />
                    </div>
                    <div
                      className={` transition-[top]  duration-250 ease-in-out flex-col left-0 gap-14 absolute  bg-bg-black px-4 py-12 items-start justify-start rounded ${
                        isDropdown ? 'flex top-12 border border-deep-green' : 'invisible top-0'
                      }`}
                    >
                      {link.subOptions?.map((sub, index, orig) => {
                        const Icon = orig[index].icon;

                        return sub.href !== 'blank' ? (
                          <Link
                            className={`
                          text-base leading-6 text-text-white font-light flex justify-start items-center content-start  gap-4`}
                            key={sub.title}
                            href={sub.href}
                            onClick={() => setisMobileNavOpen(false)}
                          >
                            <Icon className={`text-xl text-deep-green`} />
                            <p onClick={() => setisMobileNavOpen(false)}>{sub.title}</p>
                          </Link>
                        ) : (
                          <button
                            className='text-base leading-6 text-text-white/50 font-light flex justify-start items-center content-start  gap-4'
                            key={sub.title}
                            disabled
                          >
                            <Icon className={'text-xl'} />
                            {sub.title}
                          </button>
                        );
                      })}
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
                <Icon className={`text-2xl text-deep-green`} />
                <Link
                  replace
                  onClick={() => setisMobileNavOpen(false)}
                  href={link.href || ''}
                  className='text-text-white text-xl font-light leading-6 text-left'
                >
                  {link.title}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className='w-20 h-px bg-accent-pink/10 mx-auto mt-16'></div>

        <div className='flex w-full justify-between items-center gap-4 mt-16 px-4'>
          <SocialStack isInMenu />

          <p className='text-text-white text-base leading-10 font-light max-w-[8rem]'>
            Have an app idea? Get in touch! 📱
          </p>
        </div>

        <div className='flex flex-col items-center justify-center mt-16'>
          <h2
            className={` ${chakraP.className}  text-accent-pink text-subHeading leading-10 uppercase tracking-wide text-center`}
          >
            au-delà
          </h2>
          <p className='text-dimmed-white text-center lowercase text-xs'>The stargazer&apos;s dream</p>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
