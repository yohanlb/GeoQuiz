import { useEffect, useState } from 'react';
import { createClient } from '@lib/supabase/client';

type Props = {
  countryIds: CountryData['id'][];
};

const useFetchUserCountryGuesses = ({ countryIds }: Props) => {
  const [userGuesses, setUserGuesses] = useState<
    UserGuessHistoryRecord[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: statsError } = await supabase
          .from('user_guesses_history')
          .select('*')
          .filter('country_id', 'in', `(${countryIds.join(',')})`);

        if (statsError) {
          throw statsError;
        }

        setUserGuesses(data as UserGuessHistoryRecord[]);
      } catch (err) {
        setError(err as Error);
        setUserGuesses(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [countryIds, supabase]);

  return { userGuesses, loading, error };
};

export default useFetchUserCountryGuesses;
