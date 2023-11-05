'use client';

import { NASA_ROVERS_3D } from '@/app/staticData/nasaRovers3D';
import { MarsRoverProfiles } from '@/app/types/marsRoverTypes';
import React from 'react';

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

import { AppState } from '@/app/types/appState';

import RoverPhotoGallery from './RoverPhotoGallery';

export interface RoverGalleryContentType {
  data: MarsRoverProfiles;
}

const RoverGalleryContent = (data: MarsRoverProfiles) => {
  const {
    state: { currentMarsRover, marsFilterState, currentGallery },
    dispatch,
  } = useAppContext();

  console.log('CURRENTGALE', marsFilterState);

  React.useEffect(() => {
    try {
      dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: true });
      const getSelectedRoverImages = async () => {
        if (currentMarsRover) {
          const getImages: AppState['currentGallery'] = await getMarsRoverImages({
            rover: currentMarsRover?.name,
            sol: marsFilterState.sol.toString(),
            camera: marsFilterState.camera,
          });

          dispatch({ type: ActionTypes.SET_CURRENT_GALLERY, payload: getImages });
          dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: false });
        }
      };

      getSelectedRoverImages();
    } catch (error) {
      console.error(error);
      dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: false });
    }
  }, [currentMarsRover, marsFilterState, dispatch]);

  React.useEffect(() => {
    data && dispatch({ type: ActionTypes.SET_CURRENT_MARS_ROVER, payload: data.rovers[0] });
  }, [data, dispatch]);

  return (
    <div className='grid lg:gap-20 md:gap-16 gap-10 pb-40 lg:mt-24 mt-20 '>
      <div className='flex md:justify-start justify-center gap-14 lg:flex-nowrap flex-wrap'>
        <div className='grid gap-10 '>
          <GenerateRoverIframe data={currentMarsRover} />
          <div className='w-full flex gap-4 items-center'>
            <div className='flex items-center gap-2'>
              <RadioIcon
                className={`${
                  currentMarsRover?.status === 'active'
                    ? 'text-deep-green animate-animate-ping-custom'
                    : 'text-error-red'
                } text-base`}
              />
              <p className='flex items-center gap-1 text-base leading-6'>
                <span>Status: </span>
                <span className={`${currentMarsRover?.status === 'active' ? 'text-deep-green' : 'text-error-red'} `}>
                  {currentMarsRover && currentMarsRover.status}
                </span>
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <CalendarIcon className={`text-base text-deep-green`} />
              <p className='flex items-center gap-1 text-base leading-6'>
                <span className='leading-6 text-base'>Launched:</span>
                <span className='font-light italic leading-6 text-base'>
                  {currentMarsRover && dayjs(currentMarsRover.launch_date).format('DD/MM/YYYY')}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 items-start gap-10'>
          <div className='flex items-center lg:gap-10 md:gap-8 gap-6 transition-all  flex-wrap'>
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
              className='flex gap-[2px] flex-wrap items-center perspective-3d px-4'
            >
              {currentMarsRover &&
                findNasaSource(currentMarsRover!.id, NASA_ROVERS_3D)
                  ?.bio.split(/(\s+)/)
                  .map((txt, index) => {
                    return (
                      <span
                        key={index}
                        style={{ animationDelay: `${index / 40}s` }}
                        className={`animate-animate-text-custom relative transition-all origin-right opacity-0 inline-block font-light lg:text-xl text-base lg:leading-10 leading-8 text-text-white`}
                      >
                        {txt}
                      </span>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-nowrap snap-x overflow-auto snap-mandatory no-scrollbar relative min-h-iframes-images-sm   gap-16'>
        <RoverPhotoGallery />
      </div>
    </div>
  );
};

export default RoverGalleryContent;
