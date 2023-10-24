export const metadata = {
  title: 'Explore',
};

import { Suspense } from 'react';
import Navbar from '../components/Navbar';
import Loading from '../loading';
import Options from './Options';
import Breadcrumbs from '../components/Breadcrumbs';
import ElipseEffect from '../components/ElipseEffect';

export default function Explore() {
  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-main-black  min-h-custom-page-min overflow-hidden   relative'>
        <ElipseEffect />
        <Navbar />
        <div className='lg:max-w-container-lg md:w-5/6 w-full  lg:mt-24 mt-20  md:px-0 px-4  mx-auto '>
          <Breadcrumbs />
          <Options />
        </div>
      </main>
    </Suspense>
  );
}
