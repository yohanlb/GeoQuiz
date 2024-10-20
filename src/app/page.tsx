import React from 'react';
import { navigationLinks } from '@data/navigationLinks';
import { createClient } from '@lib/supabase/server';
import { redirect } from 'next/navigation';
import LandingContent from '@components/landing/LandingContent';

const LandingPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(navigationLinks.home.href);
  }
  return <LandingContent />;
};

export default LandingPage;
