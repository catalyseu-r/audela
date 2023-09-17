import ButtonCTA from './components/ButtonCTA';
import Navbar from './components/Navbar';
import SocialStack from './components/SocialStack';
import Header from './components/Header';

export default async function Home() {
  return (
    <main className='bg-landing-bg h-screen bg-no-repeat lg:bg-[100%_100%] bg-cover bg-center'>
      <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto'>
        <Navbar />
        <div className='flex flex-col items-start justify-start lg:gap-32 gap-16'>
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
