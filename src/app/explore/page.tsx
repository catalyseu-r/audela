import Navbar from '../components/Navbar';
import Options from './Options';

export default function Explore() {
  return (
    <main className='bg-main-black w-screen min-h-screen bg-no-repeat  lg:bg-cover lg:bg-[100%_100%] bg-center px-4 md:px-24 lg:px-40'>
      <Navbar />
      <Options />
    </main>
  );
}
