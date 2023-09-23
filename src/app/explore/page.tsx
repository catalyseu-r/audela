import { Suspense } from 'react';
import Navbar from '../components/Navbar';
import Loading from '../loading';
import Options from './Options';

export default function Explore() {
  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-main-black w-screen  bg-no-repeat  min-h-custom-page-min  pb-24 relative'>
        <Navbar />
        <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto '>
          <Options />
        </div>
      </main>
    </Suspense>
  );
}
