'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Triangle } from 'react-loader-spinner';
const Loading = () => {
  return (
    <div className='text-3xl text-main-white bg-main-black w-full h-screen bg-no-repeat bg-center relative overflow-auto'>
      <AnimatePresence>
        <div className='flex justify-center items-center w-full h-full'>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Triangle height='80%' width='80%' color='#DB7C26' ariaLabel='triangle-loading' visible={true} />
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Loading;
