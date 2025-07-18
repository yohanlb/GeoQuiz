# Mystery Country Refill Documentation

## Overview
The Mystery Country feature is a daily challenge where users guess a new country each day. This system automatically ensures there are always enough future countries available.

## API Endpoint
- **Route**: `/api/mystery-country/refill`
- **Method**: POST
- **Authentication**: Admin API key required

## How It Works
1. Checks available future mystery countries
2. If below 7 days, refills the database
3. Selects new countries (avoiding recent ones)
4. Assigns them to future dates

## Key Components
- **Refill Service**: `checkAndRefillDailyCOTD` function in `src/features/daily/server/services/refill-mystery-country-table.ts`
- **Database**: Uses `daily_cotd` table to store country assignments
- **Selection**: Randomizes country selection while avoiding recent usage

## Automation
- Runs daily at midnight UTC via GitHub Actions
- Can be triggered manually
- Uses secure API key authentication

## Monitoring
- Logs available days, dates, and inserted rows
- Tracks errors and refill status
- Uses Logtail for logging