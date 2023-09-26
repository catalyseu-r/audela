import Navbar from '@/app/components/Navbar';
import { planetarySearch } from '@/app/utils/API/planetarySearch';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loading from '../loading';

export default async function ArticleDetail({ params }: { params: { nasa_id: string } }) {
  const singleArticleData = await planetarySearch({ nasa_id: params.nasa_id });

  const prepareDataForClient = singleArticleData?.collection.items[0];

  const getLargeMedia = await fetch(singleArticleData?.collection.items[0].href as string);

  const prepareMediaForClient: string[] = await getLargeMedia.json();

  const getImageUrl = prepareMediaForClient.find((item) => item.endsWith('orig.jpg'));
  const getVideoUrl = prepareMediaForClient.find((item) => item.endsWith('large.mp4'));

  const DynamicContainer = dynamic(() => import('./ArticlePageContainer'), { ssr: false });

  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-main-black h-auto min-h-custom-page-min bg-no-repeat bg-center relative overflow-auto pb-24 '>
        <Navbar />

        <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto '>
          {singleArticleData && (
            <DynamicContainer
              mainImage={{
                isVideo: getImageUrl === undefined,
                url: getImageUrl ?? getVideoUrl,
              }}
              data={singleArticleData ? prepareDataForClient : undefined}
            />
          )}
        </div>
      </main>
    </Suspense>
  );
}
