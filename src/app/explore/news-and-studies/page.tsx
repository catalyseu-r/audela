import Navbar from '../../components/Navbar';
import { planetarySearch } from '@/app/utils/API/planetarySearch';

import { Suspense } from 'react';
import Loading from './loading';
import dynamic from 'next/dynamic';

export default async function newsAndStudies() {
  const planetsData = await planetarySearch({ query: '' });
  const maxPages = 15;
  const articlesPerPage = 6;

  const cutResults = () => {
    if (planetsData) {
      const fullResults = planetsData.collection.items;

      const cutResults = fullResults.slice(0, maxPages * articlesPerPage);

      return cutResults;
    } else return [];
  };

  const total_hits = () => (planetsData ? planetsData.collection.metadata.total_hits : 0);

  const DynamicContainer = dynamic(() => import('./NewsAndStudiesContent'), { ssr: false });

  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-bg-black  lg:min-h-custom-page-min bg-no-repeat bg-center relative overflow-auto pb-24 '>
        <Navbar />
        <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto '>
          {planetsData && <DynamicContainer data={cutResults()} total_hits={total_hits()} />}
        </div>
      </main>
    </Suspense>
  );
}
