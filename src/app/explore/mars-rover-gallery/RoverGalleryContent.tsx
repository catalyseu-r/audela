'use client';

import { NASA_ROVERS_3D } from '@/app/staticData/nasaRovers3D';
import { MarsRoverProfile, MarsRoverProfiles } from '@/app/types/marsRoverTypes';
import React from 'react';
import { GiTrackedRobot as RoverIcon, GiSunrise as SunIcon, GiPhotoCamera as CameraIcon } from 'react-icons/gi';
import { LuClock4 as ClockIcon } from 'react-icons/lu';
import { IoRadioOutline as RadioIcon, IoCalendarClearOutline as CalendarIcon } from 'react-icons/io5';
import dayjs from 'dayjs';

interface RoverGalleryContentType {
  data: MarsRoverProfiles;
}

const RoverGalleryContent = ({ data: { rovers } }: RoverGalleryContentType) => {
  const [currentRover, setCurrentRover] = React.useState<MarsRoverProfile | null>(null);

  const updateCurrentRover = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const numValue = parseInt(event.target.value);

    const findFromStaticData = rovers.find((rover) => rover.id === numValue);

    findFromStaticData && setCurrentRover(findFromStaticData);
  };

  const GenerateRecency = () => {
    return (
      <div className='flex flex-col gap-4 items-start transition-all basis-1/4 max-w-[142px]'>
        <label htmlFor='recency' className='flex items-center gap-2 font-normal leading-6 text-base text-deep-green'>
          <ClockIcon className={'text-2xl'} />
          <p>Recency</p>
        </label>
        <select className='py-2 px-6 rounded bg-bg-black border outline-none focus:border-interactive-green transition-all border-deep-green/50 text-base text-text-white  !font-sans cursor-pointer w-full'>
          <option value='all'>All</option>
          <option value='most_recent'>Most recent</option>
        </select>
      </div>
    );
  };

  const GenerateSolPicker = () => {
    return (
      <div className='flex flex-col gap-4 items-start transition-all basis-1/4 max-w-[142px]'>
        <label htmlFor='sol' className='flex items-center gap-2 font-normal leading-6 text-base text-deep-green'>
          <SunIcon className={'text-2xl'} />
          <p>Sol</p>
        </label>
        <input
          className='py-2 px-6 rounded bg-bg-black border outline-none focus:border-interactive-green transition-all border-deep-green/50 text-base text-text-white  !font-sans cursor-pointer w-full'
          type='number'
          inputMode='numeric'
          name='sol'
          id='sol'
          max={currentRover?.max_sol}
        />
      </div>
    );
  };

  const GenerateCameras = () => {
    return (
      <div className='flex flex-col gap-4 items-start transition-all basis-1/4 max-w-[142px]'>
        <label htmlFor='camera' className='flex items-center gap-2 font-normal leading-6 text-base text-deep-green'>
          <CameraIcon className={'text-2xl'} />
          <p>Camera</p>
        </label>

        <select className='py-2 px-6 rounded bg-bg-black border outline-none focus:border-interactive-green transition-all border-deep-green/50 text-base text-text-white  !font-sans cursor-pointer w-full'>
          {currentRover?.cameras.map((item) => {
            return (
              <option className='' key={item.full_name} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  const findNasaSource = React.useCallback(
    (id: number | null) => NASA_ROVERS_3D.find((item) => item.id === id)?.source,
    []
  );

  const GenerateRoverPicker = () => {
    return (
      <div className='flex flex-col gap-4 items-start transition-all basis-1/4 max-w-[142px]'>
        <label htmlFor='rover' className='flex items-center gap-2 font-normal leading-6 text-base text-deep-green'>
          <RoverIcon className={'text-2xl'} />
          <p>Rover</p>
        </label>
        <select
          className='py-2 px-6 rounded bg-bg-black border outline-none focus:border-interactive-green transition-all border-deep-green/50 text-base text-text-white  !font-sans cursor-pointer w-full'
          onChange={updateCurrentRover}
          value={currentRover?.id}
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

  const GenerateRoverIframe = () => {
    return (
      <div className='w-[352px] h-[352px] aspect-square flex items-center justify-center md:shadow-custom-image-strong-shadow rounded'>
        {currentRover && (
          <iframe
            allowTransparency={true}
            loading='lazy'
            src={findNasaSource(currentRover.id)}
            className='w-full h-full object-fill rounded'
            allowFullScreen
          />
        )}
      </div>
    );
  };

  return (
    <div className='flex gap-14 items-start max-w-full'>
      <div className='grid gap-4'>
        <GenerateRoverIframe />
        <div className='flex items-center gap-2'>
          <RadioIcon
            className={`${
              currentRover?.status === 'active' ? 'text-deep-green animate-pulse' : 'text-error-red'
            } text-2xl`}
          />
          <p className='flex items-center gap-1'>
            <span>Status: </span>
            <span className={`${currentRover?.status === 'active' ? 'text-deep-green' : 'text-error-red'} `}>
              {currentRover && currentRover.status}
            </span>
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <CalendarIcon className={`text-2xl`} />
          <p className='flex items-center gap-1'>
            <span>Launch date: </span>
            <span className='font-light italic'>
              {currentRover && dayjs(currentRover.launch_date).format('DD/MM/YYYY')}
            </span>
          </p>
        </div>
      </div>
      <div className='flex items-center gap-10 transition-all w-full flex-wrap'>
        <GenerateRoverPicker />
        <GenerateSolPicker />
        <GenerateCameras />
        <GenerateRecency />
      </div>
    </div>
  );
};

export default RoverGalleryContent;
