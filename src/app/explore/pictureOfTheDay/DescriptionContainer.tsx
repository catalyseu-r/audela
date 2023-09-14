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
    <p className='w-full text-main-white font-light text-xs xl:text-base' key={index}>
      {txt}
    </p>
  ));

  return (
    <div className='flex flex-col items-start gap-6 max-w-md'>
      <div className='flex items-center justify-between w-full  py-0 px-4 flex-wrap gap-2'>
        <h2 className={`${chakraP.className} lg:text-2xl md:text-xl text-lg text-main-white `}>{props.title}</h2>
        <div className='bg-dimmed-red w-[0.0625rem] h-[1.75rem]'></div>
        <p className='text-main-white italic weight-300 font-light text-base'>{props.date}</p>
      </div>
      {formatDesc}
    </div>
  );
};

export default DescriptionContainer;
