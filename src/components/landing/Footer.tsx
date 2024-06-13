import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='mb-4 mt-16 flex flex-col items-center justify-center gap-4 text-sm text-gray-400'>
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
