'use client';

import React from 'react';

import { sortByDate } from '../utils/lists/sort';
import { ActionTypes } from '../types/actionTypes';
import { AppState } from '../types/appState';
import { AppAction } from '../types/appActions';
import { SortState } from '../types/sortState';

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case ActionTypes.SET_USER_QUERY:
      return { ...state, userQuery: action.payload };

    case ActionTypes.SET_ARTICLE_STATE:
      return {
        ...state,
        articleState: sortByDate(action.payload.data, action.payload.direction),
      };

    case ActionTypes.SET_RELATED_ITEMS:
      return {
        ...state,
        relatedItems: action.payload,
      };

    case ActionTypes.SET_TOTAL_ITEMS:
      return { ...state, pagination: { ...state.pagination, totalItems: action.payload } };

    case ActionTypes.SET_IS_NOT_FOUND:
      return { ...state, isNotFound: action.payload };

    case ActionTypes.SET_SORT_STATE:
      return { ...state, sortState: action.payload };

    case ActionTypes.NEXT_PAGE:
      return {
        ...state,
        pagination: { ...state.pagination, currentPage: state.pagination.currentPage + 1 },
      };

    case ActionTypes.PREV_PAGE:
      return {
        ...state,
        pagination: { ...state.pagination, currentPage: state.pagination.currentPage - 1 },
      };

    case ActionTypes.SET_PAGE:
      return { ...state, pagination: { ...state.pagination, currentPage: action.payload } };

    case ActionTypes.SET_INTERSECTION_ELEMENTS:
      return { ...state };

    case ActionTypes.SET_IS_SEARCH_LOADING:
      return { ...state, isSearchLoading: action.payload };

    case ActionTypes.SET_IS_SEARCH_ACTIVE:
      return { ...state, isSearchActive: action.payload };

    default:
      return state;
  }
};

const GlobalContext = React.createContext<{ state: AppState; dispatch: React.Dispatch<AppAction> } | undefined>(
  undefined
);

export const GlobalContextProvider = ({ children }: any) => {
  const initial_state = {
    userQuery: '',
    articleState: [],
    relatedItems: [],
    isNotFound: false,
    sortState: SortState.desc,
    isSearchActive: false,
    pagination: {
      totalItems: 0,
      currentPage: 1,
    },
    sliceIndex: {
      start: 0,
      end: 6,
    },
    intersectionElements: {
      landing: false,
      mission: false,
      missionArticle: false,
      about: false,
      contact: false,
    },

    isSearchLoading: false,
  };

  const [state, dispatch] = React.useReducer(appReducer, initial_state);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useAppContext() {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
