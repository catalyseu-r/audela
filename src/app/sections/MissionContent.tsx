'use client';

import React from 'react';

import LineOne from '../components/Lines/LineOne';
import LineTwo from '../components/Lines/LineTwo';
import LineThree from '../components/Lines/LineThree';
import LineFour from '../components/Lines/LineFour';

import { LuForward as ForwardIcon } from 'react-icons/lu';
import Bubble from '../components/Lines/Bubble';

import { CommonSectionProps } from '../types/sections';
import { useAppContext } from '../contexts/store';
import { ActionTypes } from '../types/actionTypes';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ElipseEffect from '../components/ElipseEffect';
import { useObserver } from '../utils/hooks/useObserver';

const MissionContent = (props: CommonSectionProps) => {
  const { scrollPosition } = props;

  const [isArticleInView, setIsArticleInView] = React.useState<boolean>(false);

  const { dispatch } = useAppContext();

  const missionSectionRef = React.useRef(null);
  const missionArticleRef = React.useRef(null);

  const isMissionIntersecting = useObserver(missionSectionRef, { threshold: 0.5 });
  const isArticleIntersecting = useObserver(missionArticleRef);

  const pathName = usePathname();

  React.useEffect(() => {
    if (isMissionIntersecting) {
      dispatch({ type: ActionTypes.SET_INTERSECTION_ELEMENTS, payload: 'mission' });
    }
    isArticleIntersecting ? setIsArticleInView(true) : setIsArticleInView(false);
  }, [dispatch, isMissionIntersecting, isArticleIntersecting]);

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
      <ElipseEffect />
      {/* start section wrap */}

      <div
        ref={missionSectionRef}
        className=' lg:max-w-container-lg md:w-5/6 w-full md:px-0 px-4 mx-auto grid grid-cols-1 relative'
      >
        <div className='flex gap-16 flex-wrap items-start justify-start w-full'>
          <div className='flex flex-col gap-10 items-start justify-center lg:max-w-xl w-full'>
            <p className='text-text-white leading-10 font-light lg:text-xl md:text-lg text-base'>
              At Au-delà my unwavering commitment is to broaden the horizons of space exploration, knowledge, and news
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

          <div className='flex relative flex-col w-full md:w-8/12 lg:w-5/12 group'>
            <div
              ref={missionArticleRef}
              style={{ backgroundPosition: '0% 0%', backgroundSize: '300% 300%' }}
              className={`relative  bg-overlay-mission aspect-video  h-80 lg:max-w-[416px]  overflow-hidden ${
                isArticleInView ? 'lg:shadow-custom-img-shadow delay-1000 ' : 'shadow-none'
              } transition-all duration-500 ease-linear cursor-pointer overflow-hidden animate-animate-mission-image bg-no-repeat bg-cover after:absolute after:w-full after:h-full after:bg-gradient-to-r from-bg-black/25 after:bg-[length:300%_300%] after:inset-0 after:animate-animate-mission-image-overlay after:opacity-20  lg:after:blur-sm after:z-10`}
            ></div>

            <div className='absolute bottom-0 cursor-pointer w-full h-full will-change-contents '>
              <Bubble linkTo={null} currentInView={'mission'} />
              <LineOne isIntersecting={isArticleInView} />
              <LineTwo isIntersecting={isArticleInView} />
              <LineThree isIntersecting={isArticleInView} />
              <LineFour isIntersecting={isArticleInView} />

              <Link
                className={` transition-opacity duration-700 ${
                  isArticleInView ? 'opacity-100' : 'opacity-0'
                } flex  flex-col items-end w-10/12 md:w-8/12 absolute top-full translate-x-6 rounded translate-y-48 lg:w-[22rem] bg-text-white p-4 lg:gap-6 md:gap-4 gap-2 `}
                href={`${pathName}explore/news-and-studies/PIA24937`}
              >
                <h3 className='text-bg-black font-normal leading-6 text-xl self-stretch px-4'>Photographing Mars</h3>
                <p className='text-bg-black font-light leading-6 text-base self-stretch px-6 '>
                  NASA&apos;s Curiosity Mars rover used its black-and-white navigation cameras to capture panoramas of
                  this scene at two times of day on Nov. 16, 2021.
                </p>
                <div className='w-6 h-6 rounded-full flex items-center justify-center bg-transparent border border-deep-green'>
                  <ForwardIcon className={`text-base text-deep-green`} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionContent;
