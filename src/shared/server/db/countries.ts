import { DISABLED_COUNTRIES } from '@lib/data/consts';
import { createClient } from '@lib/supabase/server';

export async function getAllCountriesIds(
  includeDisabled: boolean = false,
): Promise<CountryRecord['id'][]> {
  const supabase = await createClient();

  let query = supabase.from('countries').select('id');

  if (!includeDisabled && DISABLED_COUNTRIES.length > 0) {
    query = query.not('id', 'in', `(${DISABLED_COUNTRIES.join(',')})`);
  }

  const { data: allCountries, error: countriesError } = await query;

  if (countriesError || !allCountries) {
    throw new Error(
      `Failed to get countries: ${countriesError?.message || 'Not found'}`,
    );
  }

  return allCountries.map((country) => country.id);
}
