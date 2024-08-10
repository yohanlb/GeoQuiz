'use client';

import React from 'react';
import InlineSVG from 'react-inlinesvg';
import { COUNTRIES_NOT_AVAILABLE } from '@lib/consts';
import { Skeleton } from '@components/ui/skeleton';

//TODO: remove this file and use CountryShape instead
// Created to have a smaller version of the CountryShape component

type Props = {
  countryCode: string;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
};

function CountryShapeSmall({
  countryCode,
  fillColor = 'none',
  strokeColor = 'white',
  strokeWidth = 10,
}: Props) {
  const isAvailable = !COUNTRIES_NOT_AVAILABLE.includes(countryCode);

  if (isAvailable) {
    return (
      <div className='mx-auto h-16 w-16 md:h-16 md:w-16'>
        <InlineSVG
          src={`/CountryShapes/${countryCode}.svg`}
          preProcessor={(code: string) =>
            code.replace(
              'fill="none" stroke="white" stroke-width="1"',
              `fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"`,
            )
          }
          height='100%'
          width='100%'
          title='Country shape'
          loader={<Skeleton className='h-16 w-16 rounded-xl md:h-16 md:w-16' />}
        />
      </div>
    );
  }
  return null;
}

export default CountryShapeSmall;
