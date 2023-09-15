import Navbar from '../../components/Navbar';
import { planetarySearch } from '@/app/utils/API/planetarySearch';
import PlanetsContentContainer from './PlanetsContentContainer';

export default async function planets() {
  const planetsData = await planetarySearch();

  return (
    <main className='bg-main-black h-screen bg-no-repeat px-smscreen md:px-mdscreen xl:px-xlscreen  bg-center relative overflow-auto pb-24'>
      <Navbar />
      {planetsData && <PlanetsContentContainer data={planetsData?.collection.items} />}
      {/* make fallback here or in component */}
    </main>
  );
}
