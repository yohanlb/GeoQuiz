'use client';

import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const currentPath = usePathname();
  if (
    currentPath.includes(navigationLinks.quiz.href) ||
    currentPath.includes(navigationLinks.results.href)
  ) {
    return null;
  }

  return (
    <div className='mt-4 flex flex-col items-center justify-center gap-4 py-4 text-sm text-gray-400 md:mt-16'>
      <hr className='w-4/5 border-gray-700' />
      <p>
        Entirely brought to you by{' - '}
        <Link
          href='https://yohanlebreton.com'
          target='_blank'
          className='font-bold italic tracking-wider underline underline-offset-2'
        >
          Yohan LB!
        </Link>
      </p>
      <p>
        <Link
          href={'https://forms.gle/YrScov3rJU7dEdWS8'}
          target='_blank'
          rel='noreferrer'
          className='underline underline-offset-2'
        >
          Contact
        </Link>
        {' - '}
        <Link
          href={'https://forms.gle/YrScov3rJU7dEdWS8'}
          target='_blank'
          rel='noreferrer'
          className='underline underline-offset-2'
        >
          Feedbacks
        </Link>
      </p>
    </div>
  );
};

export default Footer;
