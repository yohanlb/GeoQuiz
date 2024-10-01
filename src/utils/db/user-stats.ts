import { createClient } from '@lib/supabase/server';

export async function fetchUserStats(
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
    console.error('Error fetching existing user stats:', error);
    throw error;
  }

  return data;
}

export async function upsertUserStats(
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
    console.error('Error updating user stats:', error);
    throw error;
  }

  return data;
}
