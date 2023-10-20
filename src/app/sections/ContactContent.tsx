import React from 'react';
import { CommonSectionProps } from '../types/sections';
import Image from 'next/image';
import elipseOne from '../img/Ellipse 20.png';
import { FaRegEnvelope as MailIcon } from 'react-icons/fa';

import { useAppContext } from '../contexts/store';
import { ActionTypes } from '../types/actionTypes';
import { socialLinks } from '../staticData/socialLinks';
import Link from 'next/link';
import { imageClassNames } from '../staticData/imageClassNames';

const ContactContent = (props: CommonSectionProps) => {
  const { dispatch } = useAppContext();

  const contactSectionRef = React.useRef(null);

  React.useEffect(() => {
    const contactObserver = new IntersectionObserver(
      ([entry]) =>
        entry.isIntersecting && dispatch({ type: ActionTypes.SET_INTERSECTION_ELEMENTS, payload: 'contact' }),
      {
        rootMargin: '150px',
        threshold: 0.5,
      }
    );

    contactSectionRef.current && contactObserver.observe(contactSectionRef.current);

    return () => contactObserver.disconnect();
  }, [dispatch]);

  return (
    <section id='contact' className='relative  py-40 overflow-hidden'>
      {imageClassNames.map((className, index) => (
        <Image key={index} src={elipseOne} alt={`elipse-${index}`} width={240} height={240} className={className} />
      ))}

      {/* start section wrap */}
      <div
        ref={contactSectionRef}
        className='transition-opacity min-h-custom-page-min lg:max-w-container-lg md:w-5/6  w-full md:px-0 px-4 mx-auto  grid grid-cols-1 relative '
      >
        <div className='max-w-3xl grid grid-cols-1 gap-14 items-start py-2 px-4'>
          <h2 className='text-text-white lg:text-subHeading md:text-2xl text-xl leading-10 font-normal'>
            Got an App Idea? Let&lsquo;s Talk!
          </h2>
          <p className='text-text-white lg:text-2xl md:text-xl text-base leading-10 font-light'>
            Have a brilliant app concept in mind? I&lsquo;m all ears! Whether you&lsquo;re looking to bring your vision
            to life or explore new possibilities, don&lsquo;t hesitate to reach out.
          </p>

          <p className='text-deep-green italic lg:text-subHeading md:text-2xl text-xl leading-10 font-light'>
            I&lsquo;m excited to hear about your ideas and discuss how we can make them a reality.
          </p>

          <div className='flex items-center gap-2'>
            <MailIcon className={`lg:text-2xl md:text-xl text-base text-interactive-green`} />
            <p className='lg:text-2xl md:text-xl text-base text-text-white leading-6 font-normal'>
              Contact me at:{' '}
              <a
                className='underline text-deep-green lg:text-2xl md:text-xl text-base leading-6 font-normal'
                href='mailto:catalysteur@gmail.com'
              >
                catalysteur@gmail.com
              </a>
            </p>
          </div>

          <div className='grid items-start gap-4 grid-cols-1'>
            <p className='text-text-white lg:text-2xl md:text-xl text-base leading-10 font-normal'>👋🏻 Say hi</p>
            <div className='grid md:grid-cols-3 grid-cols-2 max-w-3xl  gap-6 '>
              {socialLinks.map((link, index, orig) => {
                const Icon = orig[index].icon;
                return (
                  <Link
                    href={link.href}
                    key={link.href}
                    rel='noopener noreferrer'
                    target='_blank'
                    className='py-4 px-6 flex items-center justify-center gap-4 rounded border border-deep-green hover:border-interactive-green transition-all ease-in-out cursor-pointer group '
                  >
                    <Icon
                      icon={link.icon}
                      className={`text-deep-green shrink-0 lg:text-2xl md:text-xl text-base cursor-pointer group-hover:text-interactive-green transform duration-500 group-hover:scale-125 transition-all `}
                    />
                    <p className={`text-text-white lg:text-2xl md:text-xl text-base leading-6 font-light `}>
                      {link.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;
