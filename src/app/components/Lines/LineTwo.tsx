import * as React from 'react';
const LineTwo = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.isIntersecting ? 71 : 0}
    height={props.isIntersecting ? 2 : 0}
    style={{ transitionTimingFunction: 'cubic-bezier(0,.79,.65,.99)', transitionDuration: '250ms' }}
    fill='none'
    className='delay-300 origin-right'
    transform='translate(10, 258)'
  >
    <path stroke='#E4E4E4' strokeOpacity={1} d='M0 1h71' />
  </svg>
);
export default LineTwo;
