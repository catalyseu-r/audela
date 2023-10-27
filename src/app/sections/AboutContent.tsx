'use client';

import React from 'react';

import { CommonSectionProps } from '../types/sections';

import { VscFlame as FlameIcon } from 'react-icons/vsc';
import { IoRocketOutline as RocketIcon } from 'react-icons/io5';

import { useAppContext } from '../contexts/store';
import { ActionTypes } from '../types/actionTypes';

import ElipseEffect from '../components/ElipseEffect';
import { useObserver } from '../utils/hooks/useObserver';

const AboutContent = (props: CommonSectionProps) => {
  const {
    dispatch,
    state: { intersectionElements },
  } = useAppContext();

  const aboutSectionRef = React.useRef(null);

  const isAboutSectionIntersecting = useObserver(aboutSectionRef, { rootMargin: '150px', threshold: 0.5 });

  React.useEffect(() => {
    isAboutSectionIntersecting && dispatch({ type: ActionTypes.SET_INTERSECTION_ELEMENTS, payload: 'about' });
  }, [dispatch, isAboutSectionIntersecting]);

  return (
    <section id='about' className='relative pt-40'>
      <ElipseEffect />
      <div
        ref={aboutSectionRef}
        className={` min-h-custom-page-min lg:max-w-container-lg md:w-5/6  w-full md:px-0 px-4 mx-auto  grid grid-cols-1 relative `}
      >
        {/* start section wrap */}
        <div className='grid grid-cols-1 gap-16 will-change-contents'>
          <div
            style={{
              transform: intersectionElements.about ? 'translateX(0)' : 'translateX(25%)',
              opacity: intersectionElements.about ? '1' : '0',
            }}
            className='grid col-span-1 gap-3.5 lg:mx-20 transition-all duration-300 delay-100'
          >
            <h2 className='text-text-white text-subHeading leading-10 font-normal'>&quot;Au-delà&quot; (French)</h2>
            <p className='text-text-white text-xl italic font-light'>
              The next world; life after death; <span className='text-interactive-green'>beyond.</span>
            </p>
          </div>

          <div className='grid col-span-1 gap-7 max-w-3xl self-stretch mx-auto'>
            <div
              style={{
                transform: intersectionElements.about ? 'translateX(0)' : 'translateX(-25%)',
                opacity: intersectionElements.about ? '1' : '0',
              }}
              className='flex items-center gap-3 transition-all duration-300 delay-200'
            >
              <FlameIcon className={`text-interactive-green text-xl shrink-0`} />
              <p className='text-text-white lg:text-xl md:text-lg text-base leading-8 font-medium'>
                Ignited by a love for art and design, I embarked on a journey of self-discovery.
              </p>
            </div>
            <p
              style={{
                transform: intersectionElements.about ? 'translateX(0)' : 'translateX(25%)',
                opacity: intersectionElements.about ? '1' : '0',
              }}
              className='text-text-white lg:text-xl md:text-lg text-base leading-8 font-light px-8 transition-all duration-300 delay-300'
            >
              This project is a labour of love, designed and developed from scratch by a self-taught frontend developer
              who is passionate about exploring the realms of UI/UX design. It&apos;s a testament to the dedication and
              commitment of an individual on a mission to merge art and technology.
            </p>

            <p
              style={{
                transform: intersectionElements.about ? 'translateX(0)' : 'translateX(-25%)',
                opacity: intersectionElements.about ? '1' : '0',
              }}
              className='text-deep-green lg:text-xl md:text-lg text-base leading-8 font-light italic px-8 transition-all duration-300 delay-500'
            >
              Every pixel, every line of code, meticulously designed and developed to deliver a seamless and captivating
              experience.
            </p>
            <div
              style={{
                transform: intersectionElements.about ? 'translateX(0)' : 'translateX(25%)',
                opacity: intersectionElements.about ? '1' : '0',
              }}
              className='flex items-center gap-3 transition-all duration-300 delay-700'
            >
              <RocketIcon className={`text-interactive-green lg:text-xl md:text-lg text-base shrink-0`} />
              <p className='text-text-white lg:text-xl md:text-lg text-base leading-8 font-medium'>
                I am actively pursuing new career opportunities.
              </p>
            </div>

            <p
              style={{
                transform: intersectionElements.about ? 'translateX(0)' : 'translateX(-25%)',
                opacity: intersectionElements.about ? '1' : '0',
              }}
              className='text-text-white lg:text-xl md:text-lg text-base leading-8 font-light px-8 transition-all duration-300 delay-1000'
            >
              As part of my professional journey, I dedicate my time to both job-seeking and developing this app.
              It&apos;s a strategic move towards personal and career growth, all while continuing to work on this
              ambitious project.
            </p>
            <p
              style={{
                transform: intersectionElements.about ? 'translateX(0)' : 'translateX(25%)',
                opacity: intersectionElements.about ? '1' : '0',
              }}
              className='text-text-white lg:text-xl md:text-lg text-base leading-8 font-light px-8 transition-all duration-300 delay-1000'
            >
              Thank you for joining me on this cosmic journey.
            </p>
            <p
              style={{
                transform: intersectionElements.about ? 'translateX(0)' : 'translateX(-25%)',
                opacity: intersectionElements.about ? '1' : '0',
              }}
              className='text-text-white lg:text-xl md:text-lg text-base leading-8 font-light px-8 transition-all duration-300 delay-1000'
            >
              Together, we&apos;`re reaching for the stars.
            </p>
          </div>
        </div>
        {/* end section wrap */}
      </div>
    </section>
  );
};

export default AboutContent;
