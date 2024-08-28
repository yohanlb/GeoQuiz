'use client';

import { useEffect } from 'react';
import { migrateOldKeys } from '@/src/hooks/useTrackUserVisitMigration';
import { usePostHog } from 'posthog-js/react';

export const STORAGE_KEYS_USER_EVENT = {
  visitCount: 'u_vc',
  lastVisit: 'u_lv_iso',
  firstVisit: 'u_fv_iso',
};

export default function useTrackUserVisit() {
  const posthog = usePostHog();

  useEffect(() => {
    const now = new Date();
    const visitThresholdDuration = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

    migrateOldKeys();

    let visitCount = parseInt(
      localStorage.getItem(STORAGE_KEYS_USER_EVENT.visitCount) ?? '0',
    );

    const lastVisitStr = localStorage.getItem(
      STORAGE_KEYS_USER_EVENT.lastVisit,
    );
    const firstVisitStr = localStorage.getItem(
      STORAGE_KEYS_USER_EVENT.firstVisit,
    );

    const lastVisitDate = lastVisitStr ? new Date(lastVisitStr) : null;
    let firstVisitDate = firstVisitStr ? new Date(firstVisitStr) : null;

    // If firstVisitDate doesn't exist, set it
    if (!firstVisitDate) {
      firstVisitDate = now;
      localStorage.setItem(
        STORAGE_KEYS_USER_EVENT.firstVisit,
        firstVisitDate.toISOString(),
      );
    }

    const isPastThreshold =
      !lastVisitDate ||
      now.getTime() - lastVisitDate.getTime() > visitThresholdDuration;

    // If lastVisit doesn't exist or the threshold has passed, increment the visit count
    if (isPastThreshold) {
      visitCount += 1;
      localStorage.setItem(
        STORAGE_KEYS_USER_EVENT.visitCount,
        visitCount.toString(),
      );
      localStorage.setItem(
        STORAGE_KEYS_USER_EVENT.lastVisit,
        now.toISOString(),
      );
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
