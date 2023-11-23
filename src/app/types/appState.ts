import { MarsRoverPhotos, MarsRoverProfile } from './marsRoverTypes';
import { PlanetaryDataArticle } from './planetaryData';
import { SortState } from './sortState';

export enum PhotoRecency {
  all = 'all',
  latest_photos = 'latest_photos',
}

export interface AppState {
  userQuery: string;
  fullQuery: string;
  pagination: {
    totalItems: number;
    currentPage: number;
  };

  imageOfTheDayCurrentDate: string | Date | null | undefined;

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
  marsFilterState: {
    sol: string;
    earth_date: string;
    camera: string | null;
    latest: PhotoRecency;
    rover: MarsRoverProfile | null;
  };

  currentGallery: {
    photos: MarsRoverPhotos[];
    isLoading: boolean;
  };
}
