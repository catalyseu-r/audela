import Link from 'next/link';
import { ButtonPropsCTA } from '../types/buttonCTA';
import { IoTelescopeOutline as TelescopeIcon } from 'react-icons/io5';

const ButtonCTA = ({ title: buttonText, linkTo }: ButtonPropsCTA) => {
  return (
    <Link
      href={linkTo ?? ''}
      className={`group 
       lg:px-6 
       px-3  
       overflow-hidden
       lg:w-[16.5rem] 
       h-16
       w-auto 
       relative 
       before:absolute 
       before:w-full 
       before:h-full 
       before:right-0 
       before:-top-full
       before:transition-all
       before:lg:text-2xl
       before:text-lg
       before:text-center
       before:bg-deep-green 
       bg-deep-green 
       before:rounded
       rounded 
       transition-all 
        hover:before:tracking-widest
        before:hover:delay-200
       uppercase 
        before:flex
      before:justify-center
      before:items-center
       align-middle
       before:m-auto
       cursor-pointer 
       text-center 
       justify-between 
       hover:before:top-0  
       hover:before:bg-gradient-to-br 
       hover:before:to-interactive-green 
       hover:before:via-interactive-green/50
       hover:before:from-bg-black/50 
       before:content-["Let's_explore!"]
        inline-block
        bg-gradient-to-br from-deep-green   to-interactive-green 
      animate-animate-gradient-overlay
`}
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
