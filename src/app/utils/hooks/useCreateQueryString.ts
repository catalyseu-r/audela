import React from 'react';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export const useCreateQueryString = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = React.useCallback(
    (queryParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);

      for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
          params.set(key, queryParams[key]);
        }
      }

      return `?${params.toString()}`;
    },
    [searchParams]
  );

  const updatePath = React.useCallback(
    (queryParams: Record<string, string>) => {
      window.history.replaceState(
        { ...window.history.state, as: queryParams, url: createQueryString(queryParams) },
        '',
        createQueryString(queryParams)
      );
    },
    [createQueryString]
  );

  return { createQueryString, updatePath, searchParams, currentPath };
};
