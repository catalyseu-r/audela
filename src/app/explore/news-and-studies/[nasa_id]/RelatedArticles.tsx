'use client';

import { useAppContext } from '@/app/contexts/store';
import { useCustomScroll } from '@/app/utils/hooks/useCustomScroll';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo } from 'react';

const RelatedArticles = () => {
  const {
    state: { relatedItems },
  } = useAppContext();

  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  const [handleMouseDown, handleMouseMove, handleMouseUp] = useCustomScroll(scrollContainerRef);

  if (!relatedItems) {
    return null;
  } else {
    return (
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={scrollContainerRef}
        className=' w-full  overflow-x-auto scroll-smooth   overscroll-contain scroll-px-2   snap-proximity snap-x cursor-grab active:cursor-grabbing no-scrollbar'
      >
        <div className='flex flex-nowrap lg:gap-12 md:gap-8 gap-6  w-full scroll-smooth   overscroll-contain scroll-px-2 snap-proximity snap-x  relative min-h-iframes-images-sm   '>
          {relatedItems.map((item, index) => {
            return (
              <Link key={index} href={item.data[0].nasa_id} className='snap-always snap-center'>
                <div className=' relative rounded  md:w-[28rem] md:h-[20rem] w-[calc(45vw+2rem)] h-56 aspect-square pointer-events-none select-none snap-always snap-center'>
                  <Image
                    className='rounded aspect-square bg-deep-green/30 animate-pulse pointer-events-none select-none '
                    fill
                    loading='lazy'
                    src={item.links[0].href.toString()}
                    alt={`Related article to current reading topic`}
                    onLoadingComplete={(image) => {
                      image.classList.remove('bg-deep-green/30');
                      image.classList.remove('animate-pulse');
                    }}
                  />
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
