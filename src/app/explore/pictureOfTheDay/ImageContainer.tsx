'use client';

import { ImageOfTheDay } from '@/app/types/imageOfTheDay';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface ImageContainerProps {
  image: ImageOfTheDay['hdurl'] | ImageOfTheDay['url'];
}

const ImageContainer = (props: ImageContainerProps) => {
  return (
    <div className='w-96 h-96 relative '>
      <Image src={props.image} alt='astronomy picture of the day provided by NASA' fill priority />
    </div>
  );
};

export default ImageContainer;
