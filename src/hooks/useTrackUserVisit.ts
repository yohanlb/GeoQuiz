'use client';

import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';

export default function useTrackUserVisit() {
  const posthog = usePostHog();

  useEffect(() => {
    const now = new Date();
    const visitThresholdDuration = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

    let visitCount = parseInt(localStorage.getItem('u_vc') || '0');

    const lastVisitDateStr = localStorage.getItem('u_lv');
    const lastVisitDate = lastVisitDateStr ? new Date(lastVisitDateStr) : null;
    const firstVisitDateStr = localStorage.getItem('u_fv');
    let firstVisitDate = firstVisitDateStr ? new Date(firstVisitDateStr) : null;
    if (!firstVisitDate) {
      firstVisitDate = now;
      localStorage.setItem('u_fv', firstVisitDate.toISOString());
    }

    const isPastThreshold =
      !lastVisitDate ||
      now.getTime() - lastVisitDate.getTime() > visitThresholdDuration;

    // If lastVisit doesn't exist or the threshold has passed, increment the visit count
    if (isPastThreshold) {
      visitCount += 1;
      localStorage.setItem('u_vc', visitCount.toString());
      localStorage.setItem('u_lv', now.toISOString());
    }

    const visitData = {
      visitCount,
      firstVisit: firstVisitDate,
      lastVisit: lastVisitDate,
    };

    const isNewUser = visitCount <= 1;

    if (posthog) {
      posthog.people.set({
        visit_count: visitData.visitCount,
        first_visit: visitData.firstVisit.toISOString(),
        last_visit: visitData.lastVisit
          ? visitData.lastVisit.toISOString()
          : null,
        is_new_user: isNewUser,
      });

      posthog.capture('user_visit', {
        visit_count: visitData.visitCount,
        first_visit: visitData.firstVisit.toISOString(),
        last_visit: visitData.lastVisit
          ? visitData.lastVisit.toISOString()
          : null,
        is_new_user: isNewUser,
      });
    }
  }, [posthog]);

  return null;
}
