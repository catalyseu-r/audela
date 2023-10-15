'use client';
import { ImageOfTheDay } from '@/app/types/imageOfTheDay';
import React from 'react';
import { Chakra_Petch } from 'next/font/google';
const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });

interface DescriptionContainerProps {
  desc: ImageOfTheDay['explanation'];
  title: ImageOfTheDay['title'];
  date: ImageOfTheDay['date'];
}

const DescriptionContainer = (props: DescriptionContainerProps) => {
  const formatDesc = props.desc.split('. ').map((txt, index) => (
    <p className='w-full text-text-white font-light text-sm xl:text-base lg:px-8 px-4 leading-6' key={index}>
      {txt}
    </p>
  ));

  return (
    <div className='grid grid-cols-1 items-start gap-6 '>
      <div className='flex items-center justify-start w-full lg:max-w-md  py-0 flex-wrap lg:gap-2 gap-4'>
        <h2 className={`${chakraP.className} lg:text-2xl md:text-xl text-lg text-accent-pink leading-10 `}>
          {props.title}
        </h2>
        <div className='bg-text-white/50 w-px h-6'></div>
        <p className='text-text-white/50 italic weight-300 font-light text-base'>{props.date}</p>
      </div>
      {formatDesc}
    </div>
  );
};

export default DescriptionContainer;
