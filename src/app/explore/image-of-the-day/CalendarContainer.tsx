'use client';

import { useAppContext } from '@/app/contexts/store';
import { maximumDateForImageOfTheDay, minimumDateForImageOfTheDay } from '@/app/staticData/variables';
import { ActionTypes } from '@/app/types/actionTypes';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { BsCalendarDate as CalendarIcon } from 'react-icons/bs';

const CalendarContainer = () => {
  const {
    state: { imageOfTheDayCurrentDate },
    dispatch,
  } = useAppContext();

  const handleDatePick = React.useCallback(
    (date: Date) => dispatch({ type: ActionTypes.SET_CURRENT_IMAGE_OF_THE_DAY_DATE, payload: date }),
    [dispatch]
  );

  return (
    <div className='flex flex-col lg:items-start items-end justify-end gap-2  lg:px-5 lg:w-auto w-full lg:justify-self-auto justify-self-center'>
      <p className='text-text-white text-base italic font-light leading-normal'>Got a specific date in mind?</p>

      <div className='flex group items-center justify-between border-b max-w-[11.5rem]  border-b-interactive-green/50 focus-within:border-b-interactive-green transition-colors duration-300 px-4 py-2 '>
        <ReactDatePicker
          selected={new Date(imageOfTheDayCurrentDate!)}
          onChange={(date) => handleDatePick(date!)}
          maxDate={maximumDateForImageOfTheDay}
          minDate={minimumDateForImageOfTheDay}
          className='!italic w-full bg-transparent font-light text-text-white text-base cursor-pointer  focus:outline-none '
          calendarClassName='!bg-main-white  !text-bg-black'
          disabledKeyboardNavigation
          onFocus={(e) => e.target.blur()}
          scrollableYearDropdown
          showYearDropdown
        />
        <CalendarIcon className={`lg:text-2xl text-lg group-focus:text-interactive-green  text-text-white`} />
      </div>
    </div>
  );
};

export default CalendarContainer;
