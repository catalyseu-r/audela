import Navbar from '../../components/Navbar';
import { getImageOfTheDay } from '../../utils/API/getImageOfTheDay';
import ContentContainer from './ContentContainer';
import { Suspense } from 'react';
import Loading from './loading';

export default async function pictureOfTheDay() {
  const imageData = await getImageOfTheDay();
  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-main-black h-screen bg-no-repeat bg-center relative overflow-auto pb-24'>
        <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto'>
          <Navbar />

          {imageData && <ContentContainer data={imageData} />}
        </div>
      </main>
    </Suspense>
  );
}
