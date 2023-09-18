'use client';
import Image from 'next/image';
import React from 'react';
import { PlanetsContentContainerData } from './PlanetsContentContainer';
import dayjs from 'dayjs';
import { BsChevronDoubleRight as ArrowRight } from 'react-icons/bs';

interface ArticleContainerData {
  data: PlanetsContentContainerData['data'];
}

const ArticleContainer = (props: ArticleContainerData) => {
  return (
    <div className='flex flex-wrap justify-between lg:gap-8 md:gap-6 gap-4  w-full  mt-16'>
      {props.data.map((item, index) => (
        <div key={index} className='flex justify-between flex-wrap shadow-custom-article-shadow lg:w-auto w-full'>
          <div className=' lg:w-72 lg:h-44  h-56  sm:w-48  w-full relative'>
            <Image fill alt='Astronomy article image' src={item?.links[0].href.toString()} loading='lazy' />
          </div>

          <div className='flex p-4 flex-col justify-between gap-6 items-end  bg-second-black flex-1 w-full lg:w-64'>
            <div className='flex gap-3 md:justify-between items-end w-full py-1 px-2'>
              <h2 className='text-base text-main-white line-clamp-1'>{item.data[0].title}</h2>
              <p className='text-xs text-main-white italic font-light'>
                {dayjs(item.data[0].date_created).format('MM/DD/YYYY')}
              </p>
            </div>

            <p className='text-xs font-light text-main-white line-clamp-3 px-4'>{item.data[0].description}</p>

            <div className='flex px-2 justify-end items-center gap-2  text-right border rounded border-dimmed-accent cursor-pointer '>
              <p className='text-main-white text-xs font-light  leading-6 itallic'>Read more</p>
              <ArrowRight className='text-base text-dimmed-accent' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleContainer;
