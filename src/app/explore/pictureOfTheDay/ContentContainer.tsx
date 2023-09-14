'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { ImageOfTheDay } from '@/app/types/imageOfTheDay';
import { getImageOfTheDay } from '@/app/utils/API/getImageOfTheDay';
import dayjs from 'dayjs';
import React, { Suspense, useEffect } from 'react';

import ImageContainer from './ImageContainer';
import DescriptionContainer from './DescriptionContainer';
import Loading from './Loading';
import { BsCalendarDate as CalendarIcon } from 'react-icons/bs';
import ReactDatePicker from 'react-datepicker';

interface ContentInterface {
  data: ImageOfTheDay;
}

const ContentContainer = (props: ContentInterface) => {
  const [currentDate, setCurrentDate] = React.useState<Date | any>(new Date());
  const [showCalendar, setShowCalendar] = React.useState<boolean>(false);

  const [contentState, setContentState] = React.useState({
    image: props.data.url,
    desc: props.data.explanation,
    date: props.data.date,
    title: props.data.title,
  });

  useEffect(() => {
    const handleUserCalendar = async () => {
      try {
        const callApi = await getImageOfTheDay({ date: dayjs(currentDate).format('YYYY-MM-DD') });
        if (callApi) {
          const { url, explanation, date, title } = callApi;
          setContentState((_prev) => {
            return {
              ..._prev,
              image: url,
              desc: explanation,
              date: date,
              title: title,
            };
          });
        }
      } catch (error) {}
    };

    handleUserCalendar();
  }, [currentDate]);

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const CalendarLabel = () => {
    return (
      <div className='flex flex-col items-center justify-end gap-2 '>
        <p className='text-text-red text-base italic font-light'>Got a specific date in mind?</p>

        {/* <p className='text-main-white text-base font-light italic'>{dayjs(currentDate).format('DD/MM/YYYY')}</p> */}
        {/* <CalendarIcon className={showCalendar ? 'text-main-red text-2xl' : 'text-main-white text-2xl'} /> */}
        <ReactDatePicker
          selected={currentDate}
          onChange={(date) => setCurrentDate(date)}
          maxDate={new Date()}
          // showIcon
          className='w-full bg-transparent text-main-white text-base border-b border-b-main-red px-4 py-2 cursor-pointer  focus:border focus:border-main-red focus:outline-none'
          // customInput={
          //   <CalendarIcon className={showCalendar ? 'text-main-red text-2xl' : 'text-main-white text-2xl'} />
          // }
        />
      </div>
    );
  };

  return (
    <>
      <div className='mt-8 flex w-full justify-between items-start flex-wrap'>
        <Breadcrumbs />
        <CalendarLabel />
      </div>

      <div className='flex w-full justify-between flex-wrap'>
        <DescriptionContainer date={contentState.date} title={contentState.title} desc={contentState.desc} />
        <ImageContainer image={contentState.image} />
      </div>
    </>
  );
};

export default ContentContainer;
