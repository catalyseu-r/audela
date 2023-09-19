import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotFound = () => {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='h-full w-full mt-24 lg:block flex items-center justify-center'>
          <h2 className='text-main-white lg:text-5xl md:text-3xl text-xl w-3/5 leading-normal lg:text-left text-center'>
            There were no results from your query, try searching for something else.
          </h2>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotFound;
