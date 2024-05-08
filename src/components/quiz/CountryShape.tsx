'use client';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';
import InlineSVG from 'react-inlinesvg';

type Props = {
  countryCode: string;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
};

const COUNTRIES_NOT_AVAILABLE = ['JE', 'XK'];

function CountryShape({
  countryCode,
  fillColor = 'none',
  strokeColor = 'white',
  strokeWidth = 5,
}: Props) {
  const isAvailable = !COUNTRIES_NOT_AVAILABLE.includes(countryCode);

  if (isAvailable) {
    return (
      <div className='mx-auto h-44 md:h-80'>
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
          loader={<Skeleton className='h-44 w-44 rounded-xl md:h-80 md:w-80' />}
        />
      </div>
    );
  }
  return null;
}

export default CountryShape;
