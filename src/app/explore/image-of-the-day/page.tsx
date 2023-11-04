export const metadata = {
  title: 'Image of the day',
};

import Navbar from '../../components/Navbar';

import { Suspense } from 'react';
import Loading from './loading';
import ElipseEffect from '@/app/components/ElipseEffect';
import dynamic from 'next/dynamic';

export default async function pictureOfTheDay() {
  const DynamicContentContainer = dynamic(() => import('./ContentContainer'));
  return (
    <Suspense fallback={<Loading />}>
      <main className='min-h-custom-page-min overflow-hidden relative  pb-24 '>
        <Navbar />
        <ElipseEffect />
        <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto'>
          <DynamicContentContainer />
        </div>
      </main>
    </Suspense>
  );
}
