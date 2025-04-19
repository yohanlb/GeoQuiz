# Mystery Country Question Generation Documentation

## Overview
The Mystery Country feature generates daily questions about a specific country, including its capital, region, flag, and shape. It uses Server-Side Rendering (SSR) with dynamic data fetching.

## Architecture & Rendering
- **Page Type**: Server Component (Next.js)
- **Rendering Strategy**: SSR with `dynamic = 'force-dynamic'` to ensure fresh data
- **Caching**: No caching to ensure daily questions are always up-to-date
- **Data Flow**: 
  1. Server fetches question data during page load
  2. Client receives pre-rendered page with question data
  3. Client-side interactions handle user answers and scoring

## Question Generation Process
1. **Database Fetch**:
   - Fetches country of the day from `daily_cotd` table
   - Retrieves country details from `countries` table
   - Gets closest countries for generating options
2. **Question Assembly**:
   - Generates multiple-choice questions for:
     - Capital city
     - Region/continent
     - Flag
     - Country shape
3. **Data Processing**:
   - Filters out disabled countries
   - Shuffles options for randomization
   - Calculates correct answer indices

## Key Components
- **Main Function**: `generateCountryOfTheDayQuestion` in `src/features/daily/server/services/prepare-mystery-country-question.ts`
- **Data Sources**:
  - `daily_cotd` table for country assignments
  - `countries` table for country data
  - `countries_stats` for country statistics
- **Client Components**:
  - `CotdPageContent`: Renders questions and handles user interactions
  - `ShareMysteryCountryResultsButton`: Handles social sharing

## Question Structure
Each question includes:
- 4 options (1 correct, 3 incorrect)
- Correct answer index
- Country name and ID
- Question ID for tracking