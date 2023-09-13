// 'use client';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { ImageOfTheDay } from '@/app/types/imageOfTheDay';
import Image from 'next/image';
import React from 'react';

const ImageOfTheDayContainer = (props: ImageOfTheDay) => {
  return (
    <>
      <Breadcrumbs />
      <Image src={props.hdurl} width={640} height={640} alt='astronomy picture of the day provided by NASA' />
    </>
  );
};

export default ImageOfTheDayContainer;
