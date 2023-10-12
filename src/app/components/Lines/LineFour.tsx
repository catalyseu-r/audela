import * as React from 'react';
const LineFour = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.isIntersecting ? 17 : 0}
    height={props.isIntersecting ? 2 : 0}
    style={{ transitionTimingFunction: 'cubic-bezier(0,.79,.65,.99)', transitionDuration: '250ms' }}
    transform='translate(10,258)'
    fill='none'
    className=' delay-800 origin-right'
  >
    <path stroke='#E4E4E4' strokeOpacity={1} d='M0 1h17' />
  </svg>
);
export default LineFour;
