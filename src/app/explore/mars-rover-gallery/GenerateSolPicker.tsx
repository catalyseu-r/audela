'use client';

import { useAppContext } from '@/app/contexts/store';
import { ActionTypes } from '@/app/types/actionTypes';
import { PhotoRecency } from '@/app/types/appState';

import React from 'react';

import { GiSunrise as SunIcon } from 'react-icons/gi';
import { RxQuestionMarkCircled as QuestionIcon } from 'react-icons/rx';

const GenerateSolPicker = () => {
  const {
    state: {
      marsFilterState: { rover, sol, recency },
    },
    dispatch,
  } = useAppContext();

  let timeoutId: any;

  const updateCurrentSol = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parseInput = event.target.value.toString();

    clearTimeout(timeoutId);

    timeoutId = setTimeout(
      () => dispatch({ type: ActionTypes.SET_MARS_ROVER_FILTER_STATE, payload: { key: 'sol', value: parseInput } }),
      350
    );
  };

  const [isTooltip, setIsTooltip] = React.useState<boolean>(false);

  const isMostRecent = recency === PhotoRecency.latest_photos;

  const toggleTooltip = React.useCallback(() => setIsTooltip((_prev) => !_prev), []);

  const tooltipText = `The term "sol" refers to a Martian day, equivalent to approximately 24 hours, 39 minutes, and 35
          seconds on Earth. Scientists use sols to measure time on Mars.`;

  if (!rover) {
    return null;
  }

  return (
    <div className='flex flex-col gap-4 items-start transition-all '>
      <label
        htmlFor='Sol'
        className={`font-normal flex items-center relative  justify-between w-full leading-6 lg:text-base text-sm  ${
          isMostRecent ? 'text-deep-green/50' : 'text-deep-green'
        }`}
      >
        <div className='flex items-center gap-2 '>
          <SunIcon className={'lg:text-2xl text-base'} />
          <span>Sol</span>
        </div>
        <QuestionIcon
          onClick={toggleTooltip}
          className={`lg:text-2xl text-xl transition-all cursor-pointer ${
            isTooltip ? 'text-interactive-green scale-125' : 'text-deep-green'
          }`}
        />
      </label>

      {isTooltip && (
        <div className='animate-animate-tooltip absolute flex gap-1 items-center flex-wrap bg-bg-black/90 rounded py-2 px-4 text-text-white md:w-[calc(45vw+2rem)] w-[calc(60vw+2rem)]   transition-all'>
          {tooltipText.split(/(\s+)/).map((txt, index) => {
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
      )}

      <input
        style={{
          WebkitAppearance: 'none',
          MozAppearance: 'textfield',
        }}
        className={`py-2 px-4 rounded bg-bg-black  border-r-[16px] border-transparent outline outline-1 focus:outline-interactive-green transition-all lg:text-base text-sm text-text-white  !font-sans  w-full appearance-none max-w-[12ch] ${
          isMostRecent ? 'outline-deep-green/20 cursor-not-allowed' : 'outline-deep-green/50 cursor-pointer'
        }`}
        type='number'
        inputMode='numeric'
        name='sol'
        id='sol'
        max={rover.max_sol}
        onChange={updateCurrentSol}
        value={sol}
        disabled={isMostRecent}
      />
    </div>
  );
};

export default GenerateSolPicker;
