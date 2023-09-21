import Navbar from '../../components/Navbar';
import { planetarySearch } from '@/app/utils/API/planetarySearch';

import { sortByDate } from '@/app/utils/lists/sort';
import { Suspense } from 'react';
import Loading from './loading';
import dynamic from 'next/dynamic';

export default async function planets() {
  const planetsData = await planetarySearch({ query: '' });
  const maxPages = 15;
  const articlesPerPage = 6;

  const preSortData = () => {
    if (planetsData) {
      const fullResults = planetsData.collection.items;
      const sortedData = sortByDate(fullResults);
      const cutResults = sortedData.slice(0, maxPages * articlesPerPage);

      return cutResults;
    } else return [];
  };

  const total_hits = () => (planetsData ? planetsData.collection.metadata.total_hits : 0);

  const DynamicContainer = dynamic(() => import('./PlanetsContentContainer'), { ssr: false });

  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-main-black h-screen bg-no-repeat bg-center relative overflow-auto pb-24 '>
        <Navbar />
        <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto '>
          {planetsData && <DynamicContainer data={preSortData()} total_hits={total_hits()} />}
        </div>
      </main>
    </Suspense>
  );
}
