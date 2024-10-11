import { createClient } from '@lib/supabase/server';

export async function getCountriesByName(countryName: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .eq(
      'name',
      countryName.charAt(0).toUpperCase() + countryName.slice(1).toLowerCase(),
    )
    .single();

  console.log(data, error);

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user countries by name:', error);
    throw error;
  }

  return data as CountryData;
}

export async function getAllCountries() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .order('name');

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user countries:', error);
    throw error;
  }

  return data as CountryData[];
}

export async function getCountriesById(countryIds: number[]) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .in('id', countryIds);

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user countries by id:', error);
    throw error;
  }

  return data as CountryData[];
}
