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
import { FaHandHolding as HandIcon, FaRegHeart as HeartIcon } from 'react-icons/fa';
import { GoShareAndroid as ShareIcon } from 'react-icons/go';
import Loading from './loading';
import toast from 'react-hot-toast';

interface ContentInterface {
  data: ImageOfTheDay;
}

const ContentContainer = (props: ContentInterface) => {
  const [currentDate, setCurrentDate] = React.useState<Date | any>(new Date());
  const [isLikeAnimation, setIsLikeAnimation] = React.useState<boolean>(false);

  const [contentState, setContentState] = React.useState({
    image: props.data.url,
    desc: props.data.explanation,
    date: props.data.date,
    title: props.data.title,
    error: false,
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

  const handleLikeAnimation = React.useCallback(() => {
    setIsLikeAnimation(true);

    setTimeout(
      () =>
        toast.custom(
          (t) => (
            <div
              // draggable
              className={`${t.visible ? 'animate-enter ' : 'animate-leave'} max-w-md w-full bg-text-white rounded-sm 
              z-50 pointer-events-auto transition-all grid grid-cols-1 px-4 py-2 gap-4`}
            >
              <div className='grid grid-cols-1 gap-2'>
                <p className='text-base font-light leading-normal text-bg-black/50'>
                  Looks like you&apos;ve hit the like button 😍
                </p>
                <p className='text-base leading-normal font-light text-bg-black'>
                  I will build comment/like/save system soon. In the meantime you can enjoy this amazing message.
                </p>
              </div>

              <button
                onClick={() => toast.dismiss(t.id)}
                className='bg-deep-green text-text-white font-normal text-base w-max place-self-end px-4 py-2 rounded'
              >
                Ok 👩🏻‍🚀
              </button>
            </div>
          ),
          { duration: 4000 }
        ),
      700
    );

    setTimeout(() => setIsLikeAnimation(false), 600);
  }, []);

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
              error: false,
            };
          });
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setContentState((_prev) => {
            return { ..._prev, error: true };
          });
          toast.error(
            "There was a problem with your request (if current time is 00-05am it's very possible that the image has not been updated for today)"
          );
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    handleUserCalendar();
  }, [currentDate]);

  const CalendarLabel = () => {
    return (
      <div className='flex flex-col lg:items-start items-end justify-end gap-2  lg:px-5 lg:w-auto w-full lg:justify-self-auto justify-self-center'>
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
    <div className='lg:mt-24 mt-16 w-full flex flex-col gap-8'>
      <div className=' flex w-full justify-between items-center flex-wrap gap-8 '>
        <Breadcrumbs />
        <CalendarLabel />
      </div>

      <div className='grid w-full  md:mt-24 lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-24 md:place-items-start items-center'>
        {isLoading ? (
          <Loading />
        ) : contentState.error ? (
          <></>
        ) : (
          <>
            <motion.div
              variants={variantsArticle}
              initial='exit'
              animate='enter'
              transition={{ duration: 0.5 }}
              className='lg:order-1 order-2'
            >
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
              className='order-1 lg:order-2 w-auto md:w-full'
            >
              <div className='relative md:h-[40rem] h-[35rem] flex flex-col  gap-6 lg:gap-20 items-start justify-start '>
                <ImageContainer image={contentState.image} />

                <div className='flex lg:w-5/6 w-full  items-center justify-start gap-9 '>
                  <div
                    onClick={() => !isLikeAnimation && handleLikeAnimation()}
                    className='w-12 h-12 group hover:border-interactive-green transition-all cursor-pointer relative rounded-full border border-interactive-green/50 grid place-items-center'
                  >
                    <HeartIcon
                      className={`text-lg text-interactive-green/50 absolute bottom-1/2 left-[47%] ${
                        isLikeAnimation && 'animate-animate-heart'
                      }  transition-all`}
                    />
                    <HandIcon
                      className={`text-3xl transition-all origin-left ${
                        isLikeAnimation && 'animate-animate-hand'
                      } text-interactive-green/50`}
                    />
                  </div>

                  <div className='w-12 h-12 rounded-full border border-interactive-green/50 grid place-items-center'>
                    <ShareIcon className={`text-3xl text-interactive-green/50`} />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentContainer;
