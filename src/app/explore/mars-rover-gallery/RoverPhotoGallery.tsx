'use client';

import { useAppContext } from '@/app/contexts/store';
import Image from 'next/image';
import Loading from '../loading';
import React from 'react';
import { useCustomScroll } from '@/app/utils/hooks/useCustomScroll';

const RoverPhotoGallery = () => {
  const {
    state: {
      currentGallery: { photos, isLoading },
    },
  } = useAppContext();

  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [handleMouseDown, handleMouseMove, handleMouseUp] = useCustomScroll(scrollContainerRef);

  if (isLoading) {
    return <Loading />;
  } else if (photos.length === 0 && !isLoading) {
    return (
      <h2 className='mx-auto px-4 text-error-red/80 lg:text-2xl md:text-xl text-sm leading-6'>
        There are no images for that filter setting! Try with diffirent settings 👨🏻‍🚀
      </h2>
    );
  } else {
    return (
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={scrollContainerRef}
        className=' w-full flex flex-nowrap gap-16  overflow-auto scroll-smooth  overscroll-contain scroll-px-2 snap-proximity snap-x cursor-grab active:cursor-grabbing no-scrollbar'
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            className='md:w-[28rem] md:h-[20rem] w-[20rem] h-[18rem] relative rounded snap-always snap-center aspect-video pointer-events-none select-none'
          >
            <Image
              className='rounded object-cover opacity-0 transition-opacity  aspect-video '
              loading='lazy'
              src={photo.img_src}
              fill
              alt='Photo form Mars rover'
              onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            />
          </div>
        ))}
      </div>
    );
  }
};

export default RoverPhotoGallery;
