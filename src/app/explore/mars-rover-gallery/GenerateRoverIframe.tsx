'use client';

import { NASA_ROVERS_3D } from '@/app/staticData/nasaRovers3D';
import { MarsRoverProfile } from '@/app/types/marsRoverTypes';
import { findNasaSource } from '@/app/utils/lists/findNasaSource';
import React from 'react';

interface RoverIframeComponentProps {
  data: MarsRoverProfile | null;
}

const GenerateRoverIframe = ({ data }: RoverIframeComponentProps) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  if (!data) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        height: containerRef.current?.clientWidth.toString(),
      }}
      className={`lg:w-[352px] w-full aspect-square flex items-center justify-center md:shadow-custom-image-strong-shadow rounded `}
    >
      <iframe
        src={findNasaSource(data.id, NASA_ROVERS_3D)?.source}
        className='w-full h-full object-fill rounded transition-all'
        allowFullScreen
      />
    </div>
  );
};

export default GenerateRoverIframe;
