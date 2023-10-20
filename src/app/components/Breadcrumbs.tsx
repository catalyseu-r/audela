'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AiOutlineHome as HomeIcon } from 'react-icons/ai';

const Breadcrumbs = () => {
  const currentPath = usePathname()
    .split('/')
    .filter((item) => item !== '');

  const formatCurrentPath = currentPath.map((item, index, array) => array.slice(0, index + 1).join('/'));

  const formatCrumbs = () => {
    return currentPath.map((item, index, array) => {
      if (index === 0) {
        return (
          <span className='flex items-center justify-center gap-2' key={index}>
            <HomeIcon
              className={`text-base ${index === array.length - 1 ? 'text-interactive-green' : 'text-text-white'}`}
            />
            <Link
              href={`/${formatCurrentPath[index]}`}
              passHref
              className={`text-base ${index === array.length - 1 ? 'text-interactive-green' : 'text-text-white'}`}
              key={currentPath[index]}
            >
              {`${item}/`}
            </Link>
          </span>
        );
      }

      return (
        <span key={index}>
          <Link
            href={`/${formatCurrentPath[index]}`}
            passHref
            className={`text-base ${
              index === array.length - 1 ? 'text-interactive-green' : 'text-text-white'
            } line-clamp-1`}
            key={currentPath[index]}
          >
            {`${item}/`}
          </Link>
        </span>
      );
    });
  };

  return <div className='py-4  flex  justify-center items-center w-max gap-1 max-w-prose'>{formatCrumbs()}</div>;
};

export default Breadcrumbs;
