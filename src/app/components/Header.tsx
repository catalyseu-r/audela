import { Chakra_Petch } from 'next/font/google';
const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });

interface HeaderPropsDefault {
  title: string;
  isLanding: boolean;
}

const Header = ({ title, isLanding }: HeaderPropsDefault) => {
  const headerClass = `w-3/4  ${isLanding && 'mt-40'}`;

  const headerText = `${chakraP.className} w-full ${isLanding && 'lg:text-5xl md:text-4xl sm:text-2xl'} 
  lg:text-2xl text-xl
  text-main-white ${isLanding && 'uppercase'}`;

  return (
    <header className={headerClass}>
      <h1 className={headerText}>{title}</h1>
    </header>
  );
};

export default Header;
