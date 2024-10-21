import { createClient } from '@lib/supabase/server';

type CountryRecordPartial = Pick<
  CountryCompleteViewRecord,
  | 'id'
  | 'name'
  | 'iso2'
  | 'capital'
  | 'success_rate_capital'
  | 'success_rate_flag'
>;

export type UserGuessHistoryWithCountry = UserGuessHistoryPartial & {
  country: CountryRecordPartial;
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

  return data as UserGuessHistoryPartial[];
}

export async function fetchUserGuessesHistoryByCountryIds(
  countryIds: number[],
  questionTypeId?: Question['questionTypeId'],
) {
  const supabase = createClient();

  const query = supabase
    .from('user_guesses_history')
    .select('*')
    .in('country_id', countryIds);

  if (questionTypeId !== undefined) {
    query.eq('question_type_id', questionTypeId);
  }
  const { data, error } = await query;

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching existing user guesses history:', error);
    throw error;
  }

  return data as UserGuessHistoryRecord[];
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

  return data as UserGuessHistoryPartial[];
}

export async function fetchLastUserGuessesHistoryWithCountryRecord(
  userId: string,
  amount: number,
): Promise<UserGuessHistoryWithCountry[]> {
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
      country: countryData,
    } as UserGuessHistoryWithCountry;
  });

  return adjustedData;
}

export async function upsertUserGuessesHistory(
  userId: UserGuessHistoryRecord['user_id'],
  countryId: UserGuessHistoryRecord['country_id'],
  questionTypeId: UserGuessHistoryRecord['question_type_id'],
  guessResults: UserGuessHistoryRecord['guess_results'],
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
