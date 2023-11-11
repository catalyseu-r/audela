'use client';

import { useAppContext } from '@/app/contexts/store';

import { ActionTypes } from '@/app/types/actionTypes';
import { GiTrackedRobot as RoverIcon } from 'react-icons/gi';
import React from 'react';
import { MarsRoverProfile, MarsRoverProfiles } from '@/app/types/marsRoverTypes';

const GenerateRoverPicker = ({ rovers }: MarsRoverProfiles) => {
  const {
    state: {
      marsFilterState: { rover },
    },
    dispatch,
  } = useAppContext();

  const resetFiltersAfterRoverChange = (rover: MarsRoverProfile) => {
    dispatch({
      type: ActionTypes.SET_MARS_ROVER_FILTER_STATE,
      payload: { key: 'sol', value: (rover.max_sol - 25).toString() },
    });

    dispatch({
      type: ActionTypes.SET_MARS_ROVER_FILTER_STATE,
      payload: { key: 'camera', value: rover.cameras[0].name },
    });
  };

  const updateCurrentRover = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const numValue = parseInt(event.target.value);
    const findFromStaticData = rovers.find((rover) => rover.id === numValue);

    if (findFromStaticData) {
      dispatch({ type: ActionTypes.SET_MARS_ROVER_FILTER_STATE, payload: { key: 'rover', value: findFromStaticData } });
      resetFiltersAfterRoverChange(findFromStaticData);
    }
  };

  if (!rover || !rover.name) {
    return null;
  }

  return (
    <div className='flex flex-col gap-4 items-start transition-all'>
      <label
        htmlFor='rover'
        className='flex items-center gap-2 font-normal leading-6 lg:text-base text-sm text-deep-green'
      >
        <RoverIcon className={'lg:text-2xl text-base'} />
        <p>Rover</p>
      </label>
      <select
        className='py-2 px-4 rounded bg-bg-black  border-r-[16px] border-transparent outline outline-1 outline-deep-green/50 focus:outline-interactive-green transition-all lg:text-base text-sm text-text-white  !font-sans cursor-pointer max-w-[17ch] '
        onChange={updateCurrentRover}
        value={rover?.id}
      >
        {rovers.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default GenerateRoverPicker;
