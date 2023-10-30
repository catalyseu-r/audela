export const metadata = {
  title: 'Mars Weather',
};

import { Suspense } from 'react';
import Navbar from '@/app/components/Navbar';
import Loading from '../loading';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import ElipseEffect from '@/app/components/ElipseEffect';
import { getMarsWeather } from '@/app/utils/API/getMarsWeather';
import MarsWeatherContent from './MarsWeatherContent';

export default async function marsWeather() {
  const data = await getMarsWeather('');

  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-main-black  min-h-custom-page-min overflow-hidden   relative'>
        <ElipseEffect />
        <Navbar />
        <div className='lg:max-w-container-lg md:w-5/6 w-full  lg:mt-24 mt-20  md:px-0 px-4  mx-auto '>
          <Breadcrumbs />
          {data && <MarsWeatherContent {...data} />}
        </div>
      </main>
    </Suspense>
  );
}
