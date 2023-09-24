'use client';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import UserInput from '@/app/components/UserInput';
import { PlanetaryDataArticle } from '@/app/types/planetaryData';
import React from 'react';

interface ArticlePageContainerData {
  data: PlanetaryDataArticle | undefined;
}

const ArticlePageContainer = ({ data }: ArticlePageContainerData) => {
  return (
    <div className='pt-24 flex flex-col gap-8 w-full'>
      {/* <div className='flex lg:justify-end md:justify-start justify-center lg:gap-10 items-center  flex-wrap-reverse lg:w-auto w-full gap-5'> */}

      <div className=' flex w-full justify-between items-center flex-wrap gap-8'>
        <Breadcrumbs />
        <UserInput />
      </div>
      {/* </div> */}
    </div>
  );
};

export default ArticlePageContainer;
