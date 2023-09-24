'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import { PlanetaryDataArticle } from '@/app/types/planetaryData';
import React from 'react';

interface ArticlePageContainerData {
  data: PlanetaryDataArticle;
}

const ArticlePageContainer = ({ data }: ArticlePageContainerData) => {
  return (
    <div className='pt-24 flex flex-col gap-8 w-full'>
      <Breadcrumbs />
    </div>
  );
};

export default ArticlePageContainer;
