import React from 'react';
import { CommonSectionProps } from '../types/sections';
import Image from 'next/image';
import elipseOne from '../img/Ellipse 20.png';
import { FaRegEnvelope as MailIcon } from 'react-icons/fa';

import {
  FaDribbbleSquare as DribbleIcon,
  FaTumblrSquare as TumblrIcon,
  FaGithubSquare as GithubIcon,
  FaInstagramSquare as InstagramIcon,
  FaTwitterSquare as TwitterIcon,
  FaLinkedin as LinkedinIcon,
} from 'react-icons/fa';
import { useGlobalContext } from '../contexts/store';

const ContactContent = (props: CommonSectionProps) => {
  const { setIntersectionElements } = useGlobalContext();

  const contactSectionRef = React.useRef(null);

  React.useEffect(() => {
    const contactObserver = new IntersectionObserver(
      ([entry]) =>
        setIntersectionElements((_prev) => {
          return { ..._prev, contact: entry.isIntersecting };
        }),
      {
        rootMargin: '150px',
        threshold: 0.5,
      }
    );

    contactSectionRef.current && contactObserver.observe(contactSectionRef.current);

    return () => contactObserver.disconnect();
  }, [setIntersectionElements]);

  return (
    <section id='contact' className='relative min-h-screen bg-bg-black pt-40'>
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

      {/* start section wrap */}
      <div
        ref={contactSectionRef}
        className='transition-opacity min-h-custom-page-min lg:max-w-container-lg md:w-5/6  w-full md:px-0 px-4 mx-auto  grid grid-cols-1 relative '
      >
        <div className='max-w-3xl grid grid-cols-1 gap-14 items-start py-2 px-4'>
          <h2 className='text-text-white text-subHeading leading-10 font-normal'>Got an App Idea? Let&lsquo;s Talk!</h2>
          <p className='text-text-white text-2xl leading-10 font-light'>
            Have a brilliant app concept in mind? I&lsquo;m all ears! Whether you&lsquo;re looking to bring your vision
            to life or explore new possibilities, don&lsquo;t hesitate to reach out.
          </p>

          <p className='text-deep-green italic text-subHeading leading-10 font-light'>
            I&lsquo;m excited to hear about your ideas and discuss how we can make them a reality.
          </p>

          <div className='flex items-center gap-2'>
            <MailIcon className={`text-2xl text-interactive-green`} />
            <p className='text-2xl text-text-white leading-6 font-normal'>
              Contact me at:{' '}
              <a
                className='underline text-deep-green text-2xl leading-6 font-normal'
                href='mailto:catalysteur@gmail.com'
              >
                catalysteur@gmail.com
              </a>
            </p>
          </div>

          <div className='grid items-start gap-4 grid-cols-1'>
            <p className='text-text-white text-2xl leading-10 font-normal'>👋🏻 Say hi</p>
            <div className='grid grid-cols-3 max-w-3xl gap-6 '>
              <div className='py-4 px-6 flex items-center justify-center gap-4 rounded border border-deep-green hover:border-interactive-green transition-all ease-in-out cursor-pointer group'>
                <LinkedinIcon
                  className={`text-deep-green  text-2xl cursor-pointer group-hover:text-interactive-green transform duration-500 group-hover:scale-125 transition-all `}
                />
                <p className='text-text-white text-2xl leading-6 font-light'>@rudvl</p>
              </div>
              <div className='py-4 px-6 flex items-center justify-center gap-4 rounded border border-deep-green hover:border-interactive-green transition-all ease-in-out cursor-pointer group'>
                <GithubIcon
                  className={`text-deep-green  text-2xl cursor-pointer group-hover:text-interactive-green transform duration-500 group-hover:scale-125 transition-all `}
                />
                <p className='text-text-white text-2xl leading-6 font-light'>@rudvl</p>
              </div>
              <div className='py-4 px-6 flex items-center justify-center gap-4 rounded border border-deep-green hover:border-interactive-green transition-all ease-in-out cursor-pointer group'>
                <DribbleIcon
                  className={`text-deep-green  text-2xl cursor-pointer group-hover:text-interactive-green transform duration-500 group-hover:scale-125 transition-all `}
                />
                <p className='text-text-white text-2xl leading-6 font-light'>@rudvl</p>
              </div>
              <div className='py-4 px-6 flex items-center justify-center gap-4 rounded border border-deep-green hover:border-interactive-green transition-all ease-in-out cursor-pointer group'>
                <InstagramIcon
                  className={`text-deep-green  text-2xl cursor-pointer group-hover:text-interactive-green transform duration-500 group-hover:scale-125 transition-all `}
                />
                <p className='text-text-white text-2xl leading-6 font-light'>@rudvl</p>
              </div>
              <div className='py-4 px-6 flex items-center justify-center gap-4 rounded border border-deep-green hover:border-interactive-green transition-all ease-in-out cursor-pointer group'>
                <TwitterIcon
                  className={`text-deep-green  text-2xl cursor-pointer group-hover:text-interactive-green transform duration-500 group-hover:scale-125 transition-all `}
                />
                <p className='text-text-white text-2xl leading-6 font-light'>@rudvl</p>
              </div>
              <div className='py-4 px-6 flex items-center justify-center gap-4 rounded border border-deep-green hover:border-interactive-green transition-all ease-in-out cursor-pointer group'>
                <TumblrIcon
                  className={`text-deep-green  text-2xl cursor-pointer group-hover:text-interactive-green transform duration-500 group-hover:scale-125 transition-all `}
                />
                <p className='text-text-white text-2xl leading-6 font-light'>@rudvl</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;
