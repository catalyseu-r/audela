'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import UserInput from '@/app/components/UserInput';
import { PlanetaryDataArticle } from '@/app/types/planetaryData';
import Image from 'next/image';
import React from 'react';
import ReactPlayer from 'react-player';

interface ArticlePageContainerData {
  data: PlanetaryDataArticle | undefined;
  mainImage: { isVideo: boolean; url: string | undefined };
}

const ArticlePageContainer = ({ data, mainImage }: ArticlePageContainerData) => {
  const RenderImageOrVideo = () => (
    <div className={`w-full h-full relative `}>
      {mainImage.isVideo ? (
        <ReactPlayer url={mainImage.url} width='100%' height='100%' controls={true} light />
      ) : (
        <Image
          src={mainImage.url ?? ''}
          fill
          alt='NASA article image'
          className={` transition-all duration-500 opacity-0`}
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
        />
      )}
    </div>
  );

  return (
    <div className='pt-24 flex flex-col gap-8 w-full'>
      <div className=' flex w-full justify-between items-center flex-wrap gap-8'>
        <Breadcrumbs />
        <UserInput />
      </div>

      <div className=' w-full sm:w-5/6 xl:h-80 h-40'>
        <RenderImageOrVideo />
      </div>
    </div>
  );
};

export default ArticlePageContainer;
