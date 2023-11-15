import { Variants } from 'framer-motion';

export const variantsArticle_imageOfTheDay: Variants = {
  exit: { opacity: 0, transform: 'translateX(-100%)' },
  enter: { opacity: 1, transform: 'translateX(0)' },
};

export const variantsImage_imageOfTheDay: Variants = {
  exit: { opacity: 0, transform: 'translateX(100%)' },
  enter: { opacity: 1, transform: 'translateX(0)' },
};
