import React from 'react';

import { BsArrowLeft as ArrowLeft, BsArrowRight as ArrorwRight } from 'react-icons/bs';
import { useAppContext } from '../contexts/store';
import { ActionTypes } from '../types/actionTypes';
import { articlesPerPage, maxPages } from '../staticData/variables';
import { useWindowSize } from '../utils/hooks/useWindowSize';

const PaginationArticles = () => {
  const {
    state: { pagination },
    dispatch,
  } = useAppContext();

  const windowSize = useWindowSize();

  const buttonArray = Array.from(
    Array(
      pagination.totalItems >= maxPages * articlesPerPage
        ? maxPages
        : Math.ceil(pagination.totalItems / articlesPerPage)
    ).keys()
  );

  const isForwrard = (current: number, button: 'forward' | 'back') => {
    if (button === 'forward' && current < buttonArray.length) {
      dispatch({
        type: ActionTypes.NEXT_PAGE,
      });
    } else if (button === 'back' && current !== 1) {
      dispatch({
        type: ActionTypes.PREV_PAGE,
      });
    }
  };

  return (
    <div className='flex items-center justify-center gap-4 w-full mt-16'>
      <button
        onClick={() => isForwrard(pagination.currentPage, 'back')}
        className={`lg:w-6 lg:h-6 w-9 h-9 flex items-center justify-center border p-1 rounded ${
          pagination.currentPage === 1 ? `cursor-not-allowed` : `cursor-pointer`
        } ${pagination.currentPage === 1 ? `border-deep-green/50` : `border-interactive-green`}`}
        disabled={pagination.currentPage === 1}
      >
        <ArrowLeft className='text-lg text-text-white' />
      </button>
      {windowSize && windowSize.width > 768 ? (
        buttonArray.map((item, index) => {
          const appendIndex = index + 1;
          return (
            <button
              key={appendIndex}
              className={`text-lg transition-all ${
                appendIndex === pagination.currentPage ? `text-interactive-green scale-150` : `text-text-white`
              }`}
              onClick={(event) => {
                dispatch({
                  type: ActionTypes.SET_PAGE,
                  payload: Number(event.currentTarget.value),
                });
              }}
              value={appendIndex}
            >
              {appendIndex}
            </button>
          );
        })
      ) : (
        <select
          value={pagination.currentPage}
          onChange={(event) => {
            dispatch({
              type: ActionTypes.SET_PAGE,
              payload: Number(event.currentTarget.value),
            });
          }}
          className=' px-4 h-9 rounded bg-bg-black border outline-none focus:border-interactive-green transition-all border-deep-green text-base text-text-white  !font-sans cursor-pointer'
        >
          {buttonArray.map((item, index) => {
            const appendIndex = index + 1;
            return (
              <option
                className={`${pagination.currentPage === appendIndex && `text-main-orange-accen`}`}
                key={appendIndex}
                value={appendIndex}
              >
                {appendIndex}
              </option>
            );
          })}
        </select>
      )}
      <button
        onClick={() => isForwrard(pagination.currentPage, 'forward')}
        className={`lg:w-6 lg:h-6 w-9 h-9 flex items-center justify-center border p-1 rounded ${
          pagination.currentPage === buttonArray.length ? `cursor-not-allowed` : `cursor-pointer`
        } ${
          pagination.currentPage === buttonArray.length ? `border-interactive-green/50` : `border-interactive-green`
        }`}
        disabled={pagination.currentPage === buttonArray.length}
      >
        <ArrorwRight className='text-lg text-text-white' />
      </button>
    </div>
  );
};

export default PaginationArticles;
