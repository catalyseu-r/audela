'use client';

import { PlanetaryDataArticleBody } from '@/app/types/planetaryData';

import Image from 'next/image';
import React, { memo } from 'react';
import ReactPlayer from 'react-player';
import Link from 'next/link';

import { useAppContext } from '@/app/contexts/store';

import { usePathname } from 'next/navigation';
import { Chakra_Petch } from 'next/font/google';
import { HiOutlineHashtag as HashTag } from 'react-icons/hi';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import LikeAndShare from '@/app/components/LikeAndShare';

const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });

import placeholder from '../../../img/placeholder-article.jpg';
import { planetarySearch } from '@/app/utils/API/planetarySearch';
import { ActionTypes } from '@/app/types/actionTypes';
import { generateRelatedItems } from '@/app/utils/lists/generateRelated';

import RelatedArticles from './RelatedArticles';

interface ArticlePageContainerData {
  articleData: PlanetaryDataArticleBody | undefined;
  mainImage: {
    isVideo: boolean;
    url: string | undefined;
    mediaThumb: string | undefined;
  };
}

const ArticlePageContainer = ({ articleData, mainImage }: ArticlePageContainerData) => {
  const { title, description, description_508, keywords, photographer, secondary_creator } = articleData!;

  const currentPath = usePathname();

  const {
    state: { fullQuery },
    dispatch,
  } = useAppContext();

  React.useEffect(() => {
    const fetchRelatedContent = async () => {
      const data = await planetarySearch({ query: fullQuery ?? '' });

      if (data) {
        const generatedRelated = data.collection.items;
        dispatch({ type: ActionTypes.SET_RELATED_ITEMS, payload: generateRelatedItems(generatedRelated) });
      }
    };

    fetchRelatedContent();
  }, [dispatch, fullQuery]);

  const reg = /(https?:\/\/[^\s]+)/g;

  const formatDesc = (desc: string) =>
    desc.split('. ').map((txt) => {
      return txt.match(reg) ? (
        <span key={txt} className='text-text-white text-base xl:text-lg leading-8 flex flex-wrap items-center gap-1'>
          <p>Read more at:</p>
          <Link className='text-deep-green hover:text-interactive-green transition-colors truncate' href={txt}>
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
    <div className='py-24 flex flex-col  gap-20 w-full  overflow-x-hidden'>
      <div className=' flex w-full justify-between items-center flex-wrap gap-8'>
        <Breadcrumbs />
      </div>

      <div className=' w-full lg:min-h-iframes-images-lg md:min-h-iframes-images-md min-h-iframes-images-sm aspect-video relative md:shadow-custom-article-shadow rounded'>
        {mainImage.isVideo ? (
          <ReactPlayer
            url={mainImage.url}
            width='100%'
            className='rounded'
            light
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
            className={` transition-all duration-500 bg-deep-green/30 animate-pulse rounded object-cover placeholder:text-bg-black`}
            onLoadingComplete={(image) => {
              image.classList.remove('bg-deep-green/30');
              image.classList.remove('animate-pulse');
            }}
            placeholder={'blur'}
            blurDataURL={mainImage.mediaThumb}
            loading='eager'
          />
        )}
      </div>

      <div className='grid grid-cols-1 gap-9 place-items-start max-w-[58rem] mx-auto'>
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
            <LikeAndShare
              articleData={{
                title: title,
                description: description ?? description_508,
                ogImage: mainImage.url ?? '',
                url: currentPath,
              }}
            />
          </div>

          <div className='w-full py-4 px-6 grid content-center bg-text-white/5 rounded'>
            <div className='w-full flex max-md:flex-wrap  gap-4 md:gap-[4.5rem] items-start '>
              <div className='md:w-[13.5rem] md:h-[13.5rem] w-32 h-32 relative shrink-0'>
                <Image
                  src={placeholder}
                  className='rounded-full lg:shadow-custom-img-shadow placeholder:text-bg-black  '
                  fill
                  alt='placeholder for author'
                />
              </div>
              <div className='grid columns-1 place-items-start gap-4 md:gap-9 md:px-6 '>
                <h3 className='text-interactive-green lg:text-2xl md:text-xl text-lg leading-10 font-normal'>
                  {photographer ?? secondary_creator}
                </h3>
                <p className='text-text-white lg:text-xl md:text-lg text-base leading-10 font-light'>
                  The author&apos;s details are currently unavailable. We&apos;re working diligently to provide you with
                  comprehensive author information, including their name, biography, and more. Please check back soon
                  for an enriched reading experience. In the meantime, enjoy the article!
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className='lg:mt-40 md:mt-24 mt-12 lg:text-subHeading md:text-2xl text-xl lg:leading-10 md:leading-8 leading-6 text-accent-pink font-light'>
          More like this
        </h2>
        <RelatedArticles />
      </div>
    </div>
  );
};

export default memo(ArticlePageContainer);
