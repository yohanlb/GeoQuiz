import { checkAndRefillDailyCOTD } from '@features/daily/server/services/refill-mystery-country-table';
import { getNextCountriesOfTheDay } from '@features/daily/server/db/daily-cotd';
import { NextResponse } from 'next/server';
import { log } from '@logtail/next';

export async function POST(request: Request) {
  try {
    // Verify API key
    const authHeader = request.headers.get('authorization');
    
    // First check if we have an auth header at all
    if (!authHeader) {
      await log.error('Missing authorization header');
      return NextResponse.json(
        { error: 'Unauthorized - Missing authorization header' },
        { status: 401 }
      );
    }

    // Then check if it has the correct format
    if (!authHeader.startsWith('Bearer ')) {
      await log.error('Invalid authorization format - missing Bearer prefix');
      return NextResponse.json(
        { error: 'Unauthorized - Invalid authorization format' },
        { status: 401 }
      );
    }

    // Finally check if the key matches
    const providedKey = authHeader.split('Bearer ')[1];
    const expectedKey = process.env.API_KEY_ADMIN;

    if (!expectedKey) {
      await log.error('API_KEY_ADMIN environment variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (providedKey !== expectedKey) {
      await log.error('Invalid API key provided');
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
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