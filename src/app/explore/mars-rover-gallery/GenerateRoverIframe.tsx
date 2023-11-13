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
    <div className={` flex items-center  `}>
      {clientWindowSize && clientWindowSize.width > 768 ? (
        <iframe
          src={findNasaSource(rover.id, NASA_ROVERS_3D)?.source}
          className='w-72 h-72  object-fill rounded transition-all md:shadow-custom-image-strong-shadow '
          allowFullScreen
        />
      ) : (
        <div className='relative w-40 h-40 rounded md:shadow-custom-image-strong-shadow '>
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
