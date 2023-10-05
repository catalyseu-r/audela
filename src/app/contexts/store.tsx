'use client';

import React, { SetStateAction } from 'react';
import { PlanetaryDataArticle } from '../types/planetaryData';
import { planetarySearch } from '../utils/API/planetarySearch';
import { sortByDate } from '../utils/lists/sort';
import { usePathname, useRouter } from 'next/navigation';

export enum SortState {
  asc = 'asc',
  desc = 'desc',
}
interface ContextProps {
  userQuery: string;
  pagination: {
    totalItems: number;
    currentPage: number;
  };
  articleState: PlanetaryDataArticle[];
  startIndex: number;
  endIndex: number;
  articlesPerPage: number;
  maxPages: number;
  isNotFound: boolean;
  sortState: SortState;
  isSearchActive: boolean;
  //
  setUserQuery: React.Dispatch<SetStateAction<string>>;
  setArticleState: React.Dispatch<SetStateAction<PlanetaryDataArticle[]>>;
  setIsNotFound: React.Dispatch<SetStateAction<boolean>>;
  setSortState: React.Dispatch<SetStateAction<SortState>>;
  setPagination: React.Dispatch<
    React.SetStateAction<{
      totalItems: number;
      currentPage: number;
    }>
  >;
  setIsSearchActive: React.Dispatch<SetStateAction<boolean>>;
  handleUserQuery: (query: string) => Promise<void>;
}

const GlobalContext = React.createContext<ContextProps>({
  userQuery: '',
  articleState: [],
  articlesPerPage: 6,
  maxPages: 15,
  startIndex: 0,
  endIndex: 0,
  isNotFound: false,
  sortState: SortState.desc,
  isSearchActive: false,
  pagination: {
    totalItems: 0,
    currentPage: 1,
  },
  //
  setArticleState: (): [] => [],
  setUserQuery: (): string => '',
  setIsNotFound: () => {},
  setSortState: () => SortState.desc || SortState.asc,
  setPagination: () => {},
  handleUserQuery: (): any => Promise,
  setIsSearchActive: () => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  const pathName = usePathname();
  const router = useRouter();

  const [pagination, setPagination] = React.useState({
    totalItems: 0,
    currentPage: 1,
  });

  const [sortState, setSortState] = React.useState<SortState>(SortState.desc);
  const [userQuery, setUserQuery] = React.useState<string>('');
  const [articleState, setArticleState] = React.useState<PlanetaryDataArticle[]>([]);
  const [isNotFound, setIsNotFound] = React.useState<boolean>(false);
  const [isSearchActive, setIsSearchActive] = React.useState<boolean>(false);

  const maxPages = 15;
  const articlesPerPage = 6;
  const startIndex = (pagination.currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;

  const handleUserQuery = async (query: string) => {
    const callApi = await planetarySearch({ query: query });

    if (pathName !== '/explore/planets') {
      router.push('/explore/planets');
    }

    if (callApi && callApi.collection.items.length > 0) {
      const totalHitCountFromApi = callApi.collection.metadata.total_hits;

      setPagination((_prev) => {
        if (totalHitCountFromApi >= maxPages * articlesPerPage) {
          return { ..._prev, totalItems: maxPages * articlesPerPage };
        } else
          return { currentPage: Math.ceil(totalHitCountFromApi / articlesPerPage), totalItems: totalHitCountFromApi };
      });

      const fullResults = callApi.collection.items;

      const prepareSort = sortByDate(fullResults, sortState);

      setArticleState(prepareSort);
      setIsNotFound(false);
    } else {
      setIsNotFound(true);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        userQuery,
        articlesPerPage,
        maxPages,
        startIndex,
        endIndex,
        articleState,
        isNotFound,
        sortState,
        pagination,
        isSearchActive,
        setIsSearchActive,
        setUserQuery,
        setArticleState,
        setIsNotFound,
        setSortState,
        setPagination,
        handleUserQuery,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => React.useContext(GlobalContext);
