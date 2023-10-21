import * as React from 'react';
const LineTwo = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    style={{
      transitionTimingFunction: 'cubic-bezier(0,.79,.65,.99)',
      transitionDuration: '250ms',
      transition: 'ease-in-out',
      transitionProperty: 'all',
      width: props.isIntersecting ? '71px' : '0px',
      height: '2px',
      transitionDelay: '250ms',
      transformOrigin: 'top left',
    }}
    fill='none'
    transform='translate(10, 258)'
  >
    <path stroke='#E4E4E4' strokeOpacity={1} d='M0 1h71' />
  </svg>
);
export default LineTwo;
