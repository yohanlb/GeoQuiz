'use client';
import Link from 'next/link';
import React from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{`Error: "${error.message}"`}</p>
      <Link href='/' className='underline'>
        Try another deck !
      </Link>
    </div>
  );
}
