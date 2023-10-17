import Link from 'next/link';
import { ButtonPropsCTA } from '../types/buttonCTA';
import { IoTelescopeOutline as TelescopeIcon } from 'react-icons/io5';

const ButtonCTA = ({ title: buttonText, linkTo }: ButtonPropsCTA) => {
  return (
    <Link
      href={linkTo ?? ''}
      className={`py-4 px-6 lg:w-64 h-auto w-auto  bg-deep-green hover:bg-interactive-green hover:text-bg-black hover:scale-95 flex items-center content-center rounded transition-all duration-500 lg:text-2xl text-l  text-text-white uppercase gap-4 cursor-pointer text-center justify-between`}
    >
      <p className='w-full leading-9 font-normal'>{buttonText}</p>
      <TelescopeIcon className={`lg:text-3xl text-l w-8 h-8`} />
    </Link>
  );
};

export default ButtonCTA;
