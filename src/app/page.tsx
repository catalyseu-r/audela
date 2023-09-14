import ButtonCTA from './components/ButtonCTA';
import Navbar from './components/Navbar';
import SocialStack from './components/SocialStack';
import Header from './components/Header';

export default async function Home() {
  return (
    <main className='bg-landing-bg h-screen bg-no-repeat lg:bg-[100%_100%] bg-cover bg-center  px-smscreen md:px-mdscreen xl:px-xlscreen'>
      <Navbar />
      <div className='flex flex-col items-start justify-start lg:gap-32 gap-16'>
        <div className='flex flex-col items-start justify-start lg:gap-8  gap-4 '>
          <Header isLanding title='embark on the journey through stars' />
          <ButtonCTA title="let's explore" linkTo='/explore' />
        </div>

        <SocialStack />
      </div>
    </main>
  );
}
