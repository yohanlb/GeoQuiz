import React from 'react';
import Image from 'next/image';
import GeoQuizLogoExpanded from '@assets/LogoExpanded.svg';

// TODO: not used yet
function Hero() {
  return (
    <div>
      <Image
        src={GeoQuizLogoExpanded}
        alt='GeoQuiz'
        className='mx-auto w-2/3'
      />
    </div>
  );
}

export default Hero;
