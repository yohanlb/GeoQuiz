'use client';

import React from 'react';
import { navigationLinks } from '@lib/data/navigation-links';
import Link from 'next/link';
import SectionTitle from '@components/global/SectionTitle';
import DailyCard from './DailyCard';

const DailyChallengesSection = () => {
  return (
    <section>
      <SectionTitle text='Daily Challenges 🌎' />
      <SectionTitle text='New questions every day!' variant='description' />
      <div className='h-48 py-1'>
        <Link href={navigationLinks.daily.href}>
          <DailyCard />
        </Link>
      </div>
    </section>
  );
};

export default DailyChallengesSection;
