import React from 'react';

export const useWindowSize = () => {
  const [clientWindowSize, setClientWindowSize] = React.useState<{ width: number; height: number } | null>(null);

  const updateClientSize = (width: number, height: number) => setClientWindowSize({ width, height });

  React.useEffect(() => {
    const windowCheck = window && typeof window !== 'undefined';

    if (windowCheck) {
      updateClientSize(window.innerWidth, window.innerHeight);

      window.addEventListener('resize', () => updateClientSize(window.innerWidth, window.innerHeight));
    }

    return window.removeEventListener('resize', () => updateClientSize(window.innerWidth, window.innerHeight));
  }, []);

  return clientWindowSize;
};
