import { ActionTypes } from './actionTypes';
import { PlanetaryDataArticle } from './planetaryData';
import { SortState } from './sortState';

export type AppAction =
  | { type: ActionTypes.SET_USER_QUERY; payload: string }
  | {
      type: ActionTypes.SET_ARTICLE_STATE;
      payload: {
        data: PlanetaryDataArticle[];
        direction: SortState;
      };
    }
  | {
      type: ActionTypes.SET_RELATED_ITEMS;
      payload: PlanetaryDataArticle[];
    }
  | { type: ActionTypes.SET_IS_NOT_FOUND; payload: boolean }
  | { type: ActionTypes.SET_SORT_STATE; payload: SortState }
  | {
      type: ActionTypes.SET_TOTAL_ITEMS;
      payload: number;
    }
  | { type: ActionTypes.NEXT_PAGE }
  | { type: ActionTypes.PREV_PAGE }
  | { type: ActionTypes.SET_PAGE; payload: number }
  | { type: ActionTypes.SET_INTERSECTION_ELEMENTS; payload: string }
  | { type: ActionTypes.SET_IS_SEARCH_LOADING; payload: boolean }
  | { type: ActionTypes.SET_IS_SEARCH_ACTIVE; payload: boolean };
