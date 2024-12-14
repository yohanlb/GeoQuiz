import React from 'react';
import { navigationLinks } from '@lib/data/navigation-links';
import Link from 'next/link';
import SectionTitle from '@components/global/SectionTitle';

function page() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 text-center'>
      <SectionTitle variant={'h2'} text='Resources and links'></SectionTitle>
      <p>
        Here are some resources and links to help you learn about the world.
      </p>
      <ul className='flex flex-col gap-2'>
        <li className='text-blue-500 underline'>
          <Link href={`${navigationLinks.resources.href}/what-is-capital-of`}>
            What is the capital of ...?
          </Link>
        </li>
        <li className='text-blue-500 underline'>
          <Link href={`${navigationLinks.resources.href}/what-is-flag-of`}>
            What is the flag of ...?
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default page;
