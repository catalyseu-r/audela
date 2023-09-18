'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { PlanetaryDataArticle } from '@/app/types/planetaryData';
import React from 'react';
import ArticleContainer from './ArticleContainer';
import { SlMagnifier as SearchIcon } from 'react-icons/sl';
import { planetarySearch } from '@/app/utils/API/planetarySearch';
import { sortByDate } from '@/app/utils/lists/sort';
import { BsArrowLeft as ArrowLeft, BsArrowRight as ArrorwRight } from 'react-icons/bs';

export interface PlanetsContentContainerData {
  data: PlanetaryDataArticle[];
  total_hits: number;
}

enum SortState {
  asc = 'asc',
  desc = 'desc',
}

const PlanetsContentContainer = (props: PlanetsContentContainerData) => {
  const maxPages = 15;
  const articlesPerPage = 6;

  const [articleState, setArticleState] = React.useState(props.data);
  const [userQuery, setUserQuery] = React.useState<string>('');

  const [isNotFound, setIsNotFound] = React.useState<boolean>(false);
  const [sortState, setSortState] = React.useState<SortState>(SortState.desc);
  const [pagination, setPagination] = React.useState({
    totalItems: props.total_hits,
    currentPage: 1,
  });

  const startIndex = (pagination.currentPage - 1) * articlesPerPage;
  const endIdex = startIndex + articlesPerPage;

  const handleUserQuery = async (query: string) => {
    const callApi = await planetarySearch({ query: query });

    if (callApi && callApi.collection.items.length > 0) {
      const totalHitCountFromApi = callApi.collection.metadata.total_hits;

      setPagination((_prev) => {
        if (totalHitCountFromApi >= maxPages * articlesPerPage) {
          return { ..._prev, totalItems: maxPages * articlesPerPage };
        } else return { ..._prev, totalItems: totalHitCountFromApi };
      });

      const fullResults = callApi.collection.items;

      const prepareSort = sortByDate(fullResults, sortState);

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

  const PrepareButtons = () => {
    const arr = Array.from(
      Array(
        pagination.totalItems >= maxPages * articlesPerPage
          ? maxPages
          : Math.ceil(pagination.totalItems / articlesPerPage)
      ).keys()
    );

    return (
      <div className='flex items-center gap-4'>
        <div
          className={`w-6 h-6 flex items-center justify-center border p-1 rounded ${
            pagination.currentPage === 1 ? `border-dimmed-accent` : `border-main-orange-accent`
          }`}
        >
          <ArrowLeft className='text-lg text-main-white' />
        </div>
        {arr.map((item, index) => {
          const appendIndex = index + 1;
          return (
            <button
              key={appendIndex}
              className={`text-lg ${
                appendIndex === pagination.currentPage ? `text-main-orange-accent` : `text-main-white`
              }`}
              onClick={(event) =>
                setPagination({ totalItems: pagination.totalItems, currentPage: Number(event.currentTarget.value) })
              }
              value={appendIndex}
            >
              {appendIndex}
            </button>
          );
        })}
        <div
          className={`w-6 h-6 flex items-center justify-center border p-1 rounded ${
            pagination.currentPage === 1 ? `border-dimmed-accent` : `border-main-orange-accent`
          }`}
        >
          <ArrorwRight className='text-lg text-main-white' />
        </div>
      </div>
    );
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
        <ArticleContainer data={...articleState.slice(startIndex, endIdex)} />
      )}
      <PrepareButtons />
    </div>
  );
};

export default PlanetsContentContainer;
