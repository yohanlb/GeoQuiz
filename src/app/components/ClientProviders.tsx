'use client';

import dynamic from 'next/dynamic';

const PostHogPageView = dynamic(() => import('../PostHogPageView'), {
  ssr: false,
});

const TrackUserVisit = dynamic(() => import('@hooks/useTrackUserVisit'), {
  ssr: false,
});

export default function ClientProviders() {
  return (
    <>
      <PostHogPageView />
      <TrackUserVisit />
    </>
  );
}
