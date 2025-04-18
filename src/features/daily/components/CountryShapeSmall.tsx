'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/src/shared/components/ui/skeleton';
import { MISSING_COUNTRIES_SVGS } from '@lib/data/consts';

//TODO: remove this file and use CountryShape instead
// Created to have a smaller version of the CountryShape component

type Props = {
  countryCode: string;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
};

const InlineSVG = dynamic(() => import('react-inlinesvg'), {
  ssr: false,
  loading: () => <Skeleton className='h-16 w-16 rounded-xl md:h-16 md:w-16' />,
});

function CountryShapeSmall({
  countryCode,
  fillColor = 'none',
  strokeColor = 'white',
  strokeWidth = 10,
}: Props) {
  const isAvailable = !MISSING_COUNTRIES_SVGS.includes(countryCode);

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
        />
      </div>
    );
  }
  return null;
}

export default CountryShapeSmall;
