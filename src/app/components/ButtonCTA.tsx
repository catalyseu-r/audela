'use client';

import Link from 'next/link';
import { ButtonPropsCTA } from '../types/buttonCTA';
import { IoTelescopeOutline as TelescopeIcon } from 'react-icons/io5';
import React from 'react';

const ButtonCTA = ({ title: buttonText, linkTo }: ButtonPropsCTA) => {
  const [isPause, setIsPause] = React.useState<boolean>(false);
  return (
    <Link
      href={linkTo ?? ''}
      className={`
       lg:py-4
       md:py-3 
       py-2 
       group 
       lg:px-6 
       px-3  
       
      
       lg:w-[16.5rem] h-auto 
       w-auto 
       relative 
    overflow-hidden
       rounded 
       transition-all 
       uppercase 
       align-middle
       cursor-pointer 
       text-center 
       justify-between 
     inline-block
        bg-gradient-to-br from-deep-green   to-interactive-green 
      animate-animate-gradient-overlay

       `}
      style={{
        backgroundSize: '300% 300%',
        animationPlayState: isPause ? 'paused' : 'running',
      }}
      onMouseOver={() => setIsPause(true)}
      onMouseLeave={() => setIsPause(false)}
    >
      <div className='flex items-center content-center gap-4 w-full h-full transition-all'>
        <p className='w-full lg:text-2xl text-lg  transition-all ease-linear leading-9 font-normal animate-animate-cta-text'>
          {buttonText}
        </p>
        <TelescopeIcon className={`lg:text-3xl text-lg shrink-0`} />
      </div>
    </Link>
  );
};

export default ButtonCTA;
