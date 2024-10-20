import React from 'react';
import { navigationLinks } from '@data/navigationLinks';
import LandingContent from '@features/welcome/components/landing/LandingContent';
import { createClient } from '@lib/supabase/server';
import { redirect } from 'next/navigation';

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
