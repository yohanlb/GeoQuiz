'use client';

import React from 'react';
import { FEATURES_DATA } from '@lib/data/features-description';
import { FeatureCard } from './FeatureCard';

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
