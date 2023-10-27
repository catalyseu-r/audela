'use client';
import Image from 'next/image';
import React from 'react';

import dayjs from 'dayjs';
import { PiDotsThreeOutlineBold as DotIcon, PiArrowBendUpRightBold as ArrowIcon } from 'react-icons/pi';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import placeholder from '../../img/placeholder-article.jpg';
import { NewsAndStudiesContent } from './NewsAndStudiesContent';

interface ArticleContainerData {
  data: NewsAndStudiesContent['data'];
}

const ArticleContainer = (props: ArticleContainerData) => {
  const [windowSize, setWindowSize] = React.useState<number | null>();

  React.useEffect(() => {
    if (window && typeof window !== 'undefined') {
      setWindowSize(window.innerWidth);
    }
  }, []);

  const pathName = usePathname();

  return (
    <div
      className={`${
        windowSize && windowSize > 768 ? 'flex-wrap ' : 'flex-nowrap overflow-x-scroll  snap-x snap-proximity'
      } flex  gap-8 items-center md:justify-center justify-between  w-full h-full  mt-16 no-scrollbar`}
    >
      <AnimatePresence>
        {props.data.map((item, index) => (
          <motion.div
            className='flex justify-between items-start flex-wrap shadow-custom-article-shadow bg-text-white px-2 py-2 snap-center rounded-lg min-w-[18rem] max-w-[33.6rem]'
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className=' md:w-[11.625rem] h-[13.375rem] w-full relative bg-text-white'>
              <Link href={`${pathName}/${item.data[0].nasa_id}`}>
                <Image
                  className='object-cover transition-opacity opacity-0 duration-1000 rounded placeholder:text-bg-black'
                  fill
                  style={{
                    objectFit: 'cover',
                  }}
                  alt='Astronomy article image'
                  src={item?.links[0].href.toString()}
                  loading='lazy'
                  onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                />
              </Link>
            </div>

            <div className='flex px-4 py-4 md:py-0 flex-col justify-between gap-4 items-start  bg-text-white flex-1 w-full lg:w-[22rem]'>
              <h2 className='text-xl border-b border-deep-green/10 px-4 tracking-tight leading-8 font-normal text-bg-black line-clamp-1'>
                {item.data[0].title}
              </h2>

              <p className='text-xs leading-5 font-light text-bg-black line-clamp-3 px-4'>
                {item.data[0].description_508}
              </p>

              <div className='flex self-stretch px-4 items-center gap-4 '>
                <div className='relative w-[2.375rem] h-[2.375rem] shrink-0'>
                  <Image
                    src={placeholder}
                    fill
                    alt='placeholder for author'
                    className=' rounded-full placeholder:text-bg-black'
                  />
                </div>
                <div className=''>
                  <p className='text-xs leading-5 font-light line-clamp-1 text-bg-black'>
                    {item.data[0].photographer || item.data[0].secondary_creator || item.data[0].center}
                  </p>

                  <p className='text-xs leading-5 text-bg-black/50 italic font-light '>
                    {dayjs(item.data[0].date_created).format('MM/DD/YYYY')}
                  </p>
                </div>
              </div>

              <div className='self-stretch flex items-center justify-end gap-4 px-4'>
                <div className='w-6 h-6 grid items-center justify-center border border-deep-green rounded-full'>
                  <DotIcon className={`text-base text-bg-black`} />
                </div>
                <div className='w-6 h-6 grid items-center justify-center border border-deep-green rounded-full'>
                  <Link href={`${pathName}/${item.data[0].nasa_id}`}>
                    <ArrowIcon className={`text-base text-deep-green`} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ArticleContainer;
