'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AiOutlineHome as HomeIcon } from 'react-icons/ai';

const Breadcrumbs = () => {
  const current = usePathname()
    .split('/')
    .filter((path) => path);

  const formatCrumbs = () =>
    current.map((item, index, array) =>
      array.length === 1 ? (
        <span key={index} className='flex items-center gap-1 justify-center'>
          <HomeIcon className={'text-main-white text-lg'} />
          <p className='text-text-red text-base'>{`${item}/`}</p>
        </span>
      ) : index === array.length - 1 ? (
        <p className='text-text-red text-base' key={index}>
          {`${item}/`}
        </p>
      ) : (
        <span key={index} className='flex items-center gap-1 justify-center'>
          <HomeIcon className={'text-main-white text-lg'} />
          <Link href={`/${item}`} className='text-main-white text-base' key={index}>
            {`${item}/`}
          </Link>
        </span>
      )
    );

  return <div className=' flex justify-center items-center w-min gap-1'>{formatCrumbs()}</div>;
};

export default Breadcrumbs;
