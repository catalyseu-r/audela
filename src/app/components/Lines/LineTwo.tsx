import * as React from 'react';
const LineTwo = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.isIntersecting ? 71 : 0}
    height={props.isIntersecting ? 2 : 0}
    fill='none'
    className='transition-all duration-200 delay-300 origin-right ease-in-out'
    transform='translate(10, 258)'
  >
    <path stroke='#E4E4E4' strokeOpacity={1} d='M0 1h71' />
  </svg>
);
export default LineTwo;
