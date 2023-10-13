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
import { Variants, motion } from 'framer-motion';
import { FaHandHolding as HandIcon, FaRegHeart as HearthIcon } from 'react-icons/fa';
import { GoShareAndroid as ShareIcon } from 'react-icons/go';
import Loading from './loading';

interface ContentInterface {
  data: ImageOfTheDay;
}

const ContentContainer = (props: ContentInterface) => {
  const [currentDate, setCurrentDate] = React.useState<Date | any>(new Date());

  const [contentState, setContentState] = React.useState({
    image: props.data.url,
    desc: props.data.explanation,
    date: props.data.date,
    title: props.data.title,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const variantsArticle: Variants = {
    exit: { opacity: 0, transform: 'translateX(-100%)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
  };

  const variantsImage: Variants = {
    exit: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
  };

  React.useEffect(() => {
    const handleUserCalendar = async () => {
      setIsLoading(true);
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
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    handleUserCalendar();
  }, [currentDate]);

  const CalendarLabel = () => {
    return (
      <div className='flex flex-col items-start justify-end gap-2 lg:px-5 '>
        <p className='text-text-white text-base italic font-light leading-normal'>Got a specific date in mind?</p>

        <div className='flex group items-center justify-between border-b max-w-[11.5rem]  border-b-interactive-green/50 focus-within:border-b-interactive-green transition-colors duration-300 px-4 py-2 '>
          <ReactDatePicker
            selected={currentDate}
            onChange={(date) => setCurrentDate(date)}
            maxDate={new Date()}
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

  return (
    <div className='mt-24 flex flex-col gap-8'>
      <div className=' flex w-full justify-between items-center flex-wrap gap-8 '>
        <Breadcrumbs />
        <CalendarLabel />
      </div>

      <div className='grid w-full lg:grid-cols-2 md:grid-cols-1 gap-6 md:items-start items-center grid-flow-dense'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <motion.div variants={variantsArticle} initial='exit' animate='enter' transition={{ duration: 0.5 }}>
              <DescriptionContainer
                date={dayjs(contentState.date).format('MM/DD/YYYY')}
                title={contentState.title}
                desc={contentState.desc}
              />
            </motion.div>
            <motion.div
              variants={variantsImage}
              initial='exit'
              animate='enter'
              transition={{ duration: 0.5, delay: 1 }}
              className='relative'
            >
              <div className='relative w-full lg:max-w-lg xl:h-[40rem] md:h-[30rem] shadow-custom-image-strong-shadow aspect-square lg:col-start-2 col-start-1'>
                <ImageContainer image={contentState.image} />
              </div>
              <div className=''>
                <ShareIcon className={`text-2xl text-interactive-green/50`} />
                <HandIcon className={`text-2xl text-interactive-green/50`} />
                <HearthIcon className={`text-2xl text-interactive-green/50`} />
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentContainer;
