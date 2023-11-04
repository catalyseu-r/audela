export const metadata = {
  title: 'Mars rover gallery',
};

import { Suspense } from 'react';
import Navbar from '@/app/components/Navbar';
import Loading from '../loading';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import ElipseEffect from '@/app/components/ElipseEffect';
import { getMarsRoversInfo } from '@/app/utils/API/getMarsRoverImages';
import RoverGalleryContent from './RoverGalleryContent';

export default async function MarsRoverGallery() {
  const getMarsRoversData = await getMarsRoversInfo();

  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-main-black  min-h-custom-page-min overflow-hidden   relative'>
        <ElipseEffect />
        <Navbar />
        <div className='lg:max-w-container-lg md:w-5/6 w-full  lg:mt-24 mt-20  md:px-0 px-4  mx-auto '>
          <Breadcrumbs />
          {getMarsRoversData && <RoverGalleryContent {...getMarsRoversData} />}
        </div>
      </main>
    </Suspense>
  );
}
