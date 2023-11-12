import { useSearchParams } from 'next/navigation';
import React from 'react';

export const useWindowSearch = () => {
  const [searchParamsFromLocation, setSearchParamsFromLocation] = React.useState<Record<string, string> | null>();
  const params = useSearchParams();
  React.useEffect(() => {
    if (typeof window !== 'undefined' && params.toString().length) {
      const queryString = window.location.search;
      const stringCut = queryString.substring(1);

      const parseString = stringCut.split('&');

      const parseQueryParams = parseString.reduce<Record<string, string>>((acc, curr) => {
        const [key, value] = curr.split('=');

        acc[key] = decodeURIComponent(value);

        return acc;
      }, {});
      setSearchParamsFromLocation(parseQueryParams);
    }
  }, [params]);

  return { searchParamsFromLocation, params };
};
