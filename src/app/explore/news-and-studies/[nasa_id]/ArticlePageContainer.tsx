'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { PlanetaryDataArticleBody } from '@/app/types/planetaryData';
import Image from 'next/image';
import React from 'react';
import ReactPlayer from 'react-player';

import { Chakra_Petch } from 'next/font/google';

import { HiOutlineHashtag as HashTag } from 'react-icons/hi';
import LikeAndShare from '@/app/components/LikeAndShare';
import Link from 'next/link';
const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });

interface ArticlePageContainerData {
  articleData: PlanetaryDataArticleBody | undefined;
  mainImage: {
    isVideo: boolean;
    url: string | undefined;
    mediaThumb: string | undefined;
  };
  moreLikeThis?: any[];
}

const ArticlePageContainer = ({ articleData, mainImage }: ArticlePageContainerData) => {
  const { title, description, description_508, keywords, photographer, secondary_creator } = articleData!;

  const reg = /(https?:\/\/[^\s]+)/g;

  const RenderImageOrVideo = () => {
    return mainImage.isVideo ? (
      <ReactPlayer
        url={mainImage.url}
        width='100%'
        className='rounded'
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
        className={` transition-all duration-500 opacity-0 rounded`}
        onLoadingComplete={(image) => image.classList.remove('opacity-0')}
        placeholder={'blur'}
        blurDataURL={mainImage.mediaThumb}
        loading='eager'
      />
    );
  };

  const formatDesc = (desc: string) =>
    desc.split('. ').map((txt, index) => {
      return txt.match(reg) ? (
        <span key={txt} className='text-text-white text-base xl:text-lg leading-8 flex flex-wrap items-center gap-1'>
          <p>Read more at:</p>
          <Link className='text-deep-green hover:text-interactive-green transition-colors' href={txt}>
            {txt}
          </Link>
        </span>
      ) : (
        <p className=' text-text-white font-light text-base xl:text-lg leading-8' key={txt}>
          {txt}
        </p>
      );
    });

  return (
    <div className='py-24 flex flex-col  gap-20 w-full z-20'>
      <div className=' flex w-full justify-between items-center flex-wrap gap-8'>
        <Breadcrumbs />
      </div>

      <div className=' w-full lg:min-h-iframes-images-lg md:min-h-iframes-images-md min-h-iframes-images-sm aspect-video relative md:shadow-custom-article-shadow rounded'>
        <RenderImageOrVideo />
      </div>

      <div className='grid grid-cols-1 gap-9 place-items-start max-w-[58rem] mx-auto '>
        <h2 className={`${chakraP.className} col-start-1   lg:text-4xl md:text-2xl text-xl text-accent-pink px-6`}>
          {title}
        </h2>

        <div className='grid grid-cols-1 gap-9 items-center jusitfy-center  px-6 '>
          {formatDesc(description ?? description_508)}
        </div>

        <div className='mt-9 grid grid-cols-1 gap-16 place-self-end'>
          <div className='flex flex-wrap-reverse justify-end items-center gap-9 max-w-xl place-self-end px-6'>
            {keywords.map((keyword) => (
              <button key={keyword} className='flex items-center gap-1 px-4 py-2 border border-deep-green rounded'>
                <HashTag className={`text-text-white text-base`} />
                <p className='text-text-white text-base leading-6 font-light'>{keyword}</p>
              </button>
            ))}
          </div>

          <div className='place-self-end'>
            <LikeAndShare />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePageContainer;
