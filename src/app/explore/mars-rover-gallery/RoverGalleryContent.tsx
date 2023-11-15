'use client';

import { NASA_ROVERS_3D } from '@/app/staticData/nasaRovers3D';
import { MarsRoverPhotos, MarsRoverProfile, MarsRoverProfiles } from '@/app/types/marsRoverTypes';
import React from 'react';
import { IoRadioOutline as RadioIcon, IoCalendarClearOutline as CalendarIcon } from 'react-icons/io5';
import dayjs from 'dayjs';
import { getMarsRoverImages } from '@/app/utils/API/getMarsRoverImages';
import { useAppContext } from '@/app/contexts/store';
import { findNasaSource } from '@/app/utils/lists/findNasaSource';
import GenerateRoverIframe from './GenerateRoverIframe';

import { ActionTypes } from '@/app/types/actionTypes';

import RoverPhotoGallery from './RoverPhotoGallery';
import { useCreateQueryString } from '@/app/utils/hooks/useCreateQueryString';
import Loading from '../loading';
import { getLocalStorageItem, setLocalStorageItem } from '@/app/utils/localStorage/handleLocalStorage';

import FilterGroup from './FilterGroup';
import { useSearchParams } from 'next/navigation';

const RoverGalleryContent = (data: MarsRoverProfiles) => {
  const {
    state: {
      marsFilterState: { sol, camera, rover, recency },
      currentGallery: { isLoading },
    },
    dispatch,
  } = useAppContext();

  const { updatePath } = useCreateQueryString();

  const initRover = React.useMemo(() => data.rovers.find((rover) => rover.status === 'active'), [data]);
  const findFromStaticData = React.useCallback(
    (roverName: string) => data.rovers.find((item) => item.name === roverName),
    [data.rovers]
  );
  const checkParams = useSearchParams();

  const setDefaultRover = React.useCallback(() => {
    if (initRover) {
      dispatch({ type: ActionTypes.SET_MARS_ROVER_FILTER_STATE, payload: { key: 'rover', value: initRover } });
      dispatch({
        type: ActionTypes.SET_MARS_ROVER_FILTER_STATE,
        payload: { key: 'sol', value: (initRover.max_sol - 25).toString() ?? '' },
      });
      dispatch({
        type: ActionTypes.SET_MARS_ROVER_FILTER_STATE,
        payload: { key: 'camera', value: initRover.cameras[0].name ?? '' },
      });
    }
  }, [dispatch, initRover]);

  React.useEffect(() => {
    const paramsHookCheck = checkParams.toString().length;

    const parseString = checkParams.toString().split('&');

    const parseQueryParams = parseString.reduce<Record<string, string>>((acc, curr) => {
      const [key, value] = curr.split('=');

      acc[key] = decodeURIComponent(value);

      return acc;
    }, {});

    const checkLocalStorage: Record<string, MarsRoverProfile | string> = getLocalStorageItem('@au-dela_filters');
    try {
      dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: true });
      if (checkLocalStorage && paramsHookCheck && !rover) {
        Object.entries(parseQueryParams).map((entry) => {
          const [key, value] = entry;

          if (key === 'rover') {
            dispatch({
              type: ActionTypes.SET_MARS_ROVER_FILTER_STATE,
              payload: { key: key, value: findFromStaticData(value) ?? '' },
            });
          } else {
            dispatch({ type: ActionTypes.SET_MARS_ROVER_FILTER_STATE, payload: { key, value } });
          }
        });
      } else if (!checkLocalStorage && paramsHookCheck && !rover) {
        Object.entries(parseQueryParams).map((entry) => {
          const [key, value] = entry;
          if (key === 'rover') {
            dispatch({
              type: ActionTypes.SET_MARS_ROVER_FILTER_STATE,
              payload: { key: key, value: findFromStaticData(value) ?? '' },
            });
          } else {
            dispatch({ type: ActionTypes.SET_MARS_ROVER_FILTER_STATE, payload: { key, value } });
          }
        });
      } else if (checkLocalStorage && !paramsHookCheck && !rover) {
        Object.entries(checkLocalStorage).map((entry) => {
          const [key, value] = entry;

          if (key === 'rover' && typeof value !== 'string') {
            dispatch({
              type: ActionTypes.SET_MARS_ROVER_FILTER_STATE,
              payload: { key: key, value: findFromStaticData(value.name) ?? '' },
            });
          } else {
            dispatch({ type: ActionTypes.SET_MARS_ROVER_FILTER_STATE, payload: { key, value } });
          }
        });
      } else if (!checkLocalStorage && !paramsHookCheck && !rover) {
        setDefaultRover();
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: false });
    }
  }, [checkParams, dispatch, setDefaultRover, findFromStaticData, rover]);

  interface GetImagesResponse {
    photos?: MarsRoverPhotos[];
    latest_photos?: MarsRoverPhotos[];
  }

  React.useEffect(() => {
    const getSelectedRoverImages = async () => {
      dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: true });

      try {
        const getImages: GetImagesResponse | undefined = await getMarsRoverImages({
          rover: rover!.name,
          sol: sol,
          camera: camera!,
          latest: recency,
        });

        if (getImages) {
          dispatch({
            type: ActionTypes.SET_CURRENT_GALLERY,
            payload: 'latest_photos' in getImages ? getImages.latest_photos! : getImages.photos!,
          });

          dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: false });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLocalStorageItem('@au-dela_filters', { sol: sol, camera: camera, rover: rover, latest: recency });
        updatePath({
          sol: sol,
          camera: camera!,
          rover: rover!.name,
          recency: recency,
        });
      }
    };

    rover?.name && getSelectedRoverImages();
  }, [dispatch, sol, camera, rover, recency, updatePath]);

  return (
    <div className='grid  lg:gap-20 md:gap-16 gap-10 pb-40 lg:mt-24 md:mt-20 mt-8'>
      <div key={rover?.name} className='flex justify-start md:gap-14 gap-7 md:flex-nowrap flex-wrap animate-enter '>
        <div className='grid lg:shrink-0 md:gap-10 place-items-start  md:grid-cols-1  grid-cols-2  gap-3 '>
          <GenerateRoverIframe />
          <div className='w-full flex md:flex-row flex-col flex-wrap gap-4 items-start justify-start'>
            <div className='flex  items-center  gap-2'>
              <RadioIcon
                className={`${
                  rover?.status === 'active' ? 'text-deep-green animate-animate-ping-custom' : 'text-error-red'
                } md:text-base text-sm`}
              />
              <p className='flex items-center gap-1 md:text-base text-sm leading-6'>
                <span>Status: </span>
                <span className={`${rover?.status === 'active' ? 'text-deep-green' : 'text-error-red'} `}>
                  {rover && rover.status}
                </span>
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <CalendarIcon className={`text-base text-deep-green`} />
              <p className='flex items-center gap-1 md:text-base text-sm leading-6'>
                <span className='leading-6 '>Launched:</span>
                <span className='font-light italic leading-6'>
                  {rover && dayjs(rover.launch_date).format('DD/MM/YYYY')}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='grid md:grid-cols-1  place-items-start lg:w-auto w-full lg:gap-10 md:gap-8 gap-6 '>
          <FilterGroup rovers={data.rovers} />
          <div className='md:py-4 py-0 order-1  grid grid-cols-1 place-items-start'>
            <label
              htmlFor='rover-bio'
              className='font-normal lg:text-xl text-base lg:leading-10 leading-6 text-deep-green'
            >
              Bio
            </label>
            <div key={rover?.id} id='rover-bio' className='flex gap-[2px] flex-wrap items-center perspective-3d px-4 '>
              {rover &&
                findNasaSource(rover!.id, NASA_ROVERS_3D)
                  ?.bio.split(/(\s+)/)
                  .map((txt, index) => {
                    return (
                      <span
                        key={index}
                        style={{ animationDelay: `${index / 40}s` }}
                        className={`animate-animate-text-custom relative transition-all origin-right opacity-0 inline-block font-light lg:text-xl text-sm lg:leading-10 leading-6 text-text-white`}
                      >
                        {txt}
                      </span>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
      {isLoading ? <Loading /> : <RoverPhotoGallery />}
    </div>
  );
};

export default RoverGalleryContent;
