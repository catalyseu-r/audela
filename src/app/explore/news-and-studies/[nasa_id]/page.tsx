export const metadata = {
  title: 'Article',
};

import Navbar from '@/app/components/Navbar';
import { planetarySearch } from '@/app/utils/API/planetarySearch';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loading from '../loading';
import Image from 'next/image';
import elipseOne from '../../../img/Ellipse 20.png';
import { imageClassNames } from '@/app/staticData/imageClassNames';

export default async function ArticleDetail({ params }: { params: { nasa_id: string } }) {
  const singleArticleData = await planetarySearch({ nasa_id: params.nasa_id });

  const prepareDataForClient = singleArticleData?.collection.items[0].data[0];

  const getLargeMedia = await fetch(singleArticleData?.collection.items[0].href as string);

  const prepareMediaForClient: string[] = await getLargeMedia.json();

  const getImageUrl = prepareMediaForClient.find((item) => item.endsWith('orig.jpg'));
  const getVideoUrl = prepareMediaForClient.find((item) => item.endsWith('orig.mp4'));
  const getMediaThumb = prepareMediaForClient.find((item) => item.endsWith('thumb.jpg'));

  console.log('PROP', prepareDataForClient);

  const DynamicContainer = dynamic(() => import('./ArticlePageContainer'), { ssr: false });

  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-transparent  relative overflow-hidden  '>
        {imageClassNames.map((className, index) => (
          <Image key={index} src={elipseOne} alt={`elipse-${index}`} width={240} height={240} className={className} />
        ))}

        <Navbar />

        <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 z-20 mx-auto '>
          {singleArticleData && (
            <DynamicContainer
              mainImage={{
                isVideo: getImageUrl === undefined,
                url: getImageUrl ?? getVideoUrl,
                mediaThumb: getMediaThumb ?? '',
              }}
              articleData={prepareDataForClient ? prepareDataForClient : undefined}
            />
          )}
        </div>
      </main>
    </Suspense>
  );
}
