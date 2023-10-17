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
        className={`${chakraP.className} lg:text-6xl md:text-5xl tracking-tighter text-4xl lg:leading-2xl leading-normal lg:drop-shadow-landing-txt text-text-white uppercase`}
      >
        {title}
      </h1>
    </header>
  );
};

export default Header;
