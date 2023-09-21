'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { PlanetaryDataArticle } from '@/app/types/planetaryData';
import React from 'react';
import ArticleContainer from './ArticleContainer';
import { SlMagnifier as SearchIcon } from 'react-icons/sl';
import { planetarySearch } from '@/app/utils/API/planetarySearch';
import { sortByDate } from '@/app/utils/lists/sort';
import { BsArrowLeft as ArrowLeft, BsArrowRight as ArrorwRight } from 'react-icons/bs';
import NotFound from '@/app/components/NotFound';

export interface PlanetsContentContainerData {
  data: PlanetaryDataArticle[];
  total_hits: number;
}

enum SortState {
  asc = 'asc',
  desc = 'desc',
}
const maxPages = 15;
const articlesPerPage = 6;

const PlanetsContentContainer = (props: PlanetsContentContainerData) => {
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

  const [windowWidth, setWindowWidth] = React.useState<number | undefined>(
    window !== undefined ? window.innerWidth : undefined
  );

  const handleResize = () => setWindowWidth(window.innerWidth);

  React.useEffect(() => {
    window && window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUserQuery = async (query: string) => {
    const callApi = await planetarySearch({ query: query });

    if (callApi && callApi.collection.items.length > 0) {
      const totalHitCountFromApi = callApi.collection.metadata.total_hits;

      setPagination((_prev) => {
        if (totalHitCountFromApi >= maxPages * articlesPerPage) {
          return { ..._prev, totalItems: maxPages * articlesPerPage };
        } else
          return { currentPage: Math.ceil(totalHitCountFromApi / articlesPerPage), totalItems: totalHitCountFromApi };
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

  const Pagination = () => {
    const buttonArray = Array.from(
      Array(
        pagination.totalItems >= maxPages * articlesPerPage
          ? maxPages
          : Math.ceil(pagination.totalItems / articlesPerPage)
      ).keys()
    );

    const isForwrard = (current: number, button: 'forward' | 'back') => {
      if (button === 'forward' && current < buttonArray.length) {
        setPagination({ totalItems: pagination.totalItems, currentPage: pagination.currentPage + 1 });
      } else if (button === 'back' && current !== 1) {
        setPagination({ totalItems: pagination.totalItems, currentPage: pagination.currentPage - 1 });
      }
    };

    return (
      <div className='flex items-center justify-center gap-4 w-full mt-16'>
        <button
          onClick={() => isForwrard(pagination.currentPage, 'back')}
          className={`lg:w-6 lg:h-6 w-9 h-9 flex items-center justify-center border p-1 rounded ${
            pagination.currentPage === 1 ? `cursor-not-allowed` : `cursor-pointer`
          } ${pagination.currentPage === 1 ? `border-dimmed-accent` : `border-main-orange-accent`}`}
          disabled={pagination.currentPage === 1}
        >
          <ArrowLeft className='text-lg text-main-white' />
        </button>
        {windowWidth && windowWidth > 768 ? (
          buttonArray.map((item, index) => {
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
          })
        ) : (
          <select
            value={pagination.currentPage}
            onChange={(event) =>
              setPagination({ totalItems: pagination.totalItems, currentPage: Number(event.currentTarget.value) })
            }
            className=' px-4 h-9 rounded bg-second-black border outline-none focus:border-main-orange-accent transition-all border-dimmed-accent text-base text-main-white  !font-sans cursor-pointer'
          >
            {buttonArray.map((item, index) => {
              const appendIndex = index + 1;
              return (
                <option
                  className={`${pagination.currentPage === appendIndex && `text-main-orange-accen`}`}
                  key={appendIndex}
                  value={appendIndex}
                >
                  {appendIndex}
                </option>
              );
            })}
          </select>
        )}
        <button
          onClick={() => isForwrard(pagination.currentPage, 'forward')}
          className={`lg:w-6 lg:h-6 w-9 h-9 flex items-center justify-center border p-1 rounded ${
            pagination.currentPage === buttonArray.length ? `cursor-not-allowed` : `cursor-pointer`
          } ${pagination.currentPage === buttonArray.length ? `border-dimmed-accent` : `border-main-orange-accent`}`}
          disabled={pagination.currentPage === buttonArray.length}
        >
          <ArrorwRight className='text-lg text-main-white' />
        </button>
      </div>
    );
  };

  return (
    <div className='pt-24 flex flex-col gap-8 w-full'>
      <div className=' flex w-full justify-between items-center flex-wrap gap-8'>
        <Breadcrumbs />
        <div className='flex lg:justify-end md:justify-start justify-center lg:gap-10 items-center  flex-wrap-reverse lg:w-auto w-full gap-5'>
          <select
            name=''
            id=''
            placeholder='Newest first (default)'
            className={`py-2 px-6 bg-second-black border outline-none focus:border-main-orange-accent transition-all ${
              isNotFound ? 'border-disabled-accent' : 'border-dimmed-accent'
            } text-base text-main-white  !font-sans ${isNotFound ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={isNotFound}
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
        <NotFound />
      ) : (
        <>
          <ArticleContainer data={...articleState.slice(startIndex, endIdex)} />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default PlanetsContentContainer;
