'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { PlanetaryDataArticle } from '@/app/types/planetaryData';
import React from 'react';
import ArticleContainer from './ArticleContainer';
import { SlMagnifier as SearchIcon } from 'react-icons/sl';
import { planetarySearch } from '@/app/utils/API/planetarySearch';
import { sortByDate } from '@/app/utils/lists/sort';

export interface PlanetsContentContainerData {
  data: PlanetaryDataArticle[];
}

enum SortState {
  asc = 'asc',
  desc = 'desc',
}

const PlanetsContentContainer = (props: PlanetsContentContainerData) => {
  const [articleState, setArticleState] = React.useState(props.data.slice(0, 6));
  const [userQuery, setUserQuery] = React.useState<string>('');
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [isNotFound, setIsNotFound] = React.useState<boolean>(false);
  const [sortState, setSortState] = React.useState<SortState>(SortState.desc);

  const handleUserQuery = async (query: string) => {
    const callApi = await planetarySearch(query);

    if (callApi && callApi.collection.items.length > 0) {
      const cutResults = callApi.collection.items.slice(0, 6);

      const prepareSort = sortByDate(cutResults, sortState);
      setArticleState(prepareSort);
      setIsNotFound(false);
    } else {
      setIsNotFound(true);
    }
  };

  const handleDataSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const updated = [...articleState];

    setArticleState(sortByDate(updated, event.target.value as SortState));
  };

  return (
    <div className='mt-8 flex flex-col gap-8 w-full'>
      <div className=' flex w-full justify-between items-center flex-wrap gap-8'>
        <Breadcrumbs />
        <div className='flex lg:justify-end justify-between lg:gap-10 items-center  flex-wrap lg:w-auto w-full gap-5'>
          <select
            name=''
            id=''
            placeholder='Newest first (default)'
            className='py-2 px-6 bg-second-black border outline-none focus:border-main-orange-accent transition-all border-dimmed-accent text-base text-main-white  !font-sans cursor-pointer'
            onChange={(e) => {
              setSortState(e.target.value as SortState);
              handleDataSort(e);
            }}
          >
            <option value={SortState.desc}>Newest first (default)</option>
            <option value={SortState.asc}>Oldest first</option>
          </select>
          <div className='border-b border-dimmed-accent flex justify-end items-center py-2 px-6  focus-within:border-main-orange-accent transition-all'>
            <input
              type='text'
              name=''
              id=''
              className='bg-transparent text-main-white text-base cursor-default focus:outline-none'
              placeholder='Your search term'
              onChange={(event) => setUserQuery(event.target.value)}
              onKeyDown={(keyDown) => keyDown.key === 'Enter' && handleUserQuery(userQuery)}
            />

            <SearchIcon onClick={() => handleUserQuery(userQuery)} className='text-main-white text-2xl' />
          </div>
        </div>
      </div>
      {isNotFound ? (
        <h2 className='text-main-white text-2xl'>NOT FOUND SCREEN HERE</h2>
      ) : (
        <ArticleContainer data={...articleState} />
      )}
    </div>
  );
};

export default PlanetsContentContainer;
