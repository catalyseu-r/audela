'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { ImageOfTheDay } from '@/app/types/imageOfTheDay';
import { getImageOfTheDay } from '@/app/utils/API/getImageOfTheDay';
import dayjs from 'dayjs';
import React, { Suspense, useEffect } from 'react';
import ImageContainer from './ImageContainer';
import DescriptionContainer from './DescriptionContainer';
import { BsCalendarDate as CalendarIcon } from 'react-icons/bs';
import ReactDatePicker from 'react-datepicker';
import { motion, useAnimation } from 'framer-motion';

interface ContentInterface {
  data: ImageOfTheDay;
}

const ContentContainer = (props: ContentInterface) => {
  const [currentDate, setCurrentDate] = React.useState<Date | any>(new Date());
  const controls = useAnimation();
  const [contentState, setContentState] = React.useState({
    image: props.data.url,
    desc: props.data.explanation,
    date: props.data.date,
    title: props.data.title,
  });

  useEffect(() => {
    const handleUserCalendar = async () => {
      controls.start({ opacity: 0, scale: 0.97 });
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
          controls.start({ opacity: 1, scale: 1 });
        }
      } catch (error) {}
    };

    handleUserCalendar();
  }, [currentDate, controls]);

  const CalendarLabel = () => {
    return (
      <div className='flex flex-col items-center justify-end gap-2 '>
        <p className='text-text-red text-base italic font-light'>Got a specific date in mind?</p>

        <ReactDatePicker
          selected={currentDate}
          onChange={(date) => setCurrentDate(date)}
          maxDate={new Date()}
          className='w-full bg-transparent text-main-white text-base  border-b border-b-main-red px-4 py-2 cursor-pointer   focus:border-main-white focus:outline-none'
        />
      </div>
    );
  };

  return (
    <div className='mt-8 flex flex-col gap-8'>
      <div className=' flex w-full justify-between items-start flex-wrap gap-8'>
        <Breadcrumbs />
        <CalendarLabel />
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={controls} transition={{ duration: 0.5 }}>
        <div className='flex w-full justify-between flex-wrap-reverse gap-6 items-end'>
          <DescriptionContainer date={contentState.date} title={contentState.title} desc={contentState.desc} />
          <ImageContainer image={contentState.image} />
        </div>
      </motion.div>
    </div>
  );
};

export default ContentContainer;
