'use client';

import { MarsRoverProfiles } from '@/app/types/marsRoverTypes';
import React from 'react';
import GenerateRoverPicker from './GenerateRoverPicker';
import GenerateSolPicker from './GenerateSolPicker';
import GenerateCameras from './GenerateCameras';
import GenerateRecency from './GenerateRecency';
import { HiOutlineCog as CogIcon } from 'react-icons/hi';

const FilterGroup = ({ rovers }: MarsRoverProfiles) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);

  return (
    <div className={`order-1 md:w-auto w-full `}>
      <div className='md:flex hidden gap-10 items-center flex-wrap justify-start'>
        <GenerateRoverPicker rovers={rovers} />
        <GenerateSolPicker />
        <GenerateCameras />
        <GenerateRecency />
      </div>
      <div
        className={`md:hidden  relative flex items-center justify-start  ${
          !isDropdownOpen && 'overflow-hidden '
        } transition-all `}
      >
        <CogIcon
          className={`z-20 text-base cursor-pointer ${
            isDropdownOpen ? 'rotate-45 text-interactive-green scale-125' : 'text-text-white'
          } transition-all `}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen && (
          <div
            className={`animate-animate-filters absolute w-full min-h-iframes-images-sm  bg-bg-black/90 rounded flex flex-wrap items-start lg:gap-10 md:gap-8 gap-6 h-min inset-0 py-6 px-4 z-10`}
          >
            <GenerateRoverPicker rovers={rovers} />
            <GenerateSolPicker />
            <GenerateCameras />
            <GenerateRecency />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterGroup;
