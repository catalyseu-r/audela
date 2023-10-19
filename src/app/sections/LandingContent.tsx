'use client';

import React from 'react';

import { useAppContext } from '../contexts/store';
import { ActionTypes } from '../types/actionTypes';
import { pageSections } from '../staticData/sections';

import ButtonCTA from '../components/ButtonCTA';
import Navbar from '../components/Navbar';
import SocialStack from '../components/SocialStack';
import Header from '../components/Header';
import Bubble from '../components/Lines/Bubble';
import MissionContent from './MissionContent';
import AboutContent from './AboutContent';
import ContactContent from './ContactContent';

const LandingContent = () => {
  const [containerWidth, setContainerWidth] = React.useState<number>(1120);
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);
  const {
    dispatch,
    state: { intersectionElements },
  } = useAppContext();

  const landingSectionRef = React.useRef<HTMLDivElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const landingSectionObserver = new IntersectionObserver(
      ([entry]) =>
        entry.isIntersecting && dispatch({ type: ActionTypes.SET_INTERSECTION_ELEMENTS, payload: 'landing' }),

      { rootMargin: '100px', threshold: 1 }
    );

    landingSectionRef.current && landingSectionObserver.observe(landingSectionRef.current);

    const updateClientContainerWidth = () =>
      setContainerWidth(containerRef.current ? containerRef.current.clientWidth : 0);

    window && window.addEventListener('resize', updateClientContainerWidth);

    return () => {
      landingSectionObserver.disconnect();
      window.removeEventListener('resize', updateClientContainerWidth);
    };
  }, [dispatch]);

  React.useEffect(() => {
    const updateClientScrollPostion = () => window.scrollY < 772 && setScrollPosition(window.scrollY);

    window && window.addEventListener('scroll', updateClientScrollPostion);

    return () => window.removeEventListener('scroll', updateClientScrollPostion);
  }, []);

  const getTrueKey = React.useCallback((obj: any) => {
    for (const key in obj) {
      if (obj[key] === true) {
        return key;
      }
    }
    return '';
  }, []);

  return (
    <div className='relative'>
      <section ref={landingSectionRef} id='landing' className={`bg-landing-bg    bg-no-repeat  bg-cover bg-center`}>
        <Navbar />

        {/* container */}
        <div
          ref={containerRef}
          className='master-cont md:px-0 px-4  md:w-5/6 relative lg:max-w-container-lg grid grid-cols-1 mx-auto'
        >
          {/* custom-scrollbar */}
          <div
            style={{ transform: `translate3d(${containerWidth}px,-50%,0)` }}
            className={`h-[38.75rem] fixed top-2/4  w-px m-0 p-0  z-50 bg-text-white/10 lg:flex sm:hidden flex-col items-center justify-between overflow-visible`}
          >
            {pageSections.map((section) => (
              <Bubble key={section} linkTo={section} currentInView={getTrueKey(intersectionElements)} />
            ))}
          </div>
          {/* custom-scrollbar */}
          <div
            style={{
              transform: `translateY(${scrollPosition / 3.5}px) translateZ(0) `,
              transitionTimingFunction: 'cubic-bezier(0,.79,.65,.99)',
              transitionDuration: '250ms',
            }}
            className='w-full  mx-auto flex flex-col transform-gpu will-change-transform transition-custom-anim'
          >
            {/* container */}
            {/* overlay */}
            <div className='overlay-custom w-full h-full   inline-block  min-h-custom-page-min transition-all ease-in-out'>
              {/* overlay */}
              <div className='flex flex-col items-start justify-start  absolute top-1/4'>
                <div className='flex flex-col items-start justify-start lg:gap-base-gap  gap-8 z-10'>
                  <Header isLanding title='embark on the journey through stars' />
                  <ButtonCTA title="let's explore" linkTo='/explore' />
                </div>
              </div>

              <div className='absolute bottom-12   left-2/4 transform -translate-x-1/2 flex flex-col items-center justify-center gap-4'>
                <SocialStack />

                <p className='text-xs text-text-white text-center leading-6 font-normal'>
                  Designed and Developed with <span className='text-accent-pink'>❤</span> by Catalisteu-r
                </p>
                <p className='text-xs text-text-white text-center leading-6 font-normal'>
                  Powered by NextJS, TailwindCSS, and NASA Open API
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='grid grid-cols-1 gap-80'>
        <MissionContent scrollPosition={scrollPosition} />

        <AboutContent scrollPosition={scrollPosition} />

        <ContactContent scrollPosition={scrollPosition} />
      </div>
    </div>
  );
};

export default LandingContent;
