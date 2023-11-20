'use client';

import { useAppContext } from '@/app/contexts/store';
import { useCustomScroll } from '@/app/utils/hooks/useCustomScroll';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo } from 'react';
import { IoArrowRedoCircleOutline as ArrowRightIcon } from 'react-icons/io5';

const RelatedArticles = () => {
  const {
    state: { relatedItems },
  } = useAppContext();

  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  const [handleMouseDown, handleMouseMove, handleMouseUp] = useCustomScroll(scrollContainerRef, 2);

  if (!relatedItems) {
    return null;
  } else {
    return (
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={scrollContainerRef}
        className=' w-full  overflow-x-auto scroll-smooth z-20   overscroll-contain scroll-px-2   snap-proximity snap-x cursor-grab active:cursor-grabbing no-scrollbar'
      >
        <div className='flex flex-nowrap lg:gap-12 md:gap-8 gap-6     w-full scroll-smooth focus:pointer-events-none  overscroll-contain scroll-px-2 snap-proximity snap-x  relative min-h-iframes-images-sm   '>
          {relatedItems.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.data[0].nasa_id}
                className='snap-always snap-center select-none group pointer-events-auto '
              >
                <div className=' relative rounded   md:w-[28rem] md:h-[20rem] w-[calc(45vw+2rem)] h-56 aspect-square pointer-events-none  overflow-hidden select-none snap-always snap-center'>
                  <Image
                    className='rounded aspect-square bg-deep-green/30 animate-pulse object-center select-none group-hover:-translate-y-1/4 group-hover:scale-125 group-hover:blur-sm  transition-all duration-300 ease-custom-anim delay-200'
                    objectFit='cover'
                    fill
                    loading='lazy'
                    src={item.links[0].href.toString()}
                    alt={`Related article to current reading topic`}
                    onLoadingComplete={(image) => {
                      image.classList.remove('bg-deep-green/30');
                      image.classList.remove('animate-pulse');
                    }}
                  />
                  <div
                    style={{
                      clipPath: 'polygon(0 36%, 100% 69%, 100% 100%, 0% 100%)',
                    }}
                    className='absolute md:-bottom-full bottom-0 z-10 group-hover:bottom-0 transition-all duration-300 ease-custom-anim  lg:px-6 px-3 py-4  w-full md:h-40 h-32 grid items-end grid-cols-1 justify-between lg:bg-text-white bg-text-white/80 '
                  >
                    <div className='flex justify-between  w-full items-center'>
                      <p className='text-bg-black hover:text-deep-green font-light leading-6 lg:text-xl md:text-lg text-sm truncate md:max-w-[25ch] max-w-[15ch] hover:tracking-wider transition-all duration-300 ease-overshoot-bezier-custom'>
                        {item.data[0].title}
                      </p>
                      <ArrowRightIcon
                        className={`text-bg-black lg:text-2xl md:text:xl text-base hover:text-deep-green hover:scale-125 transition-all duration-300 ease-overshoot-bezier-custom`}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
};

export default memo(RelatedArticles);
