import React from 'react';

import {
  FaDribbbleSquare as DribbleIcon,
  FaTumblrSquare as TumblrIcon,
  FaGithubSquare as GithubIcon,
  FaInstagramSquare as InstagramIcon,
  FaTwitterSquare as TwitterIcon,
  FaLinkedin as LinkedinIcon,
} from 'react-icons/fa';

interface SocialStackProps {
  isInMenu?: boolean;
}

const SocialStack = (props: SocialStackProps) => {
  return (
    <div className={`${props.isInMenu ? 'w-32 flex-wrap ' : 'w-full'} flex items-center content-center gap-8 `}>
      <LinkedinIcon
        className={`text-deep-green  text-xl cursor-pointer hover:text-interactive-green transform duration-500 hover:scale-125 transition-all `}
      />
      <GithubIcon
        className={`text-deep-green  text-xl cursor-pointer hover:text-interactive-green transform duration-500 hover:scale-125 transition-all `}
      />
      <DribbleIcon
        className={`text-deep-green  text-xl cursor-pointer hover:text-interactive-green transform duration-500 hover:scale-125 transition-all `}
      />
      <InstagramIcon
        className={`text-deep-green  text-xl cursor-pointer hover:text-interactive-green transform duration-500 hover:scale-125 transition-all `}
      />
      <TwitterIcon
        className={`text-deep-green  text-xl cursor-pointer hover:text-interactive-green transform duration-500 hover:scale-125 transition-all `}
      />
      <TumblrIcon
        className={`text-deep-green  text-xl cursor-pointer hover:text-interactive-green transform duration-500 hover:scale-125 transition-all `}
      />
    </div>
  );
};

export default SocialStack;
