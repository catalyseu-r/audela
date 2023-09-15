import Link from 'next/link';
import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { Chakra_Petch } from 'next/font/google';
const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });
import { AiOutlineLock as LockIcon } from 'react-icons/ai';
import { BsImage as ImageIcon } from 'react-icons/bs';
import { BiPlanet as PlanetIcon } from 'react-icons/bi';

const Options = () => {
  const optionClass =
    ' lg:py-6 py-4 lg:px-8 px-4 flex items-center justify-between self-stretch border border-dimmed-red lg:text-xl md:text-lg text-base  text-main-white';

  return (
    <div className='mt-8'>
      <Breadcrumbs />
      <div className='flex items-center justify-center mt-8 w-full'>
        <div className='flex flex-col items-center justify-center gap-14 lg:w-[26rem]  w-5/6'>
          <div className='flex flex-col items-center justify-center gap-1'>
            <h2 className={`${chakraP.className} text-main-white text-2xl`}>What do you want to search for?</h2>
            <h3 className='text-dimmed-white text-base'>Locked features will be released in future updates</h3>
          </div>
          <div className='w-full  flex flex-col justify-between items-center gap-12'>
            <Link href={'/explore/pictureOfTheDay'} className={`${optionClass}` + ' ' + 'border-main-red'}>
              <ImageIcon className='text-white lg:text-2xl md:text-xl sm:text-base' />
              <p>Image of the day</p>
            </Link>

            <Link href={'/explore/planets'} className={`${optionClass}` + ' ' + 'border-main-red'}>
              <PlanetIcon className={'text-white lg:text-2xl md:text-xl sm:text-base'} />
              <p className={'text-white'}>Planets</p>
            </Link>
            <div className={optionClass}>
              <LockIcon className={'text-dimmed-white lg:text-2xl md:text-xl sm:text-base'} />
              <p className={'text-dimmed-white'}>Stars</p>
            </div>
            <div className={optionClass}>
              <LockIcon className={'text-dimmed-white lg:text-2xl md:text-xl sm:text-base'} />
              <p className={'text-dimmed-white'}>Weather on Mars</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
