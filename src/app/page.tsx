import { Chakra_Petch } from 'next/font/google';
const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });

export default function Home() {
  return (
    <main className='bg-landing-bg w-screen h-screen bg-no-repeat  xl:bg-cover xl:bg-[100%_100%] bg-center'>
      <div className='h-full mx-20 xl:mx-40'>
        <nav className='w-full pt-[2.19rem]'>
          <div className='flex w-full justify-between'>
            <h2 className={`${chakraP.className} p-0 text-heading-desktop uppercase text-text-red z-10`}>au-delà</h2>
            <div className='w-[22rem] flex items-center justify-between text-buttons-navigation text-main-white'>
              <p>Our mission</p>
              <p>About</p>
              <p>Contact</p>
            </div>
          </div>
        </nav>
      </div>
    </main>
  );
}
