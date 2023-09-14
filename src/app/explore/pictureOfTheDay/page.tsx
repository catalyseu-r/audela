import Navbar from '../../components/Navbar';
import { getImageOfTheDay } from '../../utils/API/getImageOfTheDay';
import ContentContainer from './ContentContainer';

export default async function pictureOfTheDay() {
  const imageData = await getImageOfTheDay();
  return (
    <main className='bg-main-black h-screen bg-no-repeat px-smscreen md:px-mdscreen xl:px-xlscreen  bg-center relative overflow-auto pb-24'>
      <Navbar />
      {/* make fallback here or in component */}
      {imageData && <ContentContainer data={imageData} />}
    </main>
  );
}
