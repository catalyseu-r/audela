'use client';
import Image from 'next/image';
import React from 'react';
import { PlanetsContentContainerData } from './PlanetsContentContainer';
import dayjs from 'dayjs';
import { BsChevronDoubleRight as ArrowRight } from 'react-icons/bs';

const ArticleContainer = (props: PlanetsContentContainerData) => {
  return (
    <div className='flex flex-wrap items-center content-center md:justify-between justify-center w-full gap-8 lg:gap-y-8 mt-12'>
      {props.data.map((item, index) => (
        <div className='flex items-start flex-wrap md:w-[34rem] w-full' key={index}>
          <div className='lg:w-[18rem] w-full h-[10.5rem] relative  '>
            <Image
              fill
              alt='lalalala'
              src={item.links[0].href.toString()}
              sizes='(max-width: 640px) 100%, (max-width: 768px) 50%, 25%'
              objectFit='cover'
              loading='eager'
            />
          </div>

          <div className='flex p-4 flex-col justify-between items-start shrink-0 bg-dimmed-blue w-full lg:w-[16rem] h-auto lg:h-[10.5rem] gap-[1.375rem]'>
            <div className='flex gap-3 md:justify-between items-end self-stretch w-full'>
              <h2 className='text-base text-main-white md:truncate md:max-w-[15ch]'>{item.data[0].title}</h2>
              <p className='text-xs text-main-white'>{dayjs(item.data[0].date_created).format('MM/DD/YYYY')}</p>
            </div>

            <p className='text-xs text-main-white truncate md:max-w-[25ch] max-w-full'>{item.data[0].description}</p>

            <div className='flex py-1 justify-end items-center gap-2 self-stretch w-full text-right border-b border-dimmed-red cursor-pointer'>
              <p className='text-main-white overflow-hidden text-xs text-ellipsis leading-6'>Read more</p>
              <ArrowRight className='text-2xl text-main-red' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleContainer;
