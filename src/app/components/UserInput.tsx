'use client';

import React from 'react';
import { useGlobalContext } from '../contexts/store';
import { SlMagnifier as SearchIcon } from 'react-icons/sl';

const UserInput = () => {
  const { userQuery, setUserQuery, handleUserQuery } = useGlobalContext();
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onClickOutside = (event: MouseEvent) => {
    const element = event.target;

    if (inputRef.current && !inputRef.current.contains(element as Node)) {
      setIsSearchOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // translate - x - full;

  return (
    <>
      <div
        className={`${
          isSearchOpen ? ' translate-x-0 opacity-100' : '-z-10 translate-x-full opacity-0'
        } border cursor-pointer rounded border-dimmed-accent flex justify-end items-center py-2 lg:px-6 px-2  focus-within:border-main-orange-accent transition-all duration-500  `}
      >
        <input
          ref={inputRef}
          type='text'
          name='userQuery'
          id='userQuery'
          className='bg-transparent cursor-pointer text-main-white text-sm lg:text-base w-full max-w-full  focus:outline-none'
          placeholder='Your search term'
          onChange={(event) => setUserQuery(event.target.value)}
          onKeyDown={(keyDown) => keyDown.key === 'Enter' && handleUserQuery(userQuery)}
          defaultValue={userQuery}
        />

        <SearchIcon onClick={() => handleUserQuery(userQuery)} className='text-main-white text-2xl' />
      </div>

      <SearchIcon
        onClick={() => {
          setIsSearchOpen(!isSearchOpen);
          inputRef.current && inputRef.current.focus();
        }}
        className={`${
          isSearchOpen ? 'opacity-0 -z-10' : 'opacity-100 z-auto  border cursor-pointer rounded border-dimmed-accent'
        } text-main-white text-2xl py-2 lg:px-6 px-2`}
      />
    </>
  );
};

export default UserInput;
