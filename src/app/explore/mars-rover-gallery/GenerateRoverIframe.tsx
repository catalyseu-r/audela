'use client';

import { useAppContext } from '@/app/contexts/store';
import { NASA_ROVERS_3D } from '@/app/staticData/nasaRovers3D';

import { findNasaSource } from '@/app/utils/lists/findNasaSource';
import React from 'react';

const GenerateRoverIframe = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const {
    state: {
      marsFilterState: { rover },
    },
  } = useAppContext();

  if (!rover?.name) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        height: `${containerRef.current?.clientWidth}px`,
      }}
      className={`lg:w-[352px] w-full  aspect-square flex items-center justify-center md:shadow-custom-image-strong-shadow rounded `}
    >
      <iframe
        src={findNasaSource(rover.id, NASA_ROVERS_3D)?.source}
        className='w-full h-full object-fill rounded transition-all'
        allowFullScreen
      />
    </div>
  );
};

export default GenerateRoverIframe;
