'use client';

import React from 'react';
import { FEATURES_DATA, FeatureData } from '@lib/featuresDescription';

type FeatureCardProps = {
  featureData: FeatureData;
  flexBasis?: 'basis-3/5' | 'basis-2/5';
};

const FeatureCard = ({
  featureData,
  flexBasis = 'basis-3/5',
}: FeatureCardProps) => {
  return (
    <div
      className={`flex ${flexBasis} flex-col justify-between rounded-lg border border-gray-700 p-4`}
    >
      <div className='flex flex-col gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-800'>
          <span className='text-2xl font-extrabold'>{featureData.number}</span>
        </div>
        <h3 className='font-bold text-accent'>{featureData.title}</h3>
      </div>
      <p>{featureData.description}</p>
    </div>
  );
};

export function Features() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex w-full flex-col gap-6 md:flex-row'>
        <FeatureCard featureData={FEATURES_DATA[0]} />
        <FeatureCard featureData={FEATURES_DATA[1]} flexBasis='basis-2/5' />
      </div>
      <div className='flex w-full flex-col gap-6 md:flex-row'>
        <FeatureCard featureData={FEATURES_DATA[2]} flexBasis='basis-2/5' />
        <FeatureCard featureData={FEATURES_DATA[3]} />
      </div>
    </div>
  );
}
