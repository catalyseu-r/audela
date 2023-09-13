'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { ImageOfTheDay } from '@/app/types/imageOfTheDay';
import Image from 'next/image';
import React from 'react';
import Calendar from 'react-calendar';

const ContentContainer = (props: ImageOfTheDay) => {
  console.log('IMAGE', props);
  const [currentImage, setCurrentImage] = React.useState(props);
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  return (
    <>
      <Breadcrumbs />
      {props.explanation}
      <Image src={currentImage.hdurl} width={640} height={640} alt='astronomy picture of the day provided by NASA' />
      <Calendar onChange={(value) => console.log(value)} />
    </>
  );
};

export default ContentContainer;
