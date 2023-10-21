import * as React from 'react';
const LineOne = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    style={{
      transitionTimingFunction: 'cubic-bezier(0,.79,.65,.99)',
      transitionDuration: '250ms',
      transition: 'ease-in-out',
      transitionProperty: 'all',
      width: '2px',
      height: '132px',
    }}
    transform='translate(80,260)'
    fill='none'
  >
    <path stroke='#E4E4E4' strokeOpacity={props.isIntersecting ? 1 : 0} d='M1 0v132' />
  </svg>
);
export default LineOne;
