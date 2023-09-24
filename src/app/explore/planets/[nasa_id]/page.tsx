import Navbar from '@/app/components/Navbar';
import { planetarySearch } from '@/app/utils/API/planetarySearch';
import ArticlePageContainer from './ArticlePageContainer';

export default async function ArticleDetail({ params }: { params: { nasa_id: string } }) {
  const callApi = await planetarySearch({ nasa_id: params.nasa_id });

  const prepareDataForClient = callApi && callApi.collection.items[0].data;

  return (
    <main className='bg-main-black h-auto min-h-custom-page-min bg-no-repeat bg-center relative overflow-auto pb-24 '>
      <Navbar />

      <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto '>
        {/* @ts-ignore */}
        {callApi && <ArticlePageContainer data={prepareDataForClient} />}
      </div>
    </main>
  );
}
