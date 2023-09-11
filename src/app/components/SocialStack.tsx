import React from 'react';

import { AiFillDribbbleSquare as DribbleIcon, AiFillTwitterSquare as TwitterIcon } from 'react-icons/ai';
import { FaInstagramSquare as InstagramIcon, FaPinterestSquare as PinterestIcon } from 'react-icons/fa';

const SocialStack = () => {
  const iconClass = 'lg:text-4xl md:text-3xl text-2xl text-main-white';
  return (
    <div className='lg:w-[24rem] md:w-[16rem] w={8rem} flex items-center justify-between mt-[25%]'>
      <DribbleIcon className={iconClass} />
      <TwitterIcon className={iconClass} />
      <InstagramIcon className={iconClass} />
      <PinterestIcon className={iconClass} />
    </div>
  );
};

export default SocialStack;
