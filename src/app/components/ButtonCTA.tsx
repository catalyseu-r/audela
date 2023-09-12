import Link from 'next/link';
import { ButtonPropsCTA } from '../types/buttonCTA';

const ButtonCTA = ({ title: buttonText, linkTo }: ButtonPropsCTA) => {
  const buttonDefault = 'py-4 px-5 lg:w-64 h-auto w-40 bg-main-red flex items-center content-center rounded';
  const buttonTextDefault = 'lg:text-2xl text-l w-full text-main-white uppercase cursor-pointer text-center';

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
