'use client';

import { ImageOfTheDay } from '@/app/types/imageOfTheDay';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface ImageContainerProps {
  image: ImageOfTheDay['hdurl'] | ImageOfTheDay['url'];
}

const ImageContainer = (props: ImageContainerProps) => {
  return (
    <div className='lg:w-[40.125rem] lg:h-[40rem] md:w-[20rem] md:h-60 w-screen h-40 relative'>
      <Image
        src={props.image}
        alt='astronomy picture of the day provided by NASA'
        fill
        priority
        sizes='(max-width: 640px) 100%, (max-width: 768px) 50%, 25%'
      />
    </div>
  );
};

export default ImageContainer;
