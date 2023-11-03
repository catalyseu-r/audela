'use client';

import { NASA_ROVERS_3D } from '@/app/staticData/nasaRovers3D';
import { MarsRoverProfiles } from '@/app/types/marsRoverTypes';
import React, { memo } from 'react';

import { IoRadioOutline as RadioIcon, IoCalendarClearOutline as CalendarIcon } from 'react-icons/io5';
import dayjs from 'dayjs';
import { getMarsRoverImages } from '@/app/utils/API/getMarsRoverImages';
import { useAppContext } from '@/app/contexts/store';

import { findNasaSource } from '@/app/utils/lists/findNasaSource';
import GenerateRoverIframe from './GenerateRoverIframe';
import GenerateSolPicker from './GenerateSolPicker';
import GenerateRecency from './GenerateRecency';
import GenerateRoverPicker from './GenerateRoverPicker';
import GenerateCameras from './GenerateCameras';

export interface RoverGalleryContentType {
  data: MarsRoverProfiles;
}

const RoverGalleryContent = (data: MarsRoverProfiles) => {
  const {
    state: { currentMarsRover, marsFilterState },
  } = useAppContext();

  React.useEffect(() => {
    const getSelectedRoverImages = async () => {
      if (currentMarsRover) {
        const getImages = await getMarsRoverImages({
          rover: currentMarsRover?.name,
          sol: marsFilterState.sol.toString(),
        });
        //"sol" is requiered..
        console.log('IMAGES', getImages);
      }
    };

    getSelectedRoverImages();
  }, [currentMarsRover, marsFilterState]);

  return (
    <div className='flex gap-14 items-start max-w-full md:flex-nowrap flex-wrap mt-16'>
      <div className='grid gap-4'>
        <GenerateRoverIframe data={currentMarsRover} />
        <div className='flex items-center gap-2'>
          <RadioIcon
            className={`${
              currentMarsRover?.status === 'active' ? 'text-deep-green animate-animate-ping-custom' : 'text-error-red'
            } text-2xl`}
          />
          <p className='flex items-center gap-1'>
            <span>Status: </span>
            <span className={`${currentMarsRover?.status === 'active' ? 'text-deep-green' : 'text-error-red'} `}>
              {currentMarsRover && currentMarsRover.status}
            </span>
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <CalendarIcon className={`text-2xl`} />
          <p className='flex items-center gap-1'>
            <span>Launch date: </span>
            <span className='font-light italic'>
              {currentMarsRover && dayjs(currentMarsRover.launch_date).format('DD/MM/YYYY')}
            </span>
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 items-start'>
        <div className='flex items-center gap-10 transition-all w-full flex-wrap'>
          <GenerateRoverPicker data={data} />
          <GenerateSolPicker />
          <GenerateCameras />
          <GenerateRecency />
        </div>
        <div className='py-4 self-stretch grid grid-cols-1 items-start'>
          <label htmlFor='rover-bio' className='font-normal text-xl leading-10 text-deep-green'>
            Bio
          </label>
          <div
            key={currentMarsRover?.id}
            id='rover-bio'
            className='flex gap-[2px] flex-wrap items-center perspective-3d'
          >
            {currentMarsRover &&
              findNasaSource(currentMarsRover!.id, NASA_ROVERS_3D)
                ?.bio.split(/(\s+)/)
                .map((txt, index) => {
                  return (
                    <span
                      key={index}
                      style={{ animationDelay: `${index / 40}s` }}
                      className={`animate-animate-text-custom relative transition-all origin-right opacity-0 inline-block font-light text-xl leading-10 text-text-white`}
                    >
                      {txt}
                    </span>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoverGalleryContent;
