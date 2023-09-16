import Navbar from '../../components/Navbar';
import { planetarySearch } from '@/app/utils/API/planetarySearch';
import PlanetsContentContainer from './PlanetsContentContainer';
import { sortByDate } from '@/app/utils/lists/sort';

export default async function planets() {
  const planetsData = await planetarySearch();

  const preSortData = () => (planetsData ? sortByDate(planetsData.collection.items) : []);

  return (
    <main className='bg-main-black h-screen bg-no-repeat px-smscreen md:px-mdscreen xl:px-xlscreen  bg-center relative overflow-auto pb-24'>
      <Navbar />
      {planetsData && <PlanetsContentContainer data={preSortData()} />}
      {/* make fallback here or in component */}
    </main>
  );
}
