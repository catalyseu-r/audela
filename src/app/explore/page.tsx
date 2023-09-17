import Navbar from '../components/Navbar';
import Options from './Options';

export default function Explore() {
  return (
    <main className='bg-main-black w-screen min-h-screen bg-no-repeat  pb-24'>
      <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto '>
        <Navbar />
        <Options />
      </div>
    </main>
  );
}
