import React from 'react';

/**
 * This hook simulates a fake loading state for a given duration.
 * If isLoading is provided and true, it sets the fake loading state to true.
 * Then, it sets the fake loading state back to false after the specified delay.
 * If isLoading is not provided or false, the hook acts as a normal delay.
 *
 * @param delay - The duration in milliseconds for which the fake loading state should be active.
 * @param isLoading - Optional boolean indicating if the actual loading is in progress.
 * @returns A boolean indicating if the fake loading state is active.
 */
export default function useFakeLoading(delay: number, isLoading?: boolean) {
  const [isFakeLoading, setIsFakeLoading] = React.useState(false);

  React.useEffect(() => {
    if (isLoading) {
      setIsFakeLoading(true);
    }
    const timer = setTimeout(() => {
      setIsFakeLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return isFakeLoading;
}
