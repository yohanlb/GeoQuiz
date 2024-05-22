import Link from 'next/link';
import React from 'react';

type Props = {
  href: string;
  label: string;
};

const PageCenteredLink = ({ href, label }: Props) => {
  return (
    <div className='mt-4 w-full text-center text-base md:text-lg'>
      <Link
        href={href}
        className='underline underline-offset-4 hover:text-blue-500'
      >
        {label}
      </Link>
    </div>
  );
};

export default PageCenteredLink;
