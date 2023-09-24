'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { PlanetaryDataArticle } from '@/app/types/planetaryData';
import React from 'react';
import ArticleContainer from './ArticleContainer';
import NotFound from '@/app/components/NotFound';
import UserInput from '@/app/components/UserInput';
import { useGlobalContext } from '@/app/contexts/store';
import SortArticlesMenu from '@/app/components/SortArticlesMenu';
import PaginationArticles from '@/app/components/PaginationArticles';

export interface PlanetsContentContainerData {
  data: PlanetaryDataArticle[];
  total_hits: number;
}

const PlanetsContentContainer = (props: PlanetsContentContainerData) => {
  const memoisedPrefetchedData = React.useMemo(() => {
    return props.data;
  }, [props.data]);

  const { setArticleState, articleState, isNotFound, setPagination, startIndex, endIndex } = useGlobalContext();

  React.useEffect(() => {
    if (articleState.length === 0) {
      setArticleState(memoisedPrefetchedData);
      setPagination({ currentPage: 1, totalItems: memoisedPrefetchedData.length });
    }
  }, [setArticleState, props, memoisedPrefetchedData, articleState, setPagination]);

  return (
    <div className='pt-24 flex flex-col gap-8 w-full'>
      <div className=' flex w-full justify-between items-center flex-wrap gap-8'>
        <Breadcrumbs />
        <div className='flex lg:justify-end md:justify-start justify-center lg:gap-10 items-center  flex-wrap-reverse lg:w-auto w-full gap-5'>
          <SortArticlesMenu />
          <UserInput />
        </div>
      </div>
      {isNotFound ? (
        <NotFound />
      ) : (
        <>
          <ArticleContainer data={...articleState.slice(startIndex, endIndex)} />
          <PaginationArticles />
        </>
      )}
    </div>
  );
};

export default PlanetsContentContainer;
