import { Suspense } from 'react';
import Loading from './loading';
import LandingContent from './LandingContent';

export default async function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <main className=''>
        <LandingContent />
      </main>
    </Suspense>
  );
}
