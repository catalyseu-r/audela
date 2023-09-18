'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Triangle } from 'react-loader-spinner';
const Loading = () => {
  return (
    <div className='text-3xl text-main-white bg-main-black h-screen bg-no-repeat bg-center relative overflow-auto pb-24'>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className='flex justify-center items-center w-full h-full'>
            <Triangle height='80%' width='80%' color='#DB7C26' ariaLabel='triangle-loading' visible={true} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Loading;
