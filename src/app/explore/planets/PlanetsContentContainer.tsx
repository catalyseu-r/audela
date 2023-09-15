'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { PlanetaryDataArticle } from '@/app/types/planetaryData';
import Image from 'next/image';
import React from 'react';
import ArticleContainer from './ArticleContainer';
import { SlMagnifier as SearchIcon } from 'react-icons/sl';
import { planetarySearch } from '@/app/utils/API/planetarySearch';

export interface PlanetsContentContainerData {
  data: PlanetaryDataArticle[];
}

const PlanetsContentContainer = (props: PlanetsContentContainerData) => {
  //   console.log('PROPS CLIENT', props.data);

  const [articleState, setArticleState] = React.useState(props.data.slice(0, 6));
  const [userQuery, setUserQuery] = React.useState<string>('');

  const handleUserQuery = async (query: string) => {
    const callApi = await planetarySearch(query);

    if (callApi) {
      setArticleState(callApi.collection.items);
    }

    console.log('RES', callApi);
  };

  const formatDataForDisplay = () => {};

  return (
    <div className='mt-8 flex flex-col gap-8 w-full'>
      <div className=' flex w-full justify-between items-start flex-wrap gap-8 overflow-auto'>
        <Breadcrumbs />
        <div className='border-b border-dimmed-red flex justify-end items-center px-6'>
          <input
            type='text'
            name=''
            id=''
            className='bg-transparent text-main-white text-base cursor-default focus:outline-none'
            placeholder='Your search term'
            onChange={(event) => setUserQuery(event.target.value)}
          />
          <SearchIcon onClick={() => handleUserQuery(userQuery)} className='text-main-white text-2xl' />
        </div>
        {/* <CalendarLabel /> */}
      </div>
      <ArticleContainer data={articleState} />

      {/* <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={controls} transition={{ duration: 0.5 }}>
        <div className='flex w-full justify-between flex-wrap-reverse gap-6 items-end'>
          <DescriptionContainer
            date={dayjs(contentState.date).format('MM/DD/YYYY')}
            title={contentState.title}
            desc={contentState.desc}
          />
          <ImageContainer image={contentState.image} />
        </div>
      </motion.div> */}
    </div>
  );
};

export default PlanetsContentContainer;
