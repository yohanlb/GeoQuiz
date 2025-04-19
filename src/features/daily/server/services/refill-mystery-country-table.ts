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
): Promise<{ numberOfInsertedRows: number }> {
  const nextCountries = await getNextCountriesOfTheDay(requiredCount);

  const logString = formatWithFeatureName(
    `Check How many countries available: ${nextCountries.length}, need to refill: ${nextCountries.length < requiredCount}`,
    PROJECT_FEATURES.MysteryCountry,
  );
  log.info(logString);

  // If we don't have enough countries, fill the table
  let insertedRows: DailyCotdRecord[] = [];
  if (nextCountries.length < requiredCount) {
    insertedRows = await refillDailyCOTD(requiredCount - nextCountries.length);
  }
  return { numberOfInsertedRows: insertedRows.length };
}

export async function refillDailyCOTD(
  count: number,
): Promise<DailyCotdRecord[]> {
  const startTime = Date.now();
  const allCountriesIds = await getAllCountriesIds();

  // Filter out recently used countries
  const previousDailyCountryIdsUsed = await getPreviousCountriesOfTheDayIds();
  const usableCountries = allCountriesIds.filter(
    (countryId) => !previousDailyCountryIdsUsed.includes(countryId),
  );

  const shuffledCountries = shuffleArray([...usableCountries]);

  const latestDateInTable = await getLatestDateInTable();

  // Insert new entries
  const insertedRows = [];
  for (let i = 0; i < count; i++) {
    if (i >= shuffledCountries.length) break;

    // Calculate the next date
    const nextDate = new Date(latestDateInTable);
    nextDate.setDate(nextDate.getDate() + i + 1);
    const formattedDate = nextDate.toISOString().split('T')[0];

    // Insert the new COTD
    const newCOTD = await insertDailyCOTD(shuffledCountries[i], formattedDate);
    insertedRows.push(newCOTD);
  }

  const executionTime = Date.now() - startTime;
  const summaryMessage = formatWithFeatureName(
    `Refill completed: Inserted ${insertedRows.length} of ${count} requested rows in ${executionTime}ms`,
    PROJECT_FEATURES.MysteryCountry,
  );
  log.info(summaryMessage);

  return insertedRows;
}
