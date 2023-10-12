import { Suspense } from 'react';
import Navbar from '../components/Navbar';
import Loading from '../loading';
import Options from './Options';
import Breadcrumbs from '../components/Breadcrumbs';
import Image from 'next/image';
import elipseOne from '../img/Ellipse 20.png';

export default function Explore() {
  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-main-black bg-no-repeat  min-h-custom-page-min   relative overflow-x-hidden'>
        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-elipse absolute top-0 left-0'
          width={240}
          height={240}
        />
        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-elipse-short absolute top-1/2 left-1/2 delay-300'
          width={240}
          height={240}
        />
        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-reverse absolute top-1/3 left-1/3 delay-500'
          width={240}
          height={240}
        />
        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-reverse absolute bottom-1/3 left-3/4 delay-700'
          width={140}
          height={140}
        />
        <Navbar />
        <div className='lg:max-w-container-lg md:w-5/6 w-full mt-32 md:px-0 px-4 mx-auto '>
          <Breadcrumbs />
          <Options />
        </div>
      </main>
    </Suspense>
  );
}
