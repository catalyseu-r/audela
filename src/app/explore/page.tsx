export const metadata = {
  title: 'Explore',
};

import { Suspense } from 'react';
import Navbar from '../components/Navbar';
import Loading from '../loading';
import Options from './Options';
import Breadcrumbs from '../components/Breadcrumbs';
import Image from 'next/image';
import elipseOne from '../img/Ellipse 20.png';
import { imageClassNames } from '../staticData/imageClassNames';

export default function Explore() {
  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-main-black  min-h-custom-page-min overflow-hidden   relative'>
        {imageClassNames.map((className, index) => (
          <Image key={index} src={elipseOne} alt={`elipse-${index}`} width={240} height={240} className={className} />
        ))}
        <Navbar />
        <div className='lg:max-w-container-lg md:w-5/6 w-full lg:mt-24 mt-16 md:px-0 px-4 mx-auto '>
          <Breadcrumbs />
          <Options />
        </div>
      </main>
    </Suspense>
  );
}
