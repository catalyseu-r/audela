'use client';

import React from 'react';
import ButtonCTA from './components/ButtonCTA';
import Navbar from './components/Navbar';
import SocialStack from './components/SocialStack';
import Header from './components/Header';
import Image from 'next/image';
import roverImg from './img/mars-rover.jpg';
const LandingContent = () => {
  const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false);

  const articleRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    const articleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        } else setIsIntersecting(false);
      },
      { rootMargin: '120px', threshold: 0.5 }
    );

    if (articleRef.current) {
      articleObserver.observe(articleRef.current);
    }

    return () => articleObserver.disconnect();
  }, []);

  return (
    <>
      <div className={`bg-landing-bg  bg-no-repeat lg:bg-[100%_100%] bg-cover bg-center   `}>
        <Navbar />
        {/* container */}
        <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto flex flex-col'>
          {/* container */}
          {/* overlay */}
          <div className='overlay-custom w-full h-full relative inline-block  min-h-custom-page-min transition-all ease-in-out'>
            {/* overlay */}
            <div className='flex flex-col items-start justify-start  absolute top-1/4'>
              <div className='flex flex-col items-start justify-start lg:gap-base-gap  gap-8'>
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

      <section className='lg:max-w-container-lg md:w-5/6 min-h-custom-page-min w-full md:px-0 px-4 mx-auto mt-20 flex flex-col'>
        {/*  */}
        <div className='flex gap-4 flex-wrap items-start justify-between w-full'>
          <div className='flex flex-col gap-6 items-start justify-center max-w-xl'>
            <p className='text-text-white leading-6 font-light text-xl'>
              At Au-delà my unwavering commitment is to broaden the horizons of space exploration, knowledge, and news,
              ensuring their accessibility to a global audience.
            </p>

            <p className='text-text-white leading-6 font-light text-xl'>
              As a solo designer and developer, I believe that the wonders of the cosmos should be within reach for
              everyone. My mission is to bring the marvels of space closer to your fingertips.
            </p>

            <p className='text-text-white leading-6 font-light text-xl'>
              Through the power of technology and the vast resources of NASA&apos;s Open API, I strive to deliver the
              latest discoveries, awe-inspiring imagery, and educational insights directly to your device. Join me on
              this cosmic journey as we explore the mysteries of the universe, share the excitement of space
              exploration, and inspire a new generation of space enthusiasts.
            </p>

            <p className='text-text-white leading-6 font-light text-xl'>Together, we&apos;re reaching for the stars.</p>
          </div>

          <div
            ref={articleRef}
            className='relative w-full md:w-3/12 lg:w-5/12 h-auto aspect-video shadow-custom-img-shadow hover:shadow-none transition-shadow duration-500 cursor-pointer'
          >
            <Image className='object-cover' src={roverImg} fill loading='lazy' alt='Mars rover in action' />
            <div
              className={`absolute ml-12  left-0 bottom-0 h-px ${
                isIntersecting ? 'w-32 ' : 'w-px'
              } bg-red-900  rotate-90 origin-top-left transition-[width] duration-500 `}
            ></div>
            <div
              className={`absolute ml-12 left-0 rotate-0 bottom-0 h-px ${
                isIntersecting ? 'w-32 ' : 'w-px'
              }  bg-red-900 transform-gpu  transition-[width] duration-500`}
            ></div>

            <div className='flex flex-col items-end w-8/12 absolute top-full bg-text-white p-4 gap-6 mt-48'>
              <h3 className='text-bg-black font-normal leading-6 text-xl self-stretch px-4'>Photographing Mars</h3>
              <p className='text-bg-black font-light leading-6 text-base self-stretch px-6'>
                NASA&apos;s Curiosity Mars rover used its black-and-white navigation cameras to capture panoramas of
                this scene at two times of day on Nov. 16, 2021.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingContent;
