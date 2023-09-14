'use client';

import { ImageOfTheDay } from '@/app/types/imageOfTheDay';
import Image from 'next/image';
import React from 'react';

interface ImageContainerProps {
  image: ImageOfTheDay['hdurl'] | ImageOfTheDay['url'];
}

const ImageContainer = (props: ImageContainerProps) => {
  return (
    <div className='relative w-full lg:max-w-md xl:h-[40rem] h-80'>
      <Image
        src={props.image}
        alt='astronomy picture of the day provided by NASA'
        fill
        priority
        sizes='(max-width: 640px) 100%, (max-width: 768px) 50%, 25%'
        objectFit='fill'
        loading='eager'
      />
    </div>
  );
};

export default ImageContainer;
