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
import { useCreateQueryString } from '@/app/utils/hooks/useCreateQueryString';
import Loading from '../loading';
import { setLocalStorageItem } from '@/app/utils/localStorage/handleLocalStorage';

export interface RoverGalleryContentType {
  data: MarsRoverProfiles;
}

const RoverGalleryContent = (data: MarsRoverProfiles) => {
  const {
    state: {
      currentMarsRover,
      marsFilterState,
      currentGallery: { isLoading },
    },
    dispatch,
  } = useAppContext();

  const { updatePath } = useCreateQueryString();

  console.log('LOCATION PARAMS', window.location.search);

  const roverFilterObject = React.useMemo(() => {
    return { ...marsFilterState, rover: currentMarsRover ? currentMarsRover.name : '' };
  }, [currentMarsRover, marsFilterState]);

  const getSelectedRoverImages = React.useCallback(async () => {
    if (currentMarsRover) {
      const getImages: AppState['currentGallery'] = await getMarsRoverImages({
        rover: currentMarsRover?.name,
        sol: marsFilterState.sol.toString(),
        camera: marsFilterState.camera,
      });

      if (getImages) {
        dispatch({ type: ActionTypes.SET_CURRENT_GALLERY, payload: getImages });
        updatePath({
          sol: marsFilterState.sol.toString(),
          camera: marsFilterState.camera,
          rover: currentMarsRover.name,
        });

        setLocalStorageItem('@au-dela_filters', roverFilterObject);

        dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: false });
      }
    }
  }, [currentMarsRover, marsFilterState, dispatch, updatePath, roverFilterObject]);

  React.useEffect(() => {
    try {
      dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: true });

      getSelectedRoverImages();
    } catch (error) {
      console.error(error);
    }
  }, [getSelectedRoverImages, dispatch]);

  return (
    <div className='grid lg:gap-20 md:gap-16 gap-10 pb-40 lg:mt-24 mt-20 animate-enter'>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='flex md:justify-start justify-center gap-14 lg:flex-nowrap flex-wrap'>
          <div className='grid gap-10 '>
            <GenerateRoverIframe />
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
      )}

      <RoverPhotoGallery />
    </div>
  );
};

export default RoverGalleryContent;
