export const metadata = {
  title: 'Image of the day',
};

import Navbar from '../../components/Navbar';
import { getImageOfTheDay } from '../../utils/API/getImageOfTheDay';
import ContentContainer from './ContentContainer';
import { Suspense } from 'react';
import Loading from './loading';
import ElipseEffect from '@/app/components/ElipseEffect';

export default async function pictureOfTheDay() {
  const imageData = await getImageOfTheDay();
  return (
    <Suspense fallback={<Loading />}>
      <main className='min-h-custom-page-min overflow-hidden relative  pb-24 '>
        <Navbar />
        <ElipseEffect />
        <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto'>
          {imageData && <ContentContainer data={imageData} />}
        </div>
      </main>
    </Suspense>
  );
}
