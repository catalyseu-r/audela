'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CirclesWithBar } from 'react-loader-spinner';
const Loading = () => {
  return (
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <AnimatePresence>
        <motion.div
          className='flex justify-center items-center w-full h-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CirclesWithBar
            height='240'
            width='240'
            color='#66FF66'
            ariaLabel='circles-with-bar-loading'
            visible={true}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Loading;
