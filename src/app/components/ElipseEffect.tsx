import React from 'react';
import { imageClassNames } from '../staticData/imageClassNames';
import Image from 'next/image';
import elipseOne from '../img/Ellipse 20.png';

const ElipseEffect = () => {
  return (
    <>
      {imageClassNames.map((className, index) => (
        <Image key={index} src={elipseOne} alt={`elipse-${index}`} width={240} height={240} className={className} />
      ))}
    </>
  );
};

export default ElipseEffect;
