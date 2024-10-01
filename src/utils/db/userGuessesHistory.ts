import { createClient } from '@lib/supabase/server';

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
