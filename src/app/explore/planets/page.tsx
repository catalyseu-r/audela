import Navbar from '../../components/Navbar';
import { planetarySearch } from '@/app/utils/API/planetarySearch';
import PlanetsContentContainer from './PlanetsContentContainer';
import { sortByDate } from '@/app/utils/lists/sort';

export default async function planets() {
  const planetsData = await planetarySearch({ page: 1, query: '' });

  const preSortData = () => {
    if (planetsData) {
      const cutResults = planetsData.collection.items.slice(0, 90);

      return sortByDate(cutResults);
    } else return [];
  };

  const pageCount = () => (planetsData ? planetsData.collection.metadata.total_hits : 0);

  return (
    <main className='bg-main-black h-screen bg-no-repeat bg-center relative overflow-auto pb-24'>
      <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto '>
        <Navbar />
        {planetsData && <PlanetsContentContainer data={preSortData()} pageCount={pageCount()} />}
        {/* make fallback here or in component */}
      </div>
    </main>
  );
}
