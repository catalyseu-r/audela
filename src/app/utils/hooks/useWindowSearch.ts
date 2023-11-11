import React from 'react';

export const useWindowSearch = () => {
  const [searchParamsFromLocation, setSearchParamsFromLocation] = React.useState<string | null>();
  React.useEffect(() => {
    typeof window !== 'undefined' && setSearchParamsFromLocation(window.location.search);
  }, []);

  return { searchParamsFromLocation };
};
