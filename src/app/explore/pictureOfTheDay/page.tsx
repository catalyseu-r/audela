import Navbar from '../../components/Navbar';
import { getImageOfTheDay } from '../../utils/API/getImageOfTheDay';
import ContentContainer from './ContentContainer';

export default async function pictureOfTheDay() {
  const imageData = await getImageOfTheDay();
  return (
    <main className='bg-main-black h-screen bg-no-repeat bg-center relative overflow-auto pb-24'>
      <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto'></div>
      <Navbar />
      {/* make fallback here or in component */}
      {imageData && <ContentContainer data={imageData} />}
    </main>
  );
}
