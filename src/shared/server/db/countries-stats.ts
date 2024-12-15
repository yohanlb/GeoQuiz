import { createClient } from '@lib/supabase/server';

export async function getCountriesStatsByCountryIds(countryIds: number[]) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('countries_stats')
    .select('*')
    .in('country_id', countryIds);

  if (error) {
    console.error('Error fetching countries stats:', error);
    return [];
  }

  return data;
}
