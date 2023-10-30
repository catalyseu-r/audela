import Link from 'next/link';
import React from 'react';

import { Chakra_Petch } from 'next/font/google';
const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });
import {
  BiPlanet as PlanetIcon,
  BiImage as ImageIcon,
  BiLock as LockIcon,
  // BiCloudDrizzle as CloudIcon,
} from 'react-icons/bi';

const Options = () => {
  const featureOptions = [
    { title: 'Image of the day', icon: ImageIcon },
    { title: 'News and studies', icon: PlanetIcon },
    { title: 'Weather on Mars', icon: LockIcon },
    { title: 'Mars rover gallery', icon: LockIcon },
  ];

  const convertToLink = (input: string) => input.split(' ').join('-').toLowerCase();

  return (
    <div className='grid content-center justify-items-center gap-16 mt-8 w-full'>
      <div className='flex flex-col items-center justify-center gap-14 max-w-[26rem] w-full'>
        <div className='flex flex-col items-center justify-center gap-1'>
          <h2 className={`${chakraP.className} text-text-white text-2xl text-center md:text-left`}>
            What do you want to search for?
          </h2>
          <h3 className='text-text-white/50 text-base text-center md:text-left'>
            Locked features will be released in future updates
          </h3>
        </div>
        <div className='w-full  grid grid-cols-1 items-center gap-12'>
          {featureOptions.map((option, index, orig) => {
            const Icon = orig[index].icon;

            return index === orig.length - 1 || index === orig.length - 2 ? (
              <button
                disabled
                className='z-10 group lg:py-6 py-4 lg:px-8 px-4 flex items-center justify-between self-stretch border border-interactive-green/20 lg:text-2xl md:text-lg text-base  text-text-white/50 rounded cursor-not-allowed'
              >
                <Icon className={'text-text-white/50'} />
                {option.title}
              </button>
            ) : (
              <Link
                className='z-10 group lg:py-6 py-4 lg:px-8 px-4 flex items-center justify-between self-stretch border border-interactive-green/50 lg:text-2xl md:text-lg text-base  text-text-white rounded hover:border-interactive-green transition-all duration-300'
                href={`/explore/${convertToLink(option.title)}`}
                key={option.title}
              >
                <Icon
                  className={'group-hover:text-interactive-green group-hover:scale-125 transition-all duration-300'}
                />
                {option.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Options;
