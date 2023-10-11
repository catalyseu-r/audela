'use client';

import React from 'react';

import { CommonSectionProps } from '../types/sections';
import { useGlobalContext } from '../contexts/store';

const AboutContent = (props: CommonSectionProps) => {
  const { scrollPosition } = props;
  const { setIntersectionElements, intersectionElements } = useGlobalContext();

  const aboutSectionRef = React.useRef(null);

  React.useEffect(() => {
    const aboutObserver = new IntersectionObserver(
      ([entry]) =>
        setIntersectionElements((_prev) => {
          return { ..._prev, about: entry.isIntersecting };
        }),
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    aboutSectionRef.current && aboutObserver.observe(aboutSectionRef.current);

    return () => aboutObserver.disconnect();
  }, [setIntersectionElements]);

  return (
    <section id='about' className='target:pt-48'>
      <div
        ref={aboutSectionRef}
        style={{ transform: intersectionElements.about ? 'translateX(0)' : 'translateX(50%)' }}
        className={`transition-all min-h-custom-page-min bg-red-400 lg:max-w-container-lg md:w-5/6  w-full md:px-0 px-4 mx-auto mt-20 flex flex-col relative  transform-gpu will-change-transform  duration-300`}
      ></div>
    </section>
  );
};

export default AboutContent;
