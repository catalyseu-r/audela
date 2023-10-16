'use client';

import React from 'react';
import { useGlobalContext } from '../contexts/store';
import { SlMagnifier as SearchIcon } from 'react-icons/sl';
import { TfiClose as CloseIcon } from 'react-icons/tfi';

const UserInput = () => {
  const { userQuery, setUserQuery, handleUserQuery, isSearchActive, setIsSearchActive } = useGlobalContext();

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleUserActionInput = React.useCallback(() => {
    if (isSearchActive) {
      handleUserQuery(userQuery);
    } else {
      setIsSearchActive(true);

      if ('virtualKeyboard' in navigator && navigator.virtualKeyboard) {
        //@ts-ignore
        navigator.virtualKeyboard.overlaysContent = true;
      }

      inputRef.current && inputRef.current.focus();
    }
  }, [handleUserQuery, isSearchActive, setIsSearchActive, userQuery]);

  return (
    <div
      className={` ${
        isSearchActive ? 'bg-bg-black w-full absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 ' : ''
      } overflow-hidden  border rounded border-transparent flex justify-end items-center  lg:px-6 px-2 py-2 focus-within:border-interactive-green transition-all`}
    >
      <SearchIcon
        onClick={handleUserActionInput}
        className={`${
          isSearchActive ? 'hidden' : 'block'
        } text-text-white text-2xl cursor-pointer transition-all hover:text-interactive-green`}
      />

      <div
        className={` transition-all  origin-right ${
          isSearchActive ? 'w-full' : 'w-0'
        } flex gap-6 justify-between items-center`}
      >
        <input
          ref={inputRef}
          type='text'
          name='userQuery'
          id='userQuery'
          className={`bg-transparent  text-text-white text-sm lg:text-base  focus:outline-none w-full`}
          placeholder='Your search term'
          onChange={(event) => setUserQuery(event.target.value)}
          onKeyDown={(keyDown) => keyDown.key === 'Enter' && handleUserQuery(userQuery)}
          defaultValue={userQuery}
        />

        <div className='flex gap-6 items-center'>
          <SearchIcon
            onClick={() => handleUserQuery(userQuery)}
            className={` text-text-white text-2xl cursor-pointer`}
          />
          <CloseIcon onClick={() => setIsSearchActive(false)} className={`text-text-white text-lg cursor-pointer`} />
        </div>
      </div>
    </div>
  );
};

export default UserInput;
