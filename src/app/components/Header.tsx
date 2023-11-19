import { Chakra_Petch } from 'next/font/google';
const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });

interface HeaderPropsDefault {
  title: string;
  isLanding?: boolean;
}

const Header = ({ title }: HeaderPropsDefault) => {
  return (
    <header className={`lg:w-6/12 md:w-8/12  w-10/12`}>
      <h1
        className={`${chakraP.className} lg:text-6xl md:text-5xl tracking-tighter text-4xl lg:leading-2xl leading-normal lg:drop-shadow-landing-txt text-text-white uppercase flex items-center gap-y-0 lg:row-gap-4 gap-3 flex-wrap`}
      >
        {title.split(' ').map((letter, index) => (
          <span
            className='animate-animate-landing-text origin-top-right inline-block opacity-0 select-none pointer-events-none'
            style={{ animationDelay: `${index / 5}s` }}
            key={letter + index}
          >
            {letter}
          </span>
        ))}
      </h1>
    </header>
  );
};

export default Header;
