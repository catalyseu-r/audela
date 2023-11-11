'use client';

import { MarsRoverProfiles } from '@/app/types/marsRoverTypes';
import React from 'react';
import GenerateRoverPicker from './GenerateRoverPicker';
import GenerateSolPicker from './GenerateSolPicker';
import GenerateCameras from './GenerateCameras';
import GenerateRecency from './GenerateRecency';
import { HiOutlineCog as CogIcon } from 'react-icons/hi';

const FilterGroup = ({ rovers }: MarsRoverProfiles) => {
  return (
    <div className='flex items-center md:justify-start justify-center lg:gap-10 md:gap-8 gap-6 transition-all  flex-wrap'>
      <CogIcon />
      {/* <GenerateRoverPicker rovers={rovers} />
      <GenerateSolPicker />
      <GenerateCameras />
      <GenerateRecency /> */}
    </div>
  );
};

export default FilterGroup;
