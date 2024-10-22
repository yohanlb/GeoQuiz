'use client';

import { useState } from 'react';
// import Link from 'next/link';
import { Alert, AlertDescription } from '@/src/shared/components/ui/alert';
import { Button } from '@/src/shared/components/ui/button';
import { X } from 'lucide-react';

export default function UpdateMessageAlert() {
  const [isVisible, setIsVisible] = useState(true);
  const version = 'v1.1.2';

  if (!isVisible) return null;

  return (
    <Alert className='relative py-2'>
      <AlertDescription className='flex justify-between pr-8 text-sm'>
        <div className='flex flex-col items-start space-y-2'>
          <span className='font-semibold'>
            <strong className='mr-2 text-lg'>🎉</strong>
            <strong>New GeoQuiz Update ({version}): </strong>New Deck
            Progression page!
          </span>
          <p className='text-left text-sm'>
            - Select a deck and you will now see a new &apos;Detailed
            progress&apos; link.
            <br />- Clicking on it will show you a detailed view of your
            progress in the deck, including which countries you have already
            guessed correctly.
          </p>
          {/* <Link
            href='/changelog'
            className='inline-flex items-center text-primary hover:underline'
          >
            View Changelog
            <ExternalLink className='ml-1 h-3 w-3' />
          </Link> */}
        </div>
        <Button
          variant='ghost'
          size='sm'
          className='absolute right-1 top-1 h-6 w-6 rounded-full p-0'
          onClick={() => setIsVisible(false)}
        >
          <X className='h-4 w-4' />
          <span className='sr-only'>Dismiss</span>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
