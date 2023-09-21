import React from 'react';

import { AiFillDribbbleSquare as DribbleIcon, AiFillTwitterSquare as TwitterIcon } from 'react-icons/ai';
import {
  FaInstagramSquare as InstagramIcon,
  FaPinterestSquare as PinterestIcon,
  FaGithubSquare as GithubIcon,
} from 'react-icons/fa';
import { ImTumblr2 as TumblrIcon } from 'react-icons/im';

interface SocialStackProps {
  isInMenu?: boolean;
}

const SocialStack = (props: SocialStackProps) => {
  const iconClass = 'lg:text-4xl md:text-3xl text-2xl text-main-white';
  return (
    <div
      className={`${
        props.isInMenu ? 'w-auto gap-8' : 'lg:w-3/12 md:w-4/12 w-8/12 gap-12'
      } flex items-center justify-start flex-wrap `}
    >
      <DribbleIcon className={iconClass} />
      <TwitterIcon className={iconClass} />
      <InstagramIcon className={iconClass} />
      <PinterestIcon className={iconClass} />
      <GithubIcon className={iconClass} />
      <TumblrIcon className={iconClass} />
    </div>
  );
};

export default SocialStack;
