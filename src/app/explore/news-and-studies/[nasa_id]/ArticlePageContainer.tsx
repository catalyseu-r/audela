'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import UserInput from '@/app/components/UserInput';
import { PlanetaryDataArticleBody } from '@/app/types/planetaryData';
import Image from 'next/image';
import React from 'react';
import ReactPlayer from 'react-player';

import { Chakra_Petch } from 'next/font/google';
import dayjs from 'dayjs';
const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });

interface ArticlePageContainerData {
  articleData: PlanetaryDataArticleBody | undefined;
  mainImage: {
    isVideo: boolean;
    url: string | undefined;
    mediaThumb: string | undefined;
  };
}

const ArticlePageContainer = ({ articleData, mainImage }: ArticlePageContainerData) => {
  const { title, description, keywords, date_created } = articleData!;

  const RenderImageOrVideo = () => (
    <>
      {mainImage.isVideo ? (
        <ReactPlayer
          url={mainImage.url}
          width='100%'
          height='100%'
          controls={true}
          config={{
            file: {
              attributes: {
                poster: mainImage.mediaThumb,
              },
            },
          }}
        />
      ) : (
        <Image
          src={mainImage.url ?? ''}
          fill
          alt='NASA article image'
          className={` transition-all duration-500 opacity-0`}
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
          placeholder={'blur'}
          blurDataURL={mainImage.mediaThumb}
        />
      )}
    </>
  );

  const formatDesc = description.split('. ').map((txt, index) => (
    <p className='w-full text-main-white font-light text-base xl:text-lg lg:px-8 px-4 leading-6' key={index}>
      {txt}
    </p>
  ));

  return (
    <div className='pt-24 flex flex-col gap-8 w-full'>
      <div className=' flex w-full justify-between items-center flex-wrap gap-8'>
        <Breadcrumbs />
      </div>

      <div className=' w-full lg:min-h-iframes-images-lg md:min-h-iframes-images-md min-h-iframes-images-sm aspect-video relative'>
        <RenderImageOrVideo />
      </div>

      <div className='max-w-fit flex items-end justify-between px-4 flex-wrap gap-8'>
        <h2 className={`${chakraP.className} lg:text-4xl md:text-2xl text-xl text-main-white`}>{title}</h2>
        <p className='text-dimmed-white lg:text-xl md:text-base text-sm italic font-light leading-6'>
          {dayjs(date_created).format('DD/MM/YYYY')}
        </p>
      </div>
      <div className='lg:my-6 md:my-3 my-1 w-3/4 mx-auto bg-dimmed-white-full stroke-inherit h-[1px]'></div>
      <div className='inline-flex flex-col gap-9 items-start jusitfy-center lg:max-w-lg w-auto px-6'>{formatDesc}</div>
    </div>
  );
};

export default ArticlePageContainer;
