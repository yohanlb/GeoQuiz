'use client';

import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';

export default function useTrackUserVisit() {
  const posthog = usePostHog();

  useEffect(() => {
    const now = new Date().getTime();
    const visitThreshold = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

    let visitCount = parseInt(localStorage.getItem('u_vc') || '0');
    const lastVisit = localStorage.getItem('u_lv');
    let firstVisit = localStorage.getItem('u_fv');

    // If firstVisit doesn't exist, set it
    if (!firstVisit) {
      firstVisit = now.toString();
      localStorage.setItem('u_fv', firstVisit);
    }

    // If lastVisit doesn't exist or the threshold has passed, increment the visit count
    if (!lastVisit || now - parseInt(lastVisit) > visitThreshold) {
      visitCount += 1;
      localStorage.setItem('u_vc', visitCount.toString());
      localStorage.setItem('u_lv', now.toString());
    }

    const visitData = {
      visitCount,
      firstVisit: new Date(parseInt(firstVisit)).toISOString(),
      lastVisit: lastVisit ? new Date(parseInt(lastVisit)).toISOString() : null,
    };

    const isNewUser = visitCount <= 1;

    if (posthog) {
      posthog.people.set({
        visit_count: visitData.visitCount,
        first_visit: visitData.firstVisit,
        last_visit: visitData.lastVisit,
        is_new_user: isNewUser,
      });

      posthog.capture('user_visit', {
        visit_count: visitData.visitCount,
        first_visit: visitData.firstVisit,
        last_visit: visitData.lastVisit,
        is_new_user: isNewUser,
      });
    }
  }, [posthog]);

  return null;
}
