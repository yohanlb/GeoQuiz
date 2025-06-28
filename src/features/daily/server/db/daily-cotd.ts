import { getFormattedDateOfDayN } from '@features/daily/server/services/utils';
import { createAdminClient, createClient } from '@lib/supabase/server';

export async function getCountryOfTheDay(dayOffset: number) {
  const supabase = await createClient();
  const date = getFormattedDateOfDayN(dayOffset);

  const { data, error } = await supabase
    .from('daily_cotd')
    .select('*')
    .eq('date', date)
    .single();

  if (error) {
    console.error('Error fetching country of the day:', error.message);
    throw new Error(`Failed to get country of the day: ${error.message}`);
  }

  return data as DailyCotdRecord;
}

// Get the next N countries of the day starting from today
export async function getNextCountriesOfTheDay(count: number) {
  const supabase = await createClient();
  const today = getFormattedDateOfDayN(0);

  const { data, error: countError } = await supabase
    .from('daily_cotd')
    .select('*')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(count);

  if (countError) {
    console.error('Error checking daily_cotd count:', countError.message);
    throw new Error(`Failed to check daily_cotd count: ${countError.message}`);
  }

  return data as DailyCotdRecord[];
}

// Get the latest date in the table or today's if no entries exist
export async function getLatestDateInTable() {
  const supabase = await createClient();
  const { data: lastEntry, error: lastError } = await supabase
    .from('daily_cotd')
    .select('date')
    .order('date', { ascending: false })
    .limit(1)
    .single();

  if (lastError && lastError.code !== 'PGRST116') {
    // PGRST116 is "no rows returned"
    throw new Error(`Failed to get last entry: ${lastError.message}`);
  }

  let lastDate: Date;
  if (lastEntry?.date) {
    lastDate = new Date(lastEntry.date);
  } else {
    lastDate = new Date(); // If no entries exist, start from today
  }

  return lastDate;
}

export async function getPreviousCountriesOfTheDayIds(
  count: number = 50,
): Promise<DailyCotdRecord['countryId'][]> {
  const supabase = await createClient();

  const { data: recentCountries, error } = await supabase
    .from('daily_cotd')
    .select('"countryId"')
    .order('date', { ascending: false })
    .limit(count);

  if (error) {
    throw new Error(`Failed to get recent countries: ${error.message}`);
  }

  return recentCountries?.map((c: { countryId: number }) => c.countryId) || [];
}

export async function insertDailyCOTD(
  countryId: DailyCotdRecord['countryId'],
  date: DailyCotdRecord['date'],
): Promise<DailyCotdRecord> {
  const supabase = await createAdminClient();

  console.log('insertDailyCOTD', countryId, date);

  const { error, data: newCOTD } = await supabase
    .from('daily_cotd')
    .insert({
      countryId,
      date,
      is_display_validated: false,
      times_played: 0,
      times_completed: 0,
      right_answers: 0,
      wrong_answers: 0,
    })
    .select();

  if (error) {
    throw new Error(`Failed to insert new COTD: ${error.message}`);
  }
  return newCOTD[0];
}

export async function updateDailyCOTD(
  questionId: number,
  newTimesPlayed: number,
  newTimesCompleted: number,
  newRightAnswers: number,
  newWrongAnswers: number,
  newAverageScore: number,
) {
  const supabase = await createAdminClient();

  const { error } = await supabase
    .from('daily_cotd')
    .update({
      times_played: newTimesPlayed,
      times_completed: newTimesCompleted,
      right_answers: newRightAnswers,
      wrong_answers: newWrongAnswers,
      average_score: newAverageScore,
    })
    .eq('id', questionId);

  if (error) {
    throw new Error(`Failed to update Daily COTD: ${error.message}`);
  }

  return { success: true };
}
