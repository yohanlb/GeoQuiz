import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import Link from 'next/link';
import SectionTitle from '@components/_commons/SectionTitle';

function page() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 text-center'>
      <SectionTitle variant={'h2'} text='Resources and links'></SectionTitle>
      <p>
        Here are some resources and links to help you learn about the world.
      </p>
      <ul>
        <li className='text-blue-500 underline'>
          <Link href={`${navigationLinks.resources.href}/what-is-capital-of`}>
            What is the capital of ...?
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default page;
