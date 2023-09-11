import Link from 'next/link';
import { ButtonPropsCTA } from '../types/buttonCTA';

const ButtonCTA = ({ title: buttonText, linkTo }: ButtonPropsCTA) => {
  const buttonDefault = 'py-4 px-6 lg:w-[16rem] w-48 mt-[2.75rem] bg-main-red flex items-center content-center rounded';
  const buttonTextDefault = 'lg:text-2xl text-xl w-full text-main-white uppercase cursor-pointer text-center';

  const generateLinkIfAny = () =>
    linkTo ? (
      <Link href={linkTo} className={buttonTextDefault}>
        {buttonText}
      </Link>
    ) : (
      <p className={buttonTextDefault}>{buttonText}</p>
    );

  return <div className={buttonDefault}>{generateLinkIfAny()}</div>;
};

export default ButtonCTA;
