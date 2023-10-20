import * as React from 'react';
const LineFour = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    style={{
      transitionTimingFunction: 'cubic-bezier(0,.79,.65,.99)',
      transitionDuration: '250ms',
      transitionDelay: '250ms',
      transformOrigin: 'right',
      transition: 'ease-in-out',
      transitionProperty: 'all',
      width: props.isIntersecting ? '17px' : '0px',
      height: '2px',
    }}
    transform='translate(10,258)'
    fill='none'
  >
    <path stroke='#E4E4E4' strokeOpacity={1} d='M0 1h17' />
  </svg>
);
export default LineFour;
