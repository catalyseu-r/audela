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
  const [handleMouseDown, handleMouseUp, handleMouseMove] = useCustomScroll(scrollContainerRef);

  if (isLoading) {
    return <Loading />;
  } else if (!photos || photos.length === 0) {
    return (
      <h2 className='mx-auto text-error-red/80 text-2xl leading-6'>
        There are no images for that filter setting! Try with diffirent settings 👨🏻‍🚀
      </h2>
    );
  } else {
    return (
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={scrollContainerRef}
        className=' w-full overflow-auto scroll-smooth    snap-mandatory cursor-grab active:cursor-grabbing no-scrollbar'
      >
        <div className='flex flex-nowrap  w-full  relative min-h-iframes-images-sm   gap-16'>
          {photos.map((photo) => (
            <div
              key={photo.id}
              className='w-[28rem] h-[20rem] relative rounded snap-always snap-center aspect-video pointer-events-none select-none'
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
      </div>
    );
  }
};

export default RoverPhotoGallery;
