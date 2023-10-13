import Navbar from '../../components/Navbar';
import { getImageOfTheDay } from '../../utils/API/getImageOfTheDay';
import ContentContainer from './ContentContainer';
import { Suspense } from 'react';
import Loading from './loading';
import Image from 'next/image';
import elipseOne from '../../img/Ellipse 20.png';

export default async function pictureOfTheDay() {
  const imageData = await getImageOfTheDay();
  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-bg-black min-h-custom-page-min relative  pb-24 '>
        <Navbar />
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
        <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto'>
          {imageData && <ContentContainer data={imageData} />}
        </div>
      </main>
    </Suspense>
  );
}
