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
import GenerateSolPicker from './GenerateSolPicker';
import GenerateRecency from './GenerateRecency';
import GenerateRoverPicker from './GenerateRoverPicker';
import GenerateCameras from './GenerateCameras';
import { ActionTypes } from '@/app/types/actionTypes';

import { AppState } from '@/app/types/appState';

import RoverPhotoGallery from './RoverPhotoGallery';
import { useCreateQueryString } from '@/app/utils/hooks/useCreateQueryString';
import Loading from '../loading';
import { getLocalStorageItem, setLocalStorageItem } from '@/app/utils/localStorage/handleLocalStorage';

export interface RoverGalleryContentType {
  data: MarsRoverProfiles;
}

const RoverGalleryContent = (data: MarsRoverProfiles) => {
  const {
    state: {
      marsFilterState: { sol, camera, rover },
      currentGallery: { isLoading },
    },
    dispatch,
  } = useAppContext();

  const { updatePath } = useCreateQueryString();
  const location = React.useMemo(() => (window !== undefined ? window.location.search : undefined), []);
  const initRover = React.useMemo(() => data.rovers.find((rover) => rover.status === 'active'), [data]);
  const findFromStaticData = React.useCallback(
    (roverName: string) => data.rovers.find((item) => item.name === roverName),
    [data.rovers]
  );

  React.useEffect(() => {
    const getSelectedRoverImages = async () => {
      dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: true });

      try {
        const getImages: AppState['currentGallery'] | undefined = await getMarsRoverImages({
          rover: rover!.name,
          sol: sol,
          camera: camera!,
        });

        if (getImages) {
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
  }, [dispatch, sol, camera, rover, updatePath]);

  const getQueryParams = React.useCallback(() => {
    if (location) {
      const queryStr = location.substring(1);

      const splitQuery = queryStr.split('&');

      const readParams = splitQuery.reduce<Record<string, string>>((acc, curr) => {
        const [key, value] = curr.split('=');
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});

      return readParams;
    }
  }, [location]);

  React.useEffect(() => {
    const checkLocalStorage: Record<string, string> = getLocalStorageItem('@au-dela_filters');

    const params = getQueryParams();

    const setDefaultRover = () => {
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
    };

    try {
      dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: true });
      if (checkLocalStorage && params && !rover) {
        console.log('PRVI UVJET');
        Object.entries(params).map((entry) => {
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
      } else if (!checkLocalStorage && params && !rover) {
        console.log('DRUGI UVJET');

        Object.entries(params).map((entry) => {
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
      } else if (checkLocalStorage && !params && !rover) {
        console.log('TRECI UVJET');

        Object.entries(checkLocalStorage).map((entry) => {
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
      } else if (!checkLocalStorage && !params && !rover) {
        setDefaultRover();
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: ActionTypes.SET_IS_CURRENT_GALLERY_LOADING, payload: false });
    }
  }, [getQueryParams, dispatch, initRover, rover, findFromStaticData]);

  return (
    <div className='grid lg:gap-20 md:gap-16 gap-10 pb-40 lg:mt-24 mt-20'>
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
                    rover?.status === 'active' ? 'text-deep-green animate-animate-ping-custom' : 'text-error-red'
                  } text-base`}
                />
                <p className='flex items-center gap-1 text-base leading-6'>
                  <span>Status: </span>
                  <span className={`${rover?.status === 'active' ? 'text-deep-green' : 'text-error-red'} `}>
                    {rover && rover.status}
                  </span>
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <CalendarIcon className={`text-base text-deep-green`} />
                <p className='flex items-center gap-1 text-base leading-6'>
                  <span className='leading-6 text-base'>Launched:</span>
                  <span className='font-light italic leading-6 text-base'>
                    {rover && dayjs(rover.launch_date).format('DD/MM/YYYY')}
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
      )}

      <RoverPhotoGallery />
    </div>
  );
};

export default RoverGalleryContent;
