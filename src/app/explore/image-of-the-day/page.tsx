export const metadata = {
  title: 'Image of the day',
};

import Navbar from '../../components/Navbar';
import { getImageOfTheDay } from '../../utils/API/getImageOfTheDay';
import ContentContainer from './ContentContainer';
import { Suspense } from 'react';
import Loading from './loading';
import Image from 'next/image';
import elipseOne from '../../img/Ellipse 20.png';
import { imageClassNames } from '@/app/staticData/imageClassNames';

export default async function pictureOfTheDay() {
  const imageData = await getImageOfTheDay();
  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-bg-black min-h-custom-page-min relative  pb-24 '>
        <Navbar />
        {imageClassNames.map((className, index) => (
          <Image key={index} src={elipseOne} alt={`elipse-${index}`} width={240} height={240} className={className} />
        ))}
        <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto'>
          {imageData && <ContentContainer data={imageData} />}
        </div>
      </main>
    </Suspense>
  );
}
