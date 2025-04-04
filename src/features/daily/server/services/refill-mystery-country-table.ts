import {
  getLatestDateInTable,
  getNextCountriesOfTheDay,
  getPreviousCountriesOfTheDayIds,
  insertDailyCOTD,
} from '@features/daily/server/db/daily-cotd';
import { PROJECT_FEATURES } from '@lib/data/consts';
import { formatWithFeatureName } from '@lib/logging/logging-server-actions';
import { log } from '@logtail/next';
import { getAllCountriesIds } from '@server/db/countries';
import { shuffleArray } from '@utils/utils';

export async function checkAndRefillDailyCOTD(
  requiredCount: number,
): Promise<void> {
  const nextCountries = await getNextCountriesOfTheDay(requiredCount);

  const logString = formatWithFeatureName(
    `Check and fill: Country available: ${nextCountries.length}, refilling: ${nextCountries.length < requiredCount}`,
    PROJECT_FEATURES.MysteryCountry,
  );
  console.log(logString);
  try {
    log.info(logString);
  } catch (error) {
    console.error('Error logging to Logtail:', error);
  }

  // If we don't have enough countries, fill the table
  if (nextCountries.length < requiredCount) {
    await refillDailyCOTD(requiredCount - nextCountries.length);
  }
}

export async function refillDailyCOTD(count: number): Promise<void> {
  const startTime = Date.now();
  const allCountriesIds = await getAllCountriesIds();

  const logString = formatWithFeatureName(
    `Refill DB, Count: ${count}`,
    PROJECT_FEATURES.MysteryCountry,
  );
  console.log(logString);
  try {
    log.info(logString);
  } catch (error) {
    console.error('Error logging to Logtail:', error);
  }

  // Filter out recently used countries
  const previousDailyCountryIdsUsed = await getPreviousCountriesOfTheDayIds();
  const usableCountries = allCountriesIds.filter(
    (countryId) => !previousDailyCountryIdsUsed.includes(countryId),
  );

  const shuffledCountries = shuffleArray([...usableCountries]);

  const latestDateInTable = await getLatestDateInTable();

  // Insert new entries
  const instertedRows = [];
  for (let i = 0; i < count; i++) {
    if (i >= shuffledCountries.length) break;

    // Calculate the next date
    const nextDate = new Date(latestDateInTable);
    nextDate.setDate(nextDate.getDate() + i + 1);
    const formattedDate = nextDate.toISOString().split('T')[0];

    // Insert the new COTD
    const newCOTD = await insertDailyCOTD(shuffledCountries[i], formattedDate);
    instertedRows.push(newCOTD);
  }

  const executionTime = Date.now() - startTime;
  const summaryMessage = formatWithFeatureName(
    `Refill completed: Inserted ${instertedRows.length} of ${count} requested rows in ${executionTime}ms`,
    PROJECT_FEATURES.MysteryCountry,
  );
  console.log(summaryMessage);

  try {
    log.info(summaryMessage);
  } catch (error) {
    console.error('Error logging to Logtail:', error);
  }
}
