'use client';

import React from 'react';

interface BubbleProps {
  linkTo: string | null;
  currentInView: string | null;
}

const Bubble = (props: BubbleProps) => {
  const [isHover, setIsHover] = React.useState<boolean>(false);

  return (
    <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={17}
        height={17}
        fill='none'
        transform={props.linkTo ? undefined : `translate(72,260)`}
        className='cursor-pointer transition-colors'
      >
        {props.linkTo ? (
          <a href={`/#${props.linkTo}`}>
            <circle
              cx={8.5}
              cy={8.5}
              r={8.5}
              fill='#6F6'
              fillOpacity={isHover || props.currentInView === props.linkTo ? 1 : 0.24}
              className='transition-all duration-500'
            />
          </a>
        ) : (
          <circle cx={8.5} cy={8.5} r={8.5} fill='#6F6' fillOpacity={0.24} />
        )}
      </svg>
    </div>
  );
};
export default Bubble;
