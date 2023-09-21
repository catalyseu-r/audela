import Link from 'next/link';
import { ButtonPropsCTA } from '../types/buttonCTA';
import { IoTelescopeOutline as TelescopeIcon } from 'react-icons/io5';

const ButtonCTA = ({ title: buttonText, linkTo }: ButtonPropsCTA) => {
  const buttonDefault = 'py-4 px-5 lg:w-64 h-auto w-auto  bg-accent-dark flex items-center content-center rounded';
  const buttonTextDefault =
    'lg:text-2xl text-l w-full text-main-white uppercase gap-4 cursor-pointer text-center flex items-center justify-between ';

  const generateLinkIfAny = () =>
    linkTo ? (
      <Link href={linkTo} className={buttonTextDefault}>
        {buttonText} <TelescopeIcon />
      </Link>
    ) : (
      <p className={buttonTextDefault}>{buttonText}</p>
    );

  return <div className={buttonDefault}>{generateLinkIfAny()}</div>;
};

export default ButtonCTA;
