'use client';

import { ImageOfTheDay } from '@/app/types/imageOfTheDay';
import Image from 'next/image';
import React from 'react';
import ReactPlayer from 'react-player';

interface ImageContainerProps {
  image: ImageOfTheDay['hdurl'] | ImageOfTheDay['url'];
}

const ImageContainer = (props: ImageContainerProps) => {
  const propUrl = new URL(props.image);

  return propUrl.hostname.includes('youtube.com') || propUrl.hostname.includes('vimeo.com') ? (
    <div className='w-full h-full aspect-video'>
      <ReactPlayer url={props.image} width='100%' height='100%' controls={true} />
    </div>
  ) : (
    <div className='h-full lg:max-w-lg w-full  relative md:shadow-custom-image-strong-shadow aspect-square'>
      <Image
        src={props.image}
        alt='astronomy picture of the day provided by NASA'
        fill
        priority
        className='object-cover  bg-deep-green/30 aspect-square animate-pulse transition-all placeholder:text-bg-black'
        loading='eager'
        onLoadingComplete={(image) => {
          image.classList.remove('bg-deep-green/30');
          image.classList.remove('animate-pulse');
        }}
      />
    </div>
  );
};

export default ImageContainer;
