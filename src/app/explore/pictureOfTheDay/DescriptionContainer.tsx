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
  return (
    <div className='flex flex-col items-start gap-6 w-[28.125rem]'>
      <div className='flex items-center justify-between w-[28rem] py-0 px-4'>
        <h2 className={`${chakraP.className} text-2xl text-main-white`}>{props.title}</h2>
        <div className='bg-main-white w-[0.0625rem] h-[1.75rem]'></div>
        <p className='text-main-white italic weight-300 font-light text-base'>{props.date}</p>
      </div>
      <p className='w-full text-main-white'>{props.desc}</p>
    </div>
  );
};

export default DescriptionContainer;
