import { getFormattedDateOfDayN } from '@features/daily/server/services/utils';

const ONE_HOUR = 3600;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export async function getCountryOfTheDay(dayOffset: number) {
  const date = getFormattedDateOfDayN(dayOffset);
  
  const response = await fetch(
    `${supabaseUrl}/rest/v1/daily_cotd?date=eq.${date}&select=*`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      next: { revalidate: ONE_HOUR },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to get country of the day: ${response.statusText}`);
  }

  const data = await response.json();
  return data[0] as DailyCotdRecord;
}
