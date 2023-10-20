'use client';

import React from 'react';
import { SlMagnifier as SearchIcon } from 'react-icons/sl';
import { TfiClose as CloseIcon } from 'react-icons/tfi';
import { planetarySearch } from '../utils/API/planetarySearch';

import { usePathname, useRouter } from 'next/navigation';
import { useAppContext } from '../contexts/store';
import { ActionTypes } from '../types/actionTypes';
import { generateRelatedItems } from '../utils/lists/generateRelated';
import { articlesPerPage, maxPages } from '../staticData/variables';

const UserInput = () => {
  const {
    state: { isSearchActive, userQuery, sortState, pagination },
    dispatch,
  } = useAppContext();

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const pathName = usePathname();

  const handleUserActionInput = React.useCallback(() => {
    if (isSearchActive) {
      dispatch({ type: ActionTypes.SET_USER_QUERY, payload: userQuery });
    } else {
      dispatch({ type: ActionTypes.SET_IS_SEARCH_ACTIVE, payload: true });

      if ('virtualKeyboard' in navigator && navigator.virtualKeyboard) {
        //@ts-ignore
        navigator.virtualKeyboard.overlaysContent = true;
      }

      inputRef.current && inputRef.current.focus();
    }
  }, [isSearchActive, userQuery, dispatch]);

  const handleUserQuery = async (query: string) => {
    dispatch({ type: ActionTypes.SET_IS_SEARCH_LOADING, payload: true });
    dispatch({ type: ActionTypes.SET_IS_NOT_FOUND, payload: false });
    const callApi = await planetarySearch({ query: query });

    if (pathName !== '/explore/news-and-studies') {
      router.push('/explore/news-and-studies');
    }

    if (callApi && callApi.collection.items.length > 0) {
      const totalHitCountFromApi = callApi.collection.metadata.total_hits;

      const fullResults = callApi.collection.items;

      dispatch({ type: ActionTypes.SET_ARTICLE_STATE, payload: { data: fullResults, direction: sortState } });
      dispatch({ type: ActionTypes.SET_IS_NOT_FOUND, payload: false });
      dispatch({ type: ActionTypes.SET_IS_SEARCH_LOADING, payload: false });
      dispatch({ type: ActionTypes.SET_TOTAL_ITEMS, payload: totalHitCountFromApi });
      dispatch({ type: ActionTypes.SET_RELATED_ITEMS, payload: generateRelatedItems(fullResults) });
      dispatch({ type: ActionTypes.SET_FULL_QUERY, payload: query });
      if (
        totalHitCountFromApi <= articlesPerPage * maxPages &&
        pagination.currentPage >= totalHitCountFromApi / articlesPerPage
      ) {
        dispatch({ type: ActionTypes.SET_PAGE, payload: Math.ceil(totalHitCountFromApi / articlesPerPage) });
      }
    } else {
      dispatch({ type: ActionTypes.SET_IS_NOT_FOUND, payload: true });
    }
  };

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
          onChange={(event) => dispatch({ type: ActionTypes.SET_USER_QUERY, payload: event.target.value })}
          onKeyDown={(keyDown) => keyDown.key === 'Enter' && handleUserQuery(userQuery)}
          defaultValue={userQuery}
        />

        <div className='flex gap-6 items-center'>
          <SearchIcon
            onClick={() => handleUserQuery(userQuery)}
            className={` text-text-white text-2xl cursor-pointer`}
          />
          <CloseIcon
            onClick={() => dispatch({ type: ActionTypes.SET_IS_SEARCH_ACTIVE, payload: false })}
            className={`text-text-white text-lg cursor-pointer`}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInput;
