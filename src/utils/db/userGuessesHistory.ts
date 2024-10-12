import { createClient } from '@lib/supabase/server';
import { Database } from '@lib/types/database.types';

type UserGuessesHistoryRow =
  Database['public']['Tables']['user_guesses_history']['Row'];
type CountriesCompleteViewRow =
  Database['public']['Views']['countries_complete_view']['Row'];

export type UserGuessesHistoryWithCountryData = Pick<
  UserGuessesHistoryRow,
  'guess_results' | 'question_type_id' | 'country_id' | 'updated_at'
> & {
  countries_complete_view: Pick<
    CountriesCompleteViewRow,
    | 'id'
    | 'name'
    | 'iso2'
    | 'capital'
    | 'success_rate_capital'
    | 'success_rate_flag'
  >;
};

export type UserGuessesHistory = {
  guess_results: boolean[];
  country_id: CountryData['id'];
  question_type_id: number;
};

export async function fetchUserGuessesHistory(
  userId: string,
  countryId: number,
  questionTypeId: number,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('user_guesses_history')
    .select('guess_results')
    .match({
      user_id: userId,
      country_id: countryId,
      question_type_id: questionTypeId,
    })
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching existing user guesses history:', error);
    throw error;
  }

  return data;
}

export async function fetchUserGuessesHistoryByCountry(
  userId: string,
  countryId: number,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('user_guesses_history')
    .select('guess_results, question_type_id, country_id, updated_at')
    .match({
      user_id: userId,
      country_id: countryId,
    });

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching existing user guesses history:', error);
    throw error;
  }

  return data as UserGuessesHistory[];
}

export async function fetchAllUserGuessesHistory(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('user_guesses_history')
    .select('guess_results, country_id, question_type_id, updated_at')
    .match({
      user_id: userId,
    });

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching existing user guesses history:', error);
    throw error;
  }

  return data as UserGuessesHistory[];
}

export async function fetchLastUserGuessesHistoryWithCountryData(
  userId: string,
  amount: number,
): Promise<UserGuessesHistoryWithCountryData[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('user_guesses_history')
    .select(
      `
      guess_results,
      question_type_id,
      country_id,
      updated_at,
      countries_complete_view(
        id,
        name,
        iso2,
        capital,
        success_rate_capital,
        success_rate_flag
      )
    `,
    )
    .match({
      user_id: userId,
    })
    .order('updated_at', { ascending: false })
    .limit(amount);

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching last user guesses:', error);
    throw error;
  }

  // Had a supabase bug, typescript inferred the type as array instead of object
  const adjustedData = (data ?? []).map((item) => {
    const countryData = Array.isArray(item.countries_complete_view)
      ? item.countries_complete_view[0]
      : item.countries_complete_view;

    return {
      guess_results: item.guess_results,
      question_type_id: item.question_type_id,
      country_id: item.country_id,
      updated_at: item.updated_at,
      countries_complete_view: countryData,
    } as UserGuessesHistoryWithCountryData;
  });

  return adjustedData;
}

export async function upsertUserGuessesHistory(
  userId: string,
  countryId: number,
  questionTypeId: number,
  guessResults: boolean[],
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('user_guesses_history')
    .upsert(
      {
        user_id: userId,
        country_id: countryId,
        question_type_id: questionTypeId,
        guess_results: guessResults,
        updated_at: new Date(),
      },
      { onConflict: 'user_id,country_id,question_type_id' },
    )
    .select();

  if (error) {
    console.error('Error updating user guesses history:', error);
    throw error;
  }

  return data;
}
