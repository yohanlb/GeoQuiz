import { checkAndRefillDailyCOTD } from '@features/daily/server/services/refill-mystery-country-table';
import { getNextCountriesOfTheDay } from '@features/daily/server/db/daily-cotd';
import { NextResponse } from 'next/server';
import { log } from '@logtail/next';

export async function POST(request: Request) {
  try {
    // Verify API key
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ') || 
        authHeader.split('Bearer ')[1] !== process.env.API_KEY_ADMIN) {
      await log.error('Unauthorized refill attempt', {
        hasAuthHeader: !!authHeader,
        authHeaderPrefix: authHeader?.startsWith('Bearer '),
      });
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if we have enough entries and refill if needed
    const { numberOfInsertedRows } = await checkAndRefillDailyCOTD(7); // Ensure we have at least 7 days of entries

    // Get the updated list of upcoming entries
    const upcomingEntries = await getNextCountriesOfTheDay(7);
    const nextAvailableDate = upcomingEntries[0]?.date;
    const latestAvailableDate = upcomingEntries[upcomingEntries.length - 1]?.date;

    await log.info('Successfully refilled mystery country entries', {
      availableDays: upcomingEntries.length,
      nextAvailableDate,
      latestAvailableDate,
      insertedRows: numberOfInsertedRows,
    });

    return NextResponse.json({
      success: true,
      availableDays: upcomingEntries.length,
      nextAvailableDate,
      latestAvailableDate,
      insertedRows: numberOfInsertedRows,
      message: `Successfully ensured ${upcomingEntries.length} days of mystery countries are available${numberOfInsertedRows > 0 ? ` (added ${numberOfInsertedRows} new entries)` : ''}`
    });
  } catch (error) {
    await log.error('Error refilling mystery country', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: 'Failed to refill mystery country' },
      { status: 500 }
    );
  }
} 