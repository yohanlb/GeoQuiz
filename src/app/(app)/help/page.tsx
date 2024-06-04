import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import Link from 'next/link';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import SectionTitle from '@components/_commons/SectionTitle';
import { Button } from '@components/ui/button';

const Help = async () => {
  return (
    <div className='flex flex-col gap-6 px-4 py-2 md:px-0'>
      <SectionTitle text='Help' />
      <section className='text-center flex flex-col gap-4 items-center'>
        <SectionTitle text='Any issue, feedback or suggestion ?' variant='h3' />
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
