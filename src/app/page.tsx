'use client';

import React from 'react';
import LandingContent from '@features/welcome/components/landing/LandingContent';
import { UserContext } from '@lib/contexts/UserProvider';
import { navigationLinks } from '@lib/data/navigation-links';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const { user } = React.useContext(UserContext);
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.replace(navigationLinks.home.href);
    }
  }, [user, router]);

  return <LandingContent />;
};

export default LandingPage;
