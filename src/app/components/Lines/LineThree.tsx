import * as React from 'react';
const LineThree = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    style={{
      transitionTimingFunction: 'cubic-bezier(0,.79,.65,.99)',
      transitionDuration: '250ms',
      transitionDelay: '250ms',
      transformOrigin: 'center bottom',
      transition: 'ease-in-out',
      transitionProperty: 'all',
      width: '2px',
      height: props.isIntersecting ? '132px' : '0px',
    }}
    transform='translate(10,258)'
    fill='none'
  >
    <path stroke='#E4E4E4' strokeOpacity={1} d='M1 0v132' />
  </svg>
);
export default LineThree;
