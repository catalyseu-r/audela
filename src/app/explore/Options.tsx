import React from 'react';

const Options = () => {
  const optionClass = 'py-4 px-2 flex items-center justify-center self-stretch border border-main-red';
  const optionTextClass = 'text-main-white';
  return (
    <div className='mt-[7rem] flex items-center justify-center'>
      <div className=' w-[40rem] h-[21rem] flex flex-col justify-between items-center'>
        <div className={optionClass}>
          <p className={optionTextClass}>Astronomy image of the day</p>
        </div>
        <div className={optionClass}>
          <p className={optionTextClass}>Planets</p>
        </div>
        <div className={optionClass}>
          <p className={optionTextClass}>Stars</p>
        </div>
        <div className={optionClass}>
          <p className={optionTextClass}>Weather on Mars</p>
        </div>
      </div>
    </div>
  );
};

export default Options;
