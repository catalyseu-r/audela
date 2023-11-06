import React from 'react';

export const useCustomScroll = (elementContainer: React.MutableRefObject<HTMLDivElement | null>) => {
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [startX, setStartX] = React.useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = React.useState<number>(0);
  //
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);

      setStartX(e.pageX - (elementContainer.current?.offsetLeft || 0));

      setScrollLeft(elementContainer.current?.scrollLeft || 0);
    },
    [elementContainer]
  );
  //
  const handleMouseUp = React.useCallback(() => setIsDragging(false), []);
  //
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDragging) return;

      e.preventDefault();
      const x = e.pageX - (elementContainer.current?.offsetLeft || 0);

      const walk = (x - (startX || 0)) * 0.75;
      if (elementContainer.current) {
        elementContainer.current.scrollLeft = (scrollLeft || 0) - walk;
      }
    },

    [elementContainer, isDragging, scrollLeft, startX]
  );
  //
  React.useEffect(() => {
    const containerVar = elementContainer.current;

    if (elementContainer) {
      containerVar?.addEventListener('mousemove', handleMouseMove as any);
      containerVar?.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      containerVar?.removeEventListener('mousemove', handleMouseMove as any);
      containerVar?.removeEventListener('mouseup', handleMouseUp);
    };
  }, [elementContainer, handleMouseMove, handleMouseUp]);

  return [handleMouseDown, handleMouseUp, handleMouseMove];
};
