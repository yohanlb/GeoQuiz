import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import Link from 'next/link';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import SectionTitle from '@components/_commons/SectionTitle';
import HowItWorksSection from '@components/help/HowItWorksSection';
import { Button } from '@components/ui/button';

const Help = async () => {
  return (
    <div className='flex flex-col gap-6 px-4 py-2 md:px-0 max-w-md mx-auto'>
      {/* <SectionTitle text='Help' /> */}
      <HowItWorksSection />
      <hr />
      <section className='flex flex-col gap-4 '>
        <SectionTitle text='Feedbacks' variant='h3' />
        <SectionTitle
          text='Any issue, feedback or suggestion ?'
          variant='description'
        />
        <Button variant={'outline'} className='w-fit'>
          <Link
            href={'https://forms.gle/YrScov3rJU7dEdWS8'}
            target='_blank'
            rel='noreferrer'
          >
            Feedback Form
          </Link>
        </Button>
      </section>
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default Help;
