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
export default async function ArticleDetail({ params }: { params: { nasa_id: string } }) {
  const singleArticleData = await planetarySearch({ nasa_id: params.nasa_id });

  const prepareDataForClient = singleArticleData?.collection.items[0].data[0];

  const getLargeMedia = await fetch(singleArticleData?.collection.items[0].href as string);

  const prepareMediaForClient: string[] = await getLargeMedia.json();

  const getImageUrl = prepareMediaForClient.find((item) => item.endsWith('orig.jpg'));
  const getVideoUrl = prepareMediaForClient.find((item) => item.endsWith('orig.mp4'));
  const getMediaThumb = prepareMediaForClient.find((item) => item.endsWith('thumb.jpg'));

  const DynamicContainer = dynamic(() => import('./ArticlePageContainer'), { ssr: false });

  return (
    <Suspense fallback={<Loading />}>
      <main className='bg-transparent  relative overflow-hidden  '>
        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-elipse absolute bottom-0 left-0 -z-10'
          width={240}
          height={240}
        />
        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-elipse-short absolute bottom-0 right-0 delay-300 -z-10'
          width={240}
          height={240}
        />
        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-reverse absolute bottom-1/3 right-1/3 delay-500 -z-10'
          width={240}
          height={240}
        />

        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-reverse absolute top-1/3 left-1/3 delay-500 -z-10'
          width={240}
          height={240}
        />

        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-reverse absolute top-0 right-1/3 delay-500 -z-10'
          width={240}
          height={240}
        />

        <Image
          src={elipseOne}
          alt='elipse'
          className='object-cover animate-animate-reverse absolute top-0 left-1/4 delay-700 -z-10'
          width={140}
          height={140}
        />

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
