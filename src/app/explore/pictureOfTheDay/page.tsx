import { ImageOfTheDay } from '@/app/types/imageOfTheDay';
import Navbar from '../../components/Navbar';
import { getImageOfTheDay } from '../../utils/API/getImageOfTheDay';
import ImageOfTheDayContainer from './ImageOfTheDayContainer';

export default async function pictureOfTheDay() {
  const imageData = (await getImageOfTheDay()) as ImageOfTheDay;
  console.log('IMG DATA', imageData);
  return (
    <main className='bg-main-black h-screen bg-no-repeat px-4 md:px-24 lg:px-40  lg:bg-cover lg:bg-[100%_100%] bg-center relative'>
      <Navbar />

      <ImageOfTheDayContainer {...imageData} />
    </main>
  );
}
