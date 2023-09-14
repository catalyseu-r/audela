'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { ImageOfTheDay } from '@/app/types/imageOfTheDay';
import { getImageOfTheDay } from '@/app/utils/API/getImageOfTheDay';
import dayjs from 'dayjs';
import React, { Suspense, useEffect } from 'react';
import Calendar from 'react-calendar';
import ImageContainer from './ImageContainer';
import DescriptionContainer from './DescriptionContainer';
import Loading from './Loading';

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

  useEffect(() => {
    const handleUserCalendar = async () => {
      try {
        const callApi = await getImageOfTheDay({ date: dayjs(currentDate).format('YYYY-MM-DD') });
        if (callApi) {
          setContentState((_prev) => {
            return {
              ..._prev,
              image: callApi.url,
              desc: callApi.explanation,
              date: callApi.date,
              title: callApi.title,
            };
          });
        }
      } catch (error) {}
    };

    handleUserCalendar();
  }, [currentDate]);

  return (
    <>
      <Breadcrumbs />
      <Calendar onChange={(value) => setCurrentDate(value)} maxDate={new Date()} />
      <Suspense fallback={<Loading />}>
        <ImageContainer image={contentState.image} />
      </Suspense>
      <DescriptionContainer date={contentState.date} title={contentState.title} desc={contentState.desc} />
    </>
  );
};

export default ContentContainer;
