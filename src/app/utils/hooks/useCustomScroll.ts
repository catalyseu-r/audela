import React, { WheelEvent } from 'react';

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
  const handleMouseUp = React.useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);
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

  const handleMouseWheel = React.useCallback(
    (e: WheelEvent) => {
      // e.preventDefault();
      if (elementContainer && elementContainer.current) {
        elementContainer.current.scrollLeft = e.deltaY * 7;
      }
    },
    [elementContainer]
  );
  //
  React.useEffect(() => {
    const containerVar = elementContainer.current;

    if (containerVar) {
      containerVar.addEventListener('mousemove', handleMouseMove as any);
      containerVar.addEventListener('mouseup', handleMouseUp);
      // elementContainer.current?.addEventListener('wheel', handleMouseWheel as any);
    }

    return () => {
      containerVar && containerVar.removeEventListener('mousemove', handleMouseMove as any);
      containerVar && containerVar.removeEventListener('mouseup', handleMouseUp);
      // elementContainer.current?.removeEventListener('wheel', handleMouseWheel as any);
    };
  }, [elementContainer, handleMouseMove, handleMouseWheel, handleMouseUp]);

  return [handleMouseDown, handleMouseMove, handleMouseUp];
};
