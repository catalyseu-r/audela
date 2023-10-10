import * as React from 'react';
const LineThree = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.isIntersecting ? 2 : 0}
    height={props.isIntersecting ? 132 : 0}
    className='transition-all duration-200 delay-500 origin-top-left ease-in-out'
    transform='translate(50,225)'
    fill='none'
  >
    <path stroke='#E4E4E4' strokeOpacity={1} d='M1 0v132' />
  </svg>
);
export default LineThree;
