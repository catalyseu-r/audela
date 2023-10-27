import React from 'react';

export const useObserver = (
  element: React.MutableRefObject<HTMLDivElement | null>,
  options?: IntersectionObserverInit
) => {
  const [isEntryIntersecting, setIsEntryIntersecting] = React.useState<boolean>(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsEntryIntersecting(entry.isIntersecting),

      options
    );

    if (element.current) {
      observer.observe(element.current);
    }

    return () => observer.disconnect();
  }, [element, options]);

  return isEntryIntersecting;
};
