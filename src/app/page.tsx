import ButtonCTA from './components/ButtonCTA';
import Navbar from './components/Navbar';
import { Chakra_Petch } from 'next/font/google';
import SocialStack from './components/SocialStack';

const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });

export default async function Home() {
  return (
    <main className='bg-landing-bg w-screen h-screen bg-no-repeat  lg:bg-cover lg:bg-[100%_100%] bg-center'>
      <div className='h-full mx-4 md:mx-24 lg:mx-40'>
        <Navbar />
        <header className='lg:w-[34rem] w-[17rem] lg:mt-48 mt-32'>
          <h2 className={`${chakraP.className} w-full lg:text-5xl text-3xl text-main-white uppercase`}>
            EMBARK ON THE JOURNEY THROUGH STARS
          </h2>
          <ButtonCTA title="let's explore" />
          <SocialStack />
        </header>
      </div>
    </main>
  );
}
