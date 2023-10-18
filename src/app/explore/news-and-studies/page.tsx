export const metadata = {
  title: 'News and studies',
};

import Navbar from '../../components/Navbar';
import { planetarySearch } from '@/app/utils/API/planetarySearch';

import { Suspense } from 'react';
import Loading from './loading';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import elipseOne from '../../img/Ellipse 20.png';

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
      <main className='bg-transparent lg:min-h-custom-page-min bg-no-repeat bg-center relative overflow-hidden pb-24 '>
        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-elipse absolute bottom-0 left-0 -z-10'
          width={240}
          height={240}
        />
        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-elipse-short absolute bottom-0 right-0 delay-300 -z-10'
          width={240}
          height={240}
        />
        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-reverse absolute bottom-1/3 right-1/3 delay-500 -z-10'
          width={240}
          height={240}
        />

        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-reverse absolute top-1/3 left-1/3 delay-500 -z-10'
          width={240}
          height={240}
        />

        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-reverse absolute top-0 right-1/3 delay-500 -z-10'
          width={240}
          height={240}
        />

        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-reverse absolute top-0 left-1/4 delay-700 -z-10'
          width={140}
          height={140}
        />
        <Navbar />
        <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto  '>
          {planetsData && <DynamicContainer data={cutResults()} total_hits={total_hits()} />}
        </div>
      </main>
    </Suspense>
  );
}
