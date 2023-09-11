import { Chakra_Petch } from 'next/font/google';
const chakraP = Chakra_Petch({ weight: '400', subsets: ['latin'] });

interface HeaderPropsDefault {
  title: string;
  isLanding: boolean;
}

const Header = ({ title, isLanding }: HeaderPropsDefault) => {
  const headerClass = `lg:w-[34rem] w-[17rem] ${isLanding && 'lg:mt-40 mt-32'} lg:mt-[7rem] mt-4rem`;

  const headerText = `${chakraP.className} w-full ${isLanding && 'lg:text-5xl text-3xl'} 
  lg:text-2xl text-xl
  text-main-white ${isLanding && 'uppercase'}`;

  return (
    <header className={headerClass}>
      <h2 className={headerText}>{title}</h2>
    </header>
  );
};

export default Header;
