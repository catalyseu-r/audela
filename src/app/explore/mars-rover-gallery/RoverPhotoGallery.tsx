'use client';

import { useAppContext } from '@/app/contexts/store';
import Image from 'next/image';
import Loading from '../loading';
import React from 'react';

const RoverPhotoGallery = () => {
  const {
    state: {
      currentGallery: { photos, isLoading },
    },
  } = useAppContext();

  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [startX, setStartX] = React.useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = React.useState<number>(0);

  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    setIsDragging(true);

    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));

    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  }, []);

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);

    const walk = (x - (startX || 0)) * 0.75;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = (scrollLeft || 0) - walk;
    }
  };

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
