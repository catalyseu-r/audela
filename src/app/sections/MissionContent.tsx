'use client';

import React from 'react';

import Image from 'next/image';
import roverImg from '../img/mars-rover.jpg';
import LineOne from '../components/Lines/LineOne';
import LineTwo from '../components/Lines/LineTwo';
import LineThree from '../components/Lines/LineThree';
import LineFour from '../components/Lines/LineFour';
import elipseOne from '../img/Ellipse 20.png';
import { LuForward as ForwardIcon } from 'react-icons/lu';
import Bubble from '../components/Lines/Bubble';
import { useGlobalContext } from '../contexts/store';
import { CommonSectionProps } from '../types/sections';

const MissionContent = (props: CommonSectionProps) => {
  const { scrollPosition } = props;

  const { setIntersectionElements, intersectionElements } = useGlobalContext();

  const { missionArticle } = intersectionElements;

  const missionSectionRef = React.useRef(null);
  const missionArticleRef = React.useRef(null);

  React.useEffect(() => {
    const missionObserver = new IntersectionObserver(
      ([entry]) =>
        setIntersectionElements((_prev) => {
          return { ..._prev, mission: entry.isIntersecting };
        }),

      { rootMargin: '142px', threshold: 0.5 }
    );

    const missionArticleObserver = new IntersectionObserver(
      ([entry]) =>
        setIntersectionElements((_prev) => {
          return { ..._prev, missionArticle: entry.isIntersecting };
        }),
      { rootMargin: '-200px' }
    );

    missionSectionRef.current && missionObserver.observe(missionSectionRef.current);
    missionArticleRef.current && missionArticleObserver.observe(missionArticleRef.current);

    return () => {
      missionObserver.disconnect();
      missionArticleObserver.disconnect();
    };
  }, [setIntersectionElements]);

  return (
    <section
      id='mission'
      className='relative bg-bg-black pt-40 transform-gpu will-change-transform'
      style={{
        transform: `translateY(-${scrollPosition / 5.5}px) translateZ(0)`,
        transitionTimingFunction: 'cubic-bezier(0,.79,.65,.99)',
        transitionDuration: '250ms',
      }}
    >
      <Image
        src={elipseOne}
        alt='elipse'
        className=' object-cover animate-animate-elipse transition-transform absolute top-0 left-0'
        width={240}
        height={240}
      />
      <Image
        src={elipseOne}
        alt='elipse'
        className=' object-cover animate-animate-elipse-short transition-transform  absolute top-1/2 left-1/2 delay-300'
        width={240}
        height={240}
      />
      <Image
        src={elipseOne}
        alt='elipse'
        className='object-cover animate-animate-reverse absolute transition-transform  top-1/3 left-1/3 delay-500'
        width={240}
        height={240}
      />
      <Image
        src={elipseOne}
        alt='elipse'
        className=' object-cover animate-animate-reverse absolute transition-transform  top-1/3 right-1/3 delay-700'
        width={240}
        height={240}
      />
      {/* start section wrap */}

      <div
        ref={missionSectionRef}
        className=' lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto grid grid-cols-1 relative'
      >
        <div className='flex gap-16 flex-wrap items-start justify-start w-full'>
          <div className='flex flex-col gap-10 items-start justify-center lg:max-w-xl w-full'>
            <p className='text-text-white leading-10 font-light lg:text-xl md:text-lg text-base'>
              At Au-delà my unwavering commitment is to broaden the horizons of space exploration, knowledge, and news,
              ensuring their accessibility to a global audience.
            </p>

            <p className='text-text-white leading-10 font-light lg:text-xl md:text-lg text-base'>
              As a solo designer and developer, I believe that the wonders of the cosmos should be within reach for
              everyone. My mission is to bring the marvels of space closer to your fingertips.
            </p>

            <p className='text-text-white leading-10 font-light lg:text-xl md:text-lg text-base'>
              Through the power of technology and the vast resources of NASA&apos;s Open API, I strive to deliver the
              latest discoveries, awe-inspiring imagery, and educational insights directly to your device. Join me on
              this cosmic journey as we explore the mysteries of the universe, share the excitement of space
              exploration, and inspire a new generation of space enthusiasts.
            </p>

            <p className='text-text-white leading-10 font-light lg:text-xl md:text-lg text-base'>
              Together, we&apos;re reaching for the stars.
            </p>
          </div>

          <div className='flex relative flex-col w-full md:w-8/12 lg:w-5/12'>
            <div className='relative  h-80 lg:max-w-[416px]  aspect-square lg:shadow-custom-img-shadow lg:hover:shadow-none lg:transition-shadow duration-500 cursor-pointer'>
              <Image
                ref={missionArticleRef}
                className='object-cover'
                src={roverImg}
                fill
                loading='lazy'
                alt='Mars rover in action'
              />
            </div>

            <div className='absolute bottom-0 z-10 w-full will-change-contents '>
              <Bubble linkTo={null} currentInView={'mission'} />
              <LineOne isIntersecting={missionArticle} />
              <LineTwo isIntersecting={missionArticle} />
              <LineThree isIntersecting={missionArticle} />
              <LineFour isIntersecting={missionArticle} />

              <div
                className={` transition-opacity duration-700 ${
                  missionArticle ? 'opacity-100' : 'opacity-0'
                } flex  flex-col items-end w-10/12 md:w-8/12 absolute top-full translate-x-6 rounded translate-y-48 lg:w-[22rem] bg-text-white p-4 lg:gap-6 md:gap-4 gap-2 `}
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
      </div>
    </section>
  );
};

export default MissionContent;
