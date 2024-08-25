'use client';

import { useEffect } from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import Link from 'next/link';
import { Button } from '@components/ui/button';

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className='flex w-full flex-col items-center gap-3'>
      <h1>Oops! Something went wrong.</h1>
      <Link href={navigationLinks.home.href} type='button'>
        <Button variant='secondary' size='lg'>
          Go back to Home
        </Button>
      </Link>
    </div>
  );
}
