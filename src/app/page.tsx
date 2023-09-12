import ButtonCTA from './components/ButtonCTA';
import Navbar from './components/Navbar';
import SocialStack from './components/SocialStack';
import Header from './components/Header';

export default async function Home() {
  return (
    <main className=' bg-landing-bg w-screen h-screen bg-no-repeat  lg:bg-cover lg:bg-[100%_100%] bg-center'>
      <div className='h-full mx-4 md:mx-24 lg:mx-40'>
        <Navbar />
        <div className='flex flex-col items-start justify-start gap-32'>
          <div className='flex flex-col items-start justify-start lg:gap-8  gap-4 '>
            <Header isLanding title='embark on the journey through stars' />
            <ButtonCTA title="let's explore" linkTo='/explore' />
          </div>

          <SocialStack />
        </div>
      </div>
    </main>
  );
}
