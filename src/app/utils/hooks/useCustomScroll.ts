import React from 'react';

export const useCustomScroll = (
  elementContainer: React.MutableRefObject<HTMLDivElement | null>,
  easing: number = 0.75
) => {
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

      const walk = (x - (startX || 0)) * easing;
      if (elementContainer.current) {
        elementContainer.current.scrollLeft = (scrollLeft || 0) - walk;
      }
    },

    [elementContainer, isDragging, scrollLeft, startX, easing]
  );

  const handleMouseWheel = React.useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (elementContainer && elementContainer.current) {
        const delta = e.deltaY;
        console.log('DELTA', delta);
        const newScrollLeft = elementContainer.current.scrollLeft + delta * easing;

        elementContainer.current.scrollLeft = newScrollLeft;
      }
    },
    [elementContainer, easing]
  );

  React.useEffect(() => {
    const containerVar = elementContainer.current;

    if (containerVar) {
      containerVar.addEventListener('mousemove', handleMouseMove as any);
      containerVar.addEventListener('mouseup', handleMouseUp);
      containerVar.childNodes.forEach((child) => child.addEventListener('mouseleave', handleMouseUp));
    }

    return () => {
      containerVar && containerVar.removeEventListener('mousemove', handleMouseMove as any);
      containerVar && containerVar.removeEventListener('mouseup', handleMouseUp);
      containerVar &&
        containerVar.childNodes.forEach((child) => child.removeEventListener('mouseleave', handleMouseUp));
    };
  }, [elementContainer, handleMouseMove, handleMouseUp]);

  return [handleMouseDown, handleMouseMove, handleMouseUp];
};
