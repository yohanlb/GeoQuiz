import {
  getLatestDateInTable,
  getNextCountriesOfTheDay,
  getPreviousCountriesOfTheDayIds,
  insertDailyCOTD,
} from '@features/daily/server/db/daily-cotd';
import { Logger } from '@logtail/next';
import { getAllCountriesIds } from '@server/db/countries';
import { shuffleArray } from '@utils/utils';

export async function checkAndRefillDailyCOTD(
  requiredCount: number,
): Promise<void> {
  const nextCountries = await getNextCountriesOfTheDay(requiredCount);

  const logger = new Logger();
  const logString = `Mystery country check and fill: Country available: ${nextCountries.length},
  refilling: ${nextCountries.length < requiredCount}`;
  console.log(logString);
  logger.info(logString);

  // If we don't have enough countries, fill the table
  if (nextCountries.length < requiredCount) {
    await refillDailyCOTD(requiredCount - nextCountries.length);
  }
}

export async function refillDailyCOTD(count: number): Promise<void> {
  const allCountriesIds = await getAllCountriesIds();

  // Filter out recently used countries
  const previousDailyCountryIdsUsed = await getPreviousCountriesOfTheDayIds();
  const usableCountries = allCountriesIds.filter(
    (countryId) => !previousDailyCountryIdsUsed.includes(countryId),
  );

  const shuffledCountries = shuffleArray([...usableCountries]);

  const latestDateInTable = await getLatestDateInTable();

  // Insert new entries
  for (let i = 0; i < count; i++) {
    if (i >= shuffledCountries.length) break;

    // Calculate the next date
    const nextDate = new Date(latestDateInTable);
    nextDate.setDate(nextDate.getDate() + i + 1);
    const formattedDate = nextDate.toISOString().split('T')[0];

    // Insert the new COTD
    const newCOTD = await insertDailyCOTD(shuffledCountries[i], formattedDate);

    const logger = new Logger();
    logger.info(
      `Mystery country: Inserted new COTD: ${newCOTD.countryId}, ${newCOTD.date}`,
    );
  }
}
