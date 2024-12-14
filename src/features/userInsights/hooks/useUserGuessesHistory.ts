import { createClient } from '@lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export function useUserGuessesHistoryForCountry(
  userId: User['id'] | null,
  countryId: CountryRecord['id'],
) {
  return useQuery({
    queryKey: ['userGuesses', userId, countryId],
    queryFn: async () => {
      if (!userId) {
        return [];
      }

      const supabase = createClient();
      const { data, error } = await supabase
        .from('user_guesses_history')
        .select('guess_results, question_type_id, country_id, updated_at')
        .match({
          user_id: userId,
          country_id: countryId,
        });

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data as UserGuessHistoryPartial[];
    },
  });
}
