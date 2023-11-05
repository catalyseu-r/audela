'use client';

import { useAppContext } from '@/app/contexts/store';
import Image from 'next/image';
import Loading from '../loading';

const RoverPhotoGallery = () => {
  const {
    state: {
      currentGallery: { photos, isLoading },
    },
  } = useAppContext();

  if (isLoading) {
    return <Loading />;
  } else if (!photos || photos.length === 0) {
    return (
      <h2 className='mx-auto text-error-red/80 text-2xl leading-6'>
        There are no images for that filter setting! Try with diffirent settings 👨🏻‍🚀
      </h2>
    );
  } else {
    return photos.map((photo) => (
      <div key={photo.id} className='w-[28rem] h-[20rem] relative rounded snap-always snap-start aspect-video '>
        <Image
          className='rounded object-cover opacity-0 transition-opacity  aspect-video '
          loading='lazy'
          src={photo.img_src}
          fill
          alt='Photo form Mars rover'
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
        />
      </div>
    ));
  }
};

export default RoverPhotoGallery;
