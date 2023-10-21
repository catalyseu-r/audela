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

import Loading from './loading';
import toast from 'react-hot-toast';
import LikeAndShare from '@/app/components/LikeAndShare';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getLocalStorageItem, setLocalStorageItem } from '@/app/utils/localStorage/handleLocalStorage';

interface ContentInterface {
  data: ImageOfTheDay;
}

const ContentContainer = (props: ContentInterface) => {
  const [currentDate, setCurrentDate] = React.useState<Date | null | undefined>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [contentState, setContentState] = React.useState({
    image: '',
    desc: '',
    date: '',
    title: '',
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

  React.useEffect(() => {
    const getStoredDateFromClient = () => {
      try {
        setIsLoading(true);

        if (!getLocalStorageItem('@au-dela_date') && searchParams.get('date') && !currentDate) {
          setCurrentDate(new Date(String(searchParams.get('date'))));
        } else if (getLocalStorageItem('@au-dela_date') && searchParams.get('date') && !currentDate) {
          const currentDateFromClient = new Date(String(searchParams.get('date')));
          setCurrentDate(currentDateFromClient);
        } else if (!currentDate) {
          setCurrentDate(new Date());
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    getStoredDateFromClient();
  }, [searchParams, currentDate]);

  const handleDatePick = React.useCallback((date: Date) => {
    setCurrentDate(date);
    setIsLoading(true);
  }, []);

  React.useEffect(() => {
    const handleUserCalendar = async () => {
      try {
        const callApi = await getImageOfTheDay({ date: dayjs(currentDate).format('YYYY-MM-DD') });
        if (callApi) {
          const { url, hdurl, explanation, date, title } = callApi;
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
        } else {
          setIsLoading(false);

          if (getLocalStorageItem('@au-dela_date')) {
            toast.error('There was a problem with your request 😓 try picking diffirent date!');
          } else {
            toast.error(
              "There was a problem with your request 😓 if current time is 00-05am it's very possible that the image has not been updated for today"
            );
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      } finally {
        setIsLoading(false);
        setLocalStorageItem('@au-dela_date', dayjs(currentDate).format('YYYY-MM-DD'));
        router.replace(`${pathname}?${createQueryString('date', dayjs(currentDate).format('YYYY-MM-DD'))}`);
      }
    };

    handleUserCalendar();
  }, [currentDate, pathname, router, createQueryString]);

  const CalendarLabel = () => {
    return (
      <div className='flex flex-col lg:items-start items-end justify-end gap-2  lg:px-5 lg:w-auto w-full lg:justify-self-auto justify-self-center'>
        <p className='text-text-white text-base italic font-light leading-normal'>Got a specific date in mind?</p>

        <div className='flex group items-center justify-between border-b max-w-[11.5rem]  border-b-interactive-green/50 focus-within:border-b-interactive-green transition-colors duration-300 px-4 py-2 '>
          <ReactDatePicker
            selected={currentDate}
            onChange={(date) => handleDatePick(date!)}
            maxDate={new Date()}
            minDate={new Date('1995/06/16')}
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
    <div className='lg:mt-24 mt-20 w-full flex flex-col gap-8'>
      <div className=' flex w-full justify-between items-start flex-wrap gap-8 '>
        <Breadcrumbs />
        <CalendarLabel />
      </div>

      <div className='grid w-full  md:mt-24 lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-24 md:place-items-start items-center'>
        {isLoading ? (
          <Loading />
        ) : contentState.error ? (
          <></>
        ) : (
          contentState.title && (
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
                  <LikeAndShare
                    articleData={{
                      title: contentState.title,
                      url: pathname,
                      description: contentState.desc,
                      ogImage: contentState.image,
                    }}
                  />
                </div>
              </motion.div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default ContentContainer;
