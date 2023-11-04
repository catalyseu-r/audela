'use client';

import { NASA_ROVERS_3D } from '@/app/staticData/nasaRovers3D';
import { MarsRoverPhotos, MarsRoverProfiles } from '@/app/types/marsRoverTypes';
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
import { ActionTypes } from '@/app/types/actionTypes';
import Image from 'next/image';
import { AppState } from '@/app/types/appState';

export interface RoverGalleryContentType {
  data: MarsRoverProfiles;
}

const RoverGalleryContent = (data: MarsRoverProfiles) => {
  const {
    state: { currentMarsRover, marsFilterState, currentGallery },
    dispatch,
  } = useAppContext();

  React.useEffect(() => {
    const getSelectedRoverImages = async () => {
      if (currentMarsRover) {
        const getImages: AppState['currentGallery'] = await getMarsRoverImages({
          rover: currentMarsRover?.name,
          sol: marsFilterState.sol.toString(),
        });

        dispatch({ type: ActionTypes.SET_CURRENT_GALLERY, payload: getImages });
      }
    };

    getSelectedRoverImages();
  }, [currentMarsRover, marsFilterState, dispatch]);

  return (
    <div className=''>
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
      <div className='grid grid-cols-1 items-start '>
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

      <div className='  grid grid-cols-2 items-center content-center gap-16 w-full'>
        {currentGallery.photos &&
          currentGallery.photos.length > 0 &&
          currentGallery.photos.map((photo) => (
            <div key={photo.id} className='w-[28rem] h-[20rem] relative rounded overflow-hidden aspect-video '>
              <Image
                className='rounded object-cover opacity-0 transition-opacity'
                loading='lazy'
                src={photo.img_src}
                fill
                alt='Photo form Mars rover'
                onLoadingComplete={(image) => image.classList.remove('opacity-0')}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RoverGalleryContent;
