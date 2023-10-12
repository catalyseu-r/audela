'use client';

import React from 'react';

import { CommonSectionProps } from '../types/sections';
import { useGlobalContext } from '../contexts/store';
import { VscFlame as FlameIcon } from 'react-icons/vsc';
import { IoRocketOutline as RocketIcon } from 'react-icons/io5';
import Image from 'next/image';
import elipseOne from '../img/Ellipse 20.png';

const AboutContent = (props: CommonSectionProps) => {
  const { setIntersectionElements, intersectionElements } = useGlobalContext();

  const aboutSectionRef = React.useRef(null);

  React.useEffect(() => {
    const aboutObserver = new IntersectionObserver(
      ([entry]) =>
        setIntersectionElements((_prev) => {
          return { ..._prev, about: entry.isIntersecting };
        }),
      {
        rootMargin: '150px',
        threshold: 0.5,
      }
    );

    aboutSectionRef.current && aboutObserver.observe(aboutSectionRef.current);

    return () => aboutObserver.disconnect();
  }, [setIntersectionElements]);

  return (
    <section id='about' className='relative pt-40'>
      <Image
        src={elipseOne}
        alt='elipse'
        className='object-cover animate-animate-elipse absolute top-0 left-0'
        width={240}
        height={240}
      />
      <Image
        src={elipseOne}
        alt='elipse'
        className='object-cover animate-animate-elipse-short absolute top-1/2 left-1/2 delay-300'
        width={240}
        height={240}
      />
      <Image
        src={elipseOne}
        alt='elipse'
        className='object-cover animate-animate-reverse absolute top-1/3 left-1/3 delay-500'
        width={240}
        height={240}
      />
      <Image
        src={elipseOne}
        alt='elipse'
        className='object-cover animate-animate-reverse absolute bottom-1/3 left-3/4 delay-700'
        width={140}
        height={140}
      />
      <div
        ref={aboutSectionRef}
        style={{ opacity: intersectionElements.about ? '1' : '0.5' }}
        className={`transition-opacity min-h-custom-page-min lg:max-w-container-lg md:w-5/6  w-full md:px-0 px-4 mx-auto  grid grid-cols-1 relative  duration-300`}
      >
        {/* start section wrap */}
        <div className='grid grid-cols-1 gap-16'>
          <div className='grid col-span-1 gap-3.5 lg:mx-20'>
            <h2 className='text-text-white text-subHeading leading-10 font-normal'>&quot;Au-delà&quot; (French)</h2>
            <p className='text-text-white text-xl italic font-light'>
              The next world; life after death; <span className='text-interactive-green'>beyond.</span>
            </p>
          </div>

          <div className='grid col-span-1 gap-7 max-w-3xl self-stretch mx-auto'>
            <div className='flex items-center gap-3'>
              <FlameIcon className={`text-interactive-green text-xl shrink-0`} />
              <p className='text-text-white text-xl leading-8 font-medium'>
                Ignited by a love for art and design, I embarked on a journey of self-discovery.
              </p>
            </div>
            <p className='text-text-white text-xl leading-8 font-light px-8'>
              This project is a labour of love, designed and developed from scratch by a self-taught frontend developer
              who is passionate about exploring the realms of UI/UX design. It&apos;s a testament to the dedication and
              commitment of an individual on a mission to merge art and technology.
            </p>

            <p className='text-deep-green text-xl leading-8 font-light italic px-8'>
              Every pixel, every line of code, meticulously designed and developed to deliver a seamless and captivating
              experience.
            </p>
            <div className='flex items-center gap-3'>
              <RocketIcon className={`text-interactive-green text-xl shrink-0`} />
              <p className='text-text-white text-xl leading-8 font-medium'>
                I am actively pursuing new career opportunities.
              </p>
            </div>

            <p className='text-text-white text-xl leading-8 font-light px-8'>
              As part of my professional journey, I dedicate my time to both job-seeking and developing this app.
              It&apos;s a strategic move towards personal and career growth, all while continuing to work on this
              ambitious project.
            </p>
            <p className='text-text-white text-xl leading-8 font-light px-8'>
              Thank you for joining me on this cosmic journey.
            </p>
            <p className='text-text-white text-xl leading-8 font-light px-8'>
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
