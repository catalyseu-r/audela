import Navbar from '../components/Navbar';
import Options from './Options';

export default function Explore() {
  return (
    <main className='bg-main-black w-screen min-h-screen bg-no-repeat xl:px-xlscreen md:px-mdscreen px-smscreen pb-24'>
      <Navbar />
      <Options />
    </main>
  );
}
