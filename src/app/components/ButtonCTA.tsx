import React from 'react';

interface ButtonProps {
  title: string;
}

const ButtonCTA = (props: ButtonProps) => {
  const btnText = props.title;
  return (
    <div className='py-4 px-6 lg:w-[16rem] w-48 mt-[2.75rem] bg-main-red flex items-center content-center rounded'>
      <p className='lg:text-2xl text-xl w-full text-main-white uppercase cursor-pointer text-center'>{btnText}</p>
    </div>
  );
};

export default ButtonCTA;
