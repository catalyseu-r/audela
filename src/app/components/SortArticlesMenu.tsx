'use client';

import React from 'react';
import { ActionTypes } from '../types/actionTypes';
import { SortState } from '../types/sortState';
import { useAppContext } from '../contexts/store';

const SortArticlesMenu = () => {
  const {
    state: { isNotFound, articleState, sortState },
    dispatch,
  } = useAppContext();

  const handleDataSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: ActionTypes.SET_ARTICLE_STATE,
      payload: {
        data: articleState,
        direction: event.target.value as SortState,
      },
    });
  };
  return (
    <select
      name=''
      id=''
      placeholder='Newest first (default)'
      className={`py-2 px-6 rounded bg-bg-black border outline-none focus:border-interactive-green transition-all ${
        isNotFound ? 'border-deep-green/20' : 'border-deep-green/50'
      } text-base text-text-white  !font-sans ${isNotFound ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={isNotFound}
      onChange={(e) => {
        dispatch({ type: ActionTypes.SET_SORT_STATE, payload: e.target.value as SortState });
        handleDataSort(e);
      }}
      defaultValue={sortState}
    >
      <option value={SortState.desc}>Newest first (default)</option>
      <option value={SortState.asc}>Oldest first</option>
    </select>
  );
};

export default SortArticlesMenu;
