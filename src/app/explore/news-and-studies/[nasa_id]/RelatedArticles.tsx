'use client';

import { useAppContext } from '@/app/contexts/store';
import { useCustomScroll } from '@/app/utils/hooks/useCustomScroll';
import Image from 'next/image';
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
        className=' w-full  overflow-x-auto scroll-smooth    snap-proximity snap-x cursor-grab active:cursor-grabbing no-scrollbar'
      >
        <div className='flex flex-nowrap  w-full scroll-smooth   relative min-h-iframes-images-sm   gap-16'>
          {relatedItems.map((item, index) => {
            return (
              <div
                key={index}
                className='w-[28rem] h-[20rem] relative rounded snap-always snap-center aspect-video pointer-events-none select-none'
              >
                <Image className='  rounded aspect-video ' fill src={item.links[0].href.toString()} alt='article' />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default memo(RelatedArticles);
