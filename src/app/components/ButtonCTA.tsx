import Link from 'next/link';
import { ButtonPropsCTA } from '../types/buttonCTA';
import { IoTelescopeOutline as TelescopeIcon } from 'react-icons/io5';

const ButtonCTA = ({ title: buttonText, linkTo }: ButtonPropsCTA) => {
  return (
    <Link
      href={linkTo ?? ''}
      className={`lg:py-4 md:py-3 py-2 group lg:px-6 px-3 lg:w-[16.5rem] h-auto w-auto relative overflow-hidden rounded transition-all uppercase cursor-pointer text-center justify-between inline-block bg-gradient-to-br from-deep-green to-interactive-green animate-animate-gradient-overlay`}
      style={{
        backgroundSize: '300% 300%',
      }}
    >
      <div className='flex items-center content-center gap-4 w-full h-full transition-all'>
        <p className='w-full lg:text-2xl text-lg  transition-all ease-linear leading-9 font-normal animate-animate-cta-text'>
          {buttonText}
        </p>
        <TelescopeIcon className={`lg:text-3xl text-lg shrink-0`} />
      </div>
    </Link>
  );
};

export default ButtonCTA;
