'use client';

import React from 'react';
import { useGlobalContext } from '../contexts/store';
import { SlMagnifier as SearchIcon } from 'react-icons/sl';
import { TfiClose as CloseIcon } from 'react-icons/tfi';

const UserInput = () => {
  const { userQuery, setUserQuery, handleUserQuery, isSearchActive, setIsSearchActive } = useGlobalContext();

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleUserActionInput = React.useCallback(
    (event: MouseEvent) => {
      const element = event.target;

      if (isSearchActive) {
        handleUserQuery(userQuery);
      } else {
        setIsSearchActive(true);
        const current = window.scrollY;
        if (current >= 0) {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }

        if ('virtualKeyboard' in navigator && navigator.virtualKeyboard) {
          //@ts-ignore
          navigator.virtualKeyboard.overlaysContent = true;
        }

        inputRef.current && inputRef.current.focus();
      }
    },
    [handleUserQuery, isSearchActive, setIsSearchActive, userQuery]
  );

  return (
    <div
      className={` ${
        isSearchActive ? 'w-full' : ''
      } overflow-hidden border rounded border-dimmed-accent flex justify-end items-center  lg:px-6 px-2 py-2 focus-within:border-main-orange-accent transition-all`}
    >
      <SearchIcon
        onClick={handleUserActionInput}
        className={`${
          isSearchActive ? 'scale-0' : 'scale-100'
        } text-main-white text-2xl cursor-pointer transition-all `}
      />

      <div
        className={` transition-all overflow-hidden  ${
          isSearchActive ? 'w-full' : 'w-0'
        } flex gap-6 justify-between items-center`}
      >
        <input
          ref={inputRef}
          type='text'
          name='userQuery'
          id='userQuery'
          className={`bg-transparent  text-main-white text-sm lg:text-base  focus:outline-none `}
          placeholder='Your search term'
          onChange={(event) => setUserQuery(event.target.value)}
          onKeyDown={(keyDown) => keyDown.key === 'Enter' && handleUserQuery(userQuery)}
          defaultValue={userQuery}
        />

        <SearchIcon
          onClick={() => handleUserQuery(userQuery)}
          className={` text-main-white text-2xl cursor-pointer transition-all shrink-0`}
        />
        <CloseIcon
          onClick={() => setIsSearchActive(false)}
          className={`text-main-white text-lg cursor-pointer transition-all shrink-0`}
        />
      </div>
    </div>
  );
};

export default UserInput;
