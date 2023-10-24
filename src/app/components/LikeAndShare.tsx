'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { FaHandHolding as HandIcon, FaRegHeart as HeartIcon } from 'react-icons/fa';
import { GoShareAndroid as ShareIcon } from 'react-icons/go';
import { handleShare } from '../utils/sharing/handleShare';

interface LinkeAndShareProps {
  articleData?: {
    title: string;
    description: string;
    url: string;
    ogImage: string;
  };
}

const LikeAndShare = (props: LinkeAndShareProps) => {
  const [isLikeAnimation, setIsLikeAnimation] = React.useState<boolean>(false);

  const handleClientShare = async () => {
    if (props.articleData) {
      const { title, description, url, ogImage } = props.articleData;
      await handleShare(title, description, url, ogImage);
    }
  };

  const handleLikeAnimation = React.useCallback(() => {
    setIsLikeAnimation(true);

    setTimeout(
      () =>
        toast.custom(
          (t) => (
            <div
              // draggable
              className={`${t.visible ? 'animate-enter ' : 'animate-leave'} max-w-md w-full bg-text-white rounded-sm 
              z-50 pointer-events-auto transition-all grid grid-cols-1 px-4 py-2 gap-4`}
            >
              <div className='grid grid-cols-1 gap-2'>
                <p className='text-base font-light leading-normal text-bg-black/50'>
                  Looks like you&apos;ve hit the like button 😍
                </p>
                <p className='text-base leading-normal font-light text-bg-black'>
                  I will build comment/like/save system soon. In the meantime you can enjoy this amazing message.
                </p>
              </div>

              <button
                onClick={() => toast.dismiss(t.id)}
                className='bg-deep-green text-text-white font-normal text-base w-max place-self-end px-4 py-2 rounded'
              >
                Ok 👩🏻‍🚀
              </button>
            </div>
          ),
          { duration: 4000 }
        ),
      700
    );

    setTimeout(() => setIsLikeAnimation(false), 600);
  }, []);

  return (
    <div className='flex self-end   items-center justify-end gap-9 px-6 '>
      <div
        onClick={() => !isLikeAnimation && handleLikeAnimation()}
        className='w-12 h-12 group hover:border-interactive-green transition-all cursor-pointer relative rounded-full border border-interactive-green/50 grid place-items-center'
      >
        <HeartIcon
          className={`text-lg text-interactive-green/50 absolute bottom-1/2 left-[47%] ${
            isLikeAnimation && 'animate-animate-heart'
          }  transition-all`}
        />
        <HandIcon
          className={`text-3xl transition-all origin-left ${
            isLikeAnimation && 'animate-animate-hand'
          } text-interactive-green/50`}
        />
      </div>

      <div className='w-12 h-12 rounded-full border border-interactive-green/50 grid place-items-center'>
        <ShareIcon onClick={handleClientShare} className={`text-3xl text-interactive-green/50`} />
      </div>
    </div>
  );
};

export default LikeAndShare;
