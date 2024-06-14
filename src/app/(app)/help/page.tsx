import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import Link from 'next/link';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import SectionTitle from '@components/_commons/SectionTitle';
import HowItWorksSection from '@components/help/HowItWorksSection';
import Footer from '@components/landing/Footer';
import { Button } from '@components/ui/button';

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
          <Link
            href={'https://forms.gle/YrScov3rJU7dEdWS8'}
            target='_blank'
            rel='noreferrer'
          >
            Feedback Form
          </Link>
        </Button>
      </section>
      <hr />
      <HowItWorksSection />
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
      <Footer />
    </div>
  );
};

export default Help;
