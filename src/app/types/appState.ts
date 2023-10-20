import { PlanetaryDataArticle } from './planetaryData';
import { SortState } from './sortState';

export interface AppState {
  userQuery: string;
  fullQuery: string;
  pagination: {
    totalItems: number;
    currentPage: number;
  };

  intersectionElements: {
    landing: boolean;
    mission: boolean;
    about: boolean;
    contact: boolean;
  };
  articleState: PlanetaryDataArticle[];
  relatedItems: PlanetaryDataArticle[];
  isNotFound: boolean;
  sortState: SortState;
  isSearchActive: boolean;
  isSearchLoading: boolean;
}
