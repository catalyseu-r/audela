import * as React from 'react';
const LineOne = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    style={{ transitionTimingFunction: 'cubic-bezier(0,.79,.65,.99)', transitionDuration: '250ms' }}
    width={props.isIntersecting ? 2 : 0}
    height={props.isIntersecting ? 132 : 0}
    className='origin-top-left'
    transform='translate(80,260)'
    fill='none'
  >
    <path stroke='#E4E4E4' strokeOpacity={1} d='M1 0v132' />
  </svg>
);
export default LineOne;
