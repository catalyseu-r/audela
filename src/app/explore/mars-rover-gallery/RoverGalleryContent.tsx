'use client';

import { NASA_ROVERS_3D } from '@/app/staticData/nasaRovers3D';
import { MarsRoverProfile, MarsRoverProfiles } from '@/app/types/marsRoverTypes';
import React from 'react';
import { IoRadioOutline as RadioIcon, IoCalendarClearOutline as CalendarIcon } from 'react-icons/io5';
import dayjs from 'dayjs';
import { getMarsRoverImages } from '@/app/utils/API/getMarsRoverImages';
import { useAppContext } from '@/app/contexts/store';
import { findNasaSource } from '@/app/utils/lists/findNasaSource';
import GenerateRoverIframe from './GenerateRoverIframe';

import { ActionTypes } from '@/app/types/actionTypes';
import { AppState } from '@/app/types/appState';
import RoverPhotoGallery from './RoverPhotoGallery';
import { useCreateQueryString } from '@/app/utils/hooks/useCreateQueryString';
import Loading from '../loading';
import { getLocalStorageItem, setLocalStorageItem } from '@/app/utils/localStorage/handleLocalStorage';
import { useWindowSearch } from '@/app/utils/hooks/useWindowSearch';
import FilterGroup from './FilterGroup';

const RoverGalleryContent = (data: MarsRoverProfiles) => {
  const {
    state: {
      marsFilterState: { sol, camera, rover, recency },
      currentGallery: { isLoading },
    },
    dispatch,
  } = useAppContext();

  const { updatePath } = useCreateQueryString();

  const { searchParamsFromLocation, params } = useWindowSearch();
  const initRover = React.useMemo(() => data.rovers.find((rover) => rover.status === 'active'), [data]);
  const findFromStaticData = React.useCallback(
    (roverName: string) => data.rovers.find((item) => item.name === roverName),
    [data.rovers]
  );

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
    const checkLocalStorage: Record<string, MarsRoverProfile | string> = getLocalStorageItem('@au-dela_filters');
    try {
      dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: true });
      if (checkLocalStorage && searchParamsFromLocation && params && !rover) {
        console.log('ALO IMA I PARAM I STORAGE');

        Object.entries(searchParamsFromLocation).map((entry) => {
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
      } else if (!checkLocalStorage && searchParamsFromLocation && params && !rover) {
        console.log('ALO NEMA STORAGE IMA PARAM');

        Object.entries(searchParamsFromLocation).map((entry) => {
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
      } else if (checkLocalStorage && !searchParamsFromLocation && !params && !rover) {
        console.log('ALO IMA STORAGE NEMA PARAM');
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
      } else if (!checkLocalStorage && !searchParamsFromLocation && !params && !rover) {
        console.log('ALO NEMA NISTA');
        setDefaultRover();
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: false });
    }
  }, [searchParamsFromLocation, params, dispatch, setDefaultRover, findFromStaticData, rover]);

  React.useEffect(() => {
    const getSelectedRoverImages = async () => {
      dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: true });

      try {
        const getImages = await getMarsRoverImages({
          rover: rover!.name,
          sol: sol,
          camera: camera!,
          latest: recency,
        });

        if (getImages) {
          console.log('IMAGES', getImages);
          dispatch({ type: ActionTypes.SET_CURRENT_GALLERY, payload: getImages });
          dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: false });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLocalStorageItem('@au-dela_filters', { sol: sol, camera: camera, rover: rover });
        updatePath({
          sol: sol,
          camera: camera!,
          rover: rover!.name,
        });
      }
    };

    rover?.name && getSelectedRoverImages();
  }, [dispatch, sol, camera, rover, recency, updatePath]);

  return (
    <div className='grid lg:gap-20 md:gap-16 gap-10 pb-40 lg:mt-24 mt-20'>
      <div
        key={rover?.name}
        className='flex md:justify-start justify-center gap-14 lg:flex-nowrap flex-wrap animate-enter'
      >
        <div className='grid md:gap-10 w-full md:grid-cols-1 md:items-center grid-cols-2 items-start gap-5 '>
          <GenerateRoverIframe />
          <div className='w-full flex flex-wrap gap-4 items-center'>
            <div className='flex md:flex-row flex-col md:items-center items-startgap-2'>
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
            <div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
              <CalendarIcon className={`text-base text-deep-green`} />
              <p className='flex items-center gap-1 md:text-base text-sm leading-6'>
                <span className='leading-6 '>Launched:</span>
                <span className='font-light italic leading-6'>
                  {rover && dayjs(rover.launch_date).format('DD/MM/YYYY')}
                </span>
              </p>
            </div>
            <FilterGroup rovers={data.rovers} />
          </div>
        </div>
        <div className='grid grid-cols-1 items-start gap-10'>
          <div className='py-4 self-stretch grid grid-cols-1 items-start'>
            <label htmlFor='rover-bio' className='font-normal text-xl leading-10 text-deep-green'>
              Bio
            </label>
            <div key={rover?.id} id='rover-bio' className='flex gap-[2px] flex-wrap items-center perspective-3d px-4'>
              {rover &&
                findNasaSource(rover!.id, NASA_ROVERS_3D)
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
      {isLoading ? <Loading /> : <RoverPhotoGallery />}
    </div>
  );
};

export default RoverGalleryContent;
