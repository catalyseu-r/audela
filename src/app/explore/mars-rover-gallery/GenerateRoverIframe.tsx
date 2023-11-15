'use client';

import { useAppContext } from '@/app/contexts/store';
import { NASA_ROVERS_3D } from '@/app/staticData/nasaRovers3D';
import { useWindowSize } from '@/app/utils/hooks/useWindowSize';

import { findNasaSource } from '@/app/utils/lists/findNasaSource';
import Image from 'next/image';
import React from 'react';

const GenerateRoverIframe = () => {
  const {
    state: {
      marsFilterState: { rover },
    },
  } = useAppContext();

  const clientWindowSize = useWindowSize();

  if (!rover?.name) {
    return null;
  }

  return (
    <div className={` flex relative items-center  w-fit`}>
      {clientWindowSize && clientWindowSize.width >= 768 ? (
        <iframe
          src={findNasaSource(rover.id, NASA_ROVERS_3D)?.source}
          className='lg:w-72 lg:h-72 md:w-56 md:h-56  object-fill rounded transition-all md:shadow-custom-image-strong-shadow '
          allowFullScreen
        />
      ) : (
        <div className=' h-[calc(50vw-3rem)] w-[calc(50vw-3rem)] rounded md:shadow-custom-image-strong-shadow '>
          <Image
            fill
            src={findNasaSource(rover.id, NASA_ROVERS_3D)?.static ?? ''}
            alt='NASA ROVER STATIC IMAGE NOT INTERACTIVE'
            className='object-cover w-full h-full block aspect-square rounded'
          />
        </div>
      )}
    </div>
  );
};

export default GenerateRoverIframe;
