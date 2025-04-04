import React from 'react';
import { Button } from '@/src/shared/components/ui/button';
import {
  FEEDBACK_FORM_LINK,
  navigationLinks,
} from '@lib/data/navigation-links';
import Link from 'next/link';
import PageCenteredLink from '@components/global/PageCenteredLink';
import SectionTitle from '@components/global/SectionTitle';
import HowItWorksSection from './HowItWorksSection';

export const metadata = {
  title: 'Help',
  description: 'Get help with Geo Quiz.',
};

const Help = async () => {
  return (
    <div className='mx-auto flex max-w-md flex-col gap-6 px-4 py-2 md:px-0'>
      <section className='flex flex-col items-center justify-center gap-4 text-center'>
        <SectionTitle text='Feedbacks' variant='h2' />
        <SectionTitle
          text='Any issue, feedback or suggestion ?'
          variant='description'
        />
        <Button variant={'outline'} className='w-fit'>
          <Link href={FEEDBACK_FORM_LINK} target='_blank' rel='noreferrer'>
            Feedback Form
          </Link>
        </Button>
      </section>
      <hr />
      <HowItWorksSection />
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default Help;
