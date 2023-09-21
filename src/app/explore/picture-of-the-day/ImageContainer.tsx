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

  return (
    <div className='relative w-full sm:w-5/6 lg:max-w-lg xl:h-[40rem] h-80'>
      {propUrl.hostname.includes('youtube.com') || propUrl.hostname.includes('vimeo.com') ? (
        <div className='w-full h-full'>
          <ReactPlayer url={props.image} width='100%' height='100%' controls={true} />
        </div>
      ) : (
        <Image
          src={props.image}
          alt='astronomy picture of the day provided by NASA'
          fill
          priority
          className='object-cover transition-opacity opacity-0 duration-[2s]'
          loading='eager'
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
        />
      )}
    </div>
  );
};

export default ImageContainer;
