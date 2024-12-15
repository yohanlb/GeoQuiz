'use server';

import { createClient } from '@lib/supabase/server';

interface UpdateCountriesStatsParams {
  countryId: number;
  guessedRight: boolean;
  questionType: string;
}

export async function postCountryStats({
  countryId,
  guessedRight,
  questionType,
}: UpdateCountriesStatsParams) {
  // Skip stats collection in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase.rpc('update_countries_stats', {
    countryid: Number(countryId),
    guessedright: guessedRight,
    _questiontype: questionType,
  });

  if (error) {
    console.error('Error updating country stats:', error);
    return null;
  }

  return data;
}
