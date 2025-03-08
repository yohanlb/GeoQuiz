import { getFormattedDateOfDayN } from '@features/daily/server/services/utils';
import { createClient } from '@lib/supabase/server';

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
