'use server';

import { createClient } from '@lib/supabase/server';

export async function postCountryStats({
  countryId,
  guessedRight,
  questionType,
}: UpdateCountriesStatsParams) {
  const supabase = createClient();

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
