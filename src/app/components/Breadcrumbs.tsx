'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumbs = () => {
  const current = usePathname()
    .split('/')
    .filter((path) => path);

  const formatCrumbs = () =>
    current.map((item, index, array) =>
      index === array.length - 1 ? (
        <p className='text-red-400' key={index}>
          {`${item}`}
        </p>
      ) : (
        <Link href={`/${item}`} className='text-white' key={index}>
          {`${item}/`}
        </Link>
      )
    );
  console.log('FORMAT', formatCrumbs());

  return <div className='mt-2 flex justify-center items-center w-min gap-1'>{formatCrumbs()}</div>;
};

export default Breadcrumbs;
