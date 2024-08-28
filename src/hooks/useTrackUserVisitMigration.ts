import { STORAGE_KEYS_USER_EVENT } from '@/src/hooks/useTrackUserVisit';

const OLD_KEYS = {
  lastVisit: 'u_lv',
  firstVisit: 'u_fv',
};

// Migrate old keys to new keys
// This is necessary because the old keys were stored as numbers and not as ISO strings
// Later on, we can just discard the old keys and rely on the new keys
export const migrateOldKeys = () => {
  Object.entries(OLD_KEYS).forEach(([key, value]) => {
    const dateStr = localStorage.getItem(value);

    if (dateStr) {
      const parsedDate = new Date(Number(dateStr));
      if (!isNaN(parsedDate.getTime())) {
        // Ensure the parsed date is valid
        const newKey =
          STORAGE_KEYS_USER_EVENT[key as keyof typeof STORAGE_KEYS_USER_EVENT];
        localStorage.setItem(newKey, parsedDate.toISOString());
        localStorage.removeItem(value);
      }
    }
  });
};
