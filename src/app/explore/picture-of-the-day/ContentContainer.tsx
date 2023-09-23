'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { ImageOfTheDay } from '@/app/types/imageOfTheDay';
import { getImageOfTheDay } from '@/app/utils/API/getImageOfTheDay';
import dayjs from 'dayjs';
import React from 'react';
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

  React.useEffect(() => {
    const handleUserCalendar = async () => {
      controls.start({ opacity: 0, transform: 'translateY(10rem) ' });
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
          controls.start({ opacity: 1, transform: 'translateY(0)' });
        }
      } catch (error) {}
    };

    handleUserCalendar();
  }, [currentDate, controls]);

  const CalendarLabel = () => {
    return (
      <div className='flex flex-col items-start justify-end gap-2 '>
        <p className='text-text-red text-base italic font-light'>Got a specific date in mind?</p>

        <div className='flex items-center justify-between border-b border-b-main-red px-4 py-2 '>
          <ReactDatePicker
            selected={currentDate}
            onChange={(date) => setCurrentDate(date)}
            maxDate={new Date()}
            className='!italic w-full bg-transparent font-light text-main-white text-base cursor-pointer  focus:outline-none '
            calendarClassName='!bg-main-white  !text-main-black'
            disabledKeyboardNavigation
            onFocus={(e) => e.target.blur()}
            scrollableYearDropdown
            showYearDropdown
          />
          <CalendarIcon className={`lg:text-2xl text-lg  text-main-white`} />
        </div>
      </div>
    );
  };

  return (
    <div className='mt-24 flex flex-col gap-8'>
      <div className=' flex w-full justify-between items-start flex-wrap gap-8 overflow-auto'>
        <Breadcrumbs />
        <CalendarLabel />
      </div>
      <div className='overflow-hidden'>
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(10rem)' }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <div className='flex w-full justify-between flex-wrap-reverse gap-6 items-end'>
            <DescriptionContainer
              date={dayjs(contentState.date).format('MM/DD/YYYY')}
              title={contentState.title}
              desc={contentState.desc}
            />
            <ImageContainer image={contentState.image} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentContainer;
