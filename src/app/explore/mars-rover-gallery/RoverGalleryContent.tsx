'use client';

import { NASA_ROVERS_3D } from '@/app/staticData/nasaRovers3D';
import { MarsRoverProfiles } from '@/app/types/marsRoverTypes';
import React from 'react';

interface RoverGalleryContentType {
  data: MarsRoverProfiles;
}

const RoverGalleryContent = ({ data: { rovers } }: RoverGalleryContentType) => {
  return (
    <div>
      {rovers.map((item) => (
        <React.Fragment key={item.name}>
          <h2 className='text-2xl text-text-white'>
            {item.name} - ID: {item.id}
          </h2>
          <div className='w-full h-full aspect-video'>
            <iframe src={NASA_ROVERS_3D.find((items) => items.id === item.id)?.source} width='100%' height='100%' />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default RoverGalleryContent;
