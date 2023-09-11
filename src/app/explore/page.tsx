import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Options from './Options';

export default function Explore() {
  return (
    <main className='bg-landing-bg w-screen h-screen bg-no-repeat  lg:bg-cover lg:bg-[100%_100%] bg-center'>
      <div className='h-full mx-4 md:mx-24 lg:mx-40'>
        <Navbar />
        <Header isLanding={false} title='What do you want to search for?' />
        <Options />
      </div>
    </main>
  );
}
