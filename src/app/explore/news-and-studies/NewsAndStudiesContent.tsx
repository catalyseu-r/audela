'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { PlanetaryDataArticle } from '@/app/types/planetaryData';
import React from 'react';
import ArticleContainer from './ArticleContainer';
import NotFound from '@/app/components/NotFound';

import SortArticlesMenu from '@/app/components/SortArticlesMenu';
import PaginationArticles from '@/app/components/PaginationArticles';
import Loading from './loading';

import { useAppContext } from '@/app/contexts/store';
import { ActionTypes } from '@/app/types/actionTypes';
import { SortState } from '@/app/types/sortState';
import { generateRelatedItems } from '@/app/utils/lists/generateRelated';

export interface NewsAndStudiesContent {
  data: PlanetaryDataArticle[];
  total_hits: number;
}

const articlesPerPage = 6;

const NewsAndStudiesContent = (props: NewsAndStudiesContent) => {
  const memoisedPrefetchedData = React.useMemo(() => {
    return props.data;
  }, [props.data]);

  const {
    state: { articleState, isNotFound, isSearchLoading, pagination, sortState },
    dispatch,
  } = useAppContext();

  const startIndex = React.useMemo(() => (pagination.currentPage - 1) * articlesPerPage, [pagination.currentPage]);
  const endIndex = React.useMemo(() => startIndex + articlesPerPage, [startIndex]);

  React.useEffect(() => {
    if (articleState.length === 0) {
      dispatch({
        type: ActionTypes.SET_ARTICLE_STATE,
        payload: { data: memoisedPrefetchedData, direction: SortState.desc },
      });
      dispatch({ type: ActionTypes.SET_TOTAL_ITEMS, payload: props.total_hits });

      dispatch({ type: ActionTypes.SET_RELATED_ITEMS, payload: generateRelatedItems(memoisedPrefetchedData) });
    }
  }, [memoisedPrefetchedData, dispatch, articleState.length, props.total_hits, sortState]);

  return (
    <div className='pt-24 flex flex-col gap-8 w-full h-full'>
      <div className=' flex w-full justify-between items-center flex-wrap gap-8'>
        <Breadcrumbs />
        <div className='flex lg:justify-end md:justify-start justify-center lg:gap-10 items-center  flex-wrap-reverse lg:w-auto w-full gap-5'>
          <SortArticlesMenu />
        </div>
      </div>
      {isNotFound ? (
        <NotFound />
      ) : isSearchLoading ? (
        <Loading />
      ) : (
        <>
          <ArticleContainer data={articleState.slice(startIndex, endIndex)} />
          <PaginationArticles />
        </>
      )}
    </div>
  );
};

export default NewsAndStudiesContent;
