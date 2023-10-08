'use client';

import React from 'react';
import ButtonCTA from './components/ButtonCTA';
import Navbar from './components/Navbar';
import SocialStack from './components/SocialStack';
import Header from './components/Header';
const LandingContent = () => {
  const [clientHeight, setClientHeight] = React.useState<number>(0);

  React.useEffect(() => document && setClientHeight(document.documentElement.clientHeight), []);
  return (
    <>
      <div className={`bg-landing-bg  bg-no-repeat lg:bg-[100%_100%] bg-cover bg-center   `}>
        <Navbar />
        {/* container */}
        <div className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto flex flex-col'>
          {/* container */}
          {/* overlay */}
          <div className='overlay-custom w-full h-full relative inline-block  min-h-custom-page-min'>
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

      <section className='lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto mt-20 flex flex-col'>
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
            latest discoveries, awe-inspiring imagery, and educational insights directly to your device. Join me on this
            cosmic journey as we explore the mysteries of the universe, share the excitement of space exploration, and
            inspire a new generation of space enthusiasts.
          </p>

          <p className='text-text-white leading-6 font-light text-xl'>Together, we&apos;re reaching for the stars.</p>
        </div>
      </section>
    </>
  );
};

export default LandingContent;
