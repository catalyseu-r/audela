'use client';

import React from 'react';
import { useGlobalContext } from '../contexts/store';
import { SlMagnifier as SearchIcon } from 'react-icons/sl';

const UserInput = () => {
  const { userQuery, setUserQuery, handleUserQuery } = useGlobalContext();

  return (
    <div className='border-b border-dimmed-accent flex justify-end items-center py-2 px-6  focus-within:border-main-orange-accent transition-all'>
      <input
        type='text'
        name='userQuery'
        id='userQuery'
        className='bg-transparent text-main-white text-base cursor-default focus:outline-none'
        placeholder='Your search term'
        onChange={(event) => setUserQuery(event.target.value)}
        onKeyDown={(keyDown) => keyDown.key === 'Enter' && handleUserQuery(userQuery)}
        defaultValue={userQuery}
      />

      <SearchIcon onClick={() => handleUserQuery(userQuery)} className='text-main-white text-2xl' />
    </div>
  );
};

export default UserInput;
