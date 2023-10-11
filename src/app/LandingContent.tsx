'use client';

import React from 'react';
import ButtonCTA from './components/ButtonCTA';
import Navbar from './components/Navbar';
import SocialStack from './components/SocialStack';
import Header from './components/Header';
import Image from 'next/image';
import roverImg from './img/mars-rover.jpg';
import LineOne from './components/Lines/LineOne';
import LineTwo from './components/Lines/LineTwo';
import LineThree from './components/Lines/LineThree';
import LineFour from './components/Lines/LineFour';
import Bubble from './components/Lines/Bubble';
import elipseOne from './img/Ellipse 20.png';
import { LuForward as ForwardIcon } from 'react-icons/lu';

//
const LandingContent = () => {
  const [containerWidth, setContainerWidth] = React.useState<number>(1120);
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);

  const [intersectionElements, setIntersectionElements] = React.useState({
    landing: false,
    mission: false,
  });

  const pageSections = ['landing', 'mission', 'about', 'contact'];

  const landingSectionRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const missionSectionRef = React.useRef(null);

  React.useEffect(() => {
    const landingSectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersectionElements((_prev) => {
            return { ..._prev, landing: true };
          });
        } else
          setIntersectionElements((_prev) => {
            return { ..._prev, landing: false };
          });
      },
      { rootMargin: '120px', threshold: 0.5 }
    );

    landingSectionRef.current && landingSectionObserver.observe(landingSectionRef.current);

    const updateClientContainerWidth = () =>
      //@ts-ignore
      setContainerWidth(containerRef.current ? containerRef.current.clientWidth : 0);

    window && window.addEventListener('resize', updateClientContainerWidth);

    return () => {
      landingSectionObserver.disconnect();
      window.removeEventListener('resize', updateClientContainerWidth);
    };
  }, []);

  React.useEffect(() => {
    const updateClientScrollPostion = () => setScrollPosition(window.scrollY);

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

  React.useEffect(() => {
    const missionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersectionElements((_prev) => {
            return { ..._prev, mission: true };
          });
        } else
          setIntersectionElements((_prev) => {
            return { ..._prev, mission: false };
          });
      },
      { rootMargin: '120px', threshold: 0.5 }
    );

    missionSectionRef.current && missionObserver.observe(missionSectionRef.current);

    return () => missionObserver.disconnect();
  }, []);

  return (
    <div className='relative'>
      <section
        ref={landingSectionRef}
        id='landing'
        className={`bg-landing-bg    bg-no-repeat lg:bg-[100%_100%] bg-cover bg-center`}
      >
        <Navbar />

        {/* container */}
        <div
          ref={containerRef}
          className='master-cont md:px-0 px-4  md:w-5/6 relative lg:max-w-container-lg flex flex-col mx-auto'
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
            style={{ transform: `translateY(${scrollPosition / 5.5}px` }}
            className='w-full  mx-auto flex flex-col transform-gpu will-change-transform duration-0 '
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

      <section
        id='mission'
        ref={missionSectionRef}
        className=' bg-bg-black lg:max-w-container-lg md:w-5/6  w-full md:px-0 px-4 mx-auto mt-20 flex flex-col relative target:pt-24 transform-gpu will-change-transform  duration-0'
        style={{ transform: `translateY(-${scrollPosition / 5.5}px` }}
      >
        <div className='flex gap-16 flex-wrap items-start justify-start w-full'>
          <div className='flex flex-col gap-10 items-start justify-center max-w-xl'>
            <p className='text-text-white leading-10 font-light text-xl'>
              At Au-delà my unwavering commitment is to broaden the horizons of space exploration, knowledge, and news,
              ensuring their accessibility to a global audience.
            </p>

            <p className='text-text-white leading-10 font-light text-xl'>
              As a solo designer and developer, I believe that the wonders of the cosmos should be within reach for
              everyone. My mission is to bring the marvels of space closer to your fingertips.
            </p>

            <p className='text-text-white leading-10 font-light text-xl'>
              Through the power of technology and the vast resources of NASA&apos;s Open API, I strive to deliver the
              latest discoveries, awe-inspiring imagery, and educational insights directly to your device. Join me on
              this cosmic journey as we explore the mysteries of the universe, share the excitement of space
              exploration, and inspire a new generation of space enthusiasts.
            </p>

            <p className='text-text-white leading-10 font-light text-xl'>
              Together, we&apos;re reaching for the stars.
            </p>
          </div>

          <div className='flex relative flex-col w-full md:w-5/12 lg:w-5/12'>
            <div className='relative  h-80 lg:max-w-[416px] bg-red-500 aspect-video shadow-custom-img-shadow hover:shadow-none transition-shadow duration-500 cursor-pointer'>
              <Image className='object-cover' src={roverImg} fill loading='lazy' alt='Mars rover in action' />
            </div>

            <div className='absolute z-10 w-full '>
              <Bubble linkTo={null} currentInView={'mission'} />
              <LineOne isIntersecting={intersectionElements.mission} />
              <LineTwo isIntersecting={intersectionElements.mission} />
              <LineThree isIntersecting={intersectionElements.mission} />
              <LineFour isIntersecting={intersectionElements.mission} />

              <div
                className={` transition-all duration-700 ${
                  intersectionElements.mission ? 'opacity-100' : 'opacity-0'
                } ${
                  intersectionElements.mission ? 'delay-1000' : 'delay-0'
                } flex  flex-col items-end w-8/12 absolute top-full translate-x-6 rounded translate-y-48 lg:w-[22rem] bg-text-white p-4 gap-6 `}
              >
                <h3 className='text-bg-black font-normal leading-6 text-xl self-stretch px-4'>Photographing Mars</h3>
                <p className='text-bg-black font-light leading-6 text-base self-stretch px-6 '>
                  NASA&apos;s Curiosity Mars rover used its black-and-white navigation cameras to capture panoramas of
                  this scene at two times of day on Nov. 16, 2021.
                </p>
                <div className='w-6 h-6 rounded-full flex items-center justify-center bg-transparent border border-deep-green'>
                  <ForwardIcon className={`text-base text-deep-green`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Image
          src={elipseOne}
          alt='elipse'
          className='blur-lg object-cover animate-animate-elipse absolute top-0 left-0'
          width={240}
          height={240}
        />
        <Image
          src={elipseOne}
          alt='elipse'
          className='blur-lg object-cover animate-animate-elipse-short absolute top-1/2 left-1/2 delay-300'
          width={240}
          height={240}
        />
        <Image
          src={elipseOne}
          alt='elipse'
          className='blur-lg object-cover animate-animate-reverse absolute top-1/3 left-1/3 delay-500'
          width={240}
          height={240}
        />
      </section>
      <section>
        <div className='min-h-custom-page-min'></div>
      </section>
    </div>
  );
};

export default LandingContent;
