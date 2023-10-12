'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Triangle } from 'react-loader-spinner';
const Loading = () => {
  return (
    <div className='bg-main-black w-screen h-screen  '>
      <AnimatePresence>
        <motion.div
          className='flex justify-center items-center w-full h-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Triangle height='240' width='240' color='#66FF66' ariaLabel='triangle-loading' visible={true} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Loading;
