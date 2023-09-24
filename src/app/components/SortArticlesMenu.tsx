'use client';

import React from 'react';
import { SortState, useGlobalContext } from '../contexts/store';
import { sortByDate } from '../utils/lists/sort';

const SortArticlesMenu = () => {
  const { isNotFound, setSortState, articleState, setArticleState, sortState } = useGlobalContext();

  const handleDataSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const updated = [...articleState];

    setArticleState(sortByDate(updated, event.target.value as SortState));
  };
  return (
    <select
      name=''
      id=''
      placeholder='Newest first (default)'
      className={`py-2 px-6 bg-second-black border outline-none focus:border-main-orange-accent transition-all ${
        isNotFound ? 'border-disabled-accent' : 'border-dimmed-accent'
      } text-base text-main-white  !font-sans ${isNotFound ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={isNotFound}
      onChange={(e) => {
        setSortState(e.target.value as SortState);
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