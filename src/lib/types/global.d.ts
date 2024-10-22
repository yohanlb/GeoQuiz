import { Database } from '@lib/types/database.types';

declare global {
  // GAME LOGIC TYPES

  export interface CountryGuessHistory {
    scores: boolean;
    timestamp: string; // ISO 8601 formatted date-time string
    countryId: CountryRecord['id'];
  }

  export type CountryWithScores = CountryCompleteViewRecord &
    CountryGuessHistory;

  export type GroupedCountries = {
    [region: string]: { [subregion: string]: CountryRecord[] };
  };

  export type CountryScoreHistory = { [key: CountryRecord['id']]: boolean[] };

  export type CountryWithUserGuesses = {
    country: CountryCompleteViewRecord;
    userGuesses: UserGuessHistoryRecord | null;
  };

  export type QuestionType = 'CountryToCapital' | 'CountryToFlag'; //TODO: get rid of this type

  export type Question = {
    countryData: CountryCompleteViewRecord;
    optionsCapitals: CountryCompleteViewRecord['capital'][];
    optionsIso2: CountryCompleteViewRecord['iso2'][];
    answerCapital: CountryCompleteViewRecord['capital'];
    answerIso2: CountryCompleteViewRecord['iso2'];
    questionTypeId: 1 | 2;
  };

  type GameStatus = 'notStarted' | 'playing' | 'finished';

  export type UserResultsStatus = 'default' | 'valid' | 'invalid';

  // rename "userQuestionResult"?
  export type UserCountryResult = {
    countryId: CountryRecord['id'];
    result: UserResultsStatus;
    questionIndex: number; // Could remove this field later.
  };

  export type AnsweredQuestion = {
    questionId: number;
    countryData: CountryCompleteViewRecord;
    questionType: QuestionType;
    answer: string;
    isCorrect: boolean;
  };
  //*****************************/
  // DATABASE TYPES

  // Aliases for 'countries' table
  type CountryRecord = Database['public']['Tables']['countries']['Row'];
  type CountryInsert = Database['public']['Tables']['countries']['Insert'];
  type CountryUpdate = Database['public']['Tables']['countries']['Update'];

  // Aliases for 'countries_stats' table
  type CountryStatsRecord =
    Database['public']['Tables']['countries_stats']['Row'];
  type CountryStatsInsert =
    Database['public']['Tables']['countries_stats']['Insert'];
  type CountryStatsUpdate =
    Database['public']['Tables']['countries_stats']['Update'];

  // Aliases for 'daily_cotd' table
  type DailyCotdRecord = Database['public']['Tables']['daily_cotd']['Row'];
  type DailyCotdInsert = Database['public']['Tables']['daily_cotd']['Insert'];
  type DailyCotdUpdate = Database['public']['Tables']['daily_cotd']['Update'];

  // Aliases for 'decks' table
  type DeckRecord = Database['public']['Tables']['decks']['Row'];
  type DeckInsert = Database['public']['Tables']['decks']['Insert'];
  type DeckUpdate = Database['public']['Tables']['decks']['Update'];

  // Aliases for 'decks_stats' table
  type DeckStatsRecord = Database['public']['Tables']['decks_stats']['Row'];
  type DeckStatsInsert = Database['public']['Tables']['decks_stats']['Insert'];
  type DeckStatsUpdate = Database['public']['Tables']['decks_stats']['Update'];

  type DeckStatsPrepared = { [questionType: string]: DeckStatsRecord };
  type DeckWithStatsRecord = DeckRecord & {
    decks_stats: DeckStatsPrepared;
  };

  // Aliases for 'logs' table
  type LogRecord = Database['public']['Tables']['logs']['Row'];
  type LogInsert = Database['public']['Tables']['logs']['Insert'];
  type LogUpdate = Database['public']['Tables']['logs']['Update'];

  // Aliases for 'question_types' table
  type QuestionTypeRecord =
    Database['public']['Tables']['question_types']['Row'];
  type QuestionTypeInsert =
    Database['public']['Tables']['question_types']['Insert'];
  type QuestionTypeUpdate =
    Database['public']['Tables']['question_types']['Update'];

  // Aliases for 'test' table
  type TestRecord = Database['public']['Tables']['test']['Row'];
  type TestInsert = Database['public']['Tables']['test']['Insert'];
  type TestUpdate = Database['public']['Tables']['test']['Update'];

  // Aliases for 'user_guesses_history' table
  type UserGuessHistoryRecord =
    Database['public']['Tables']['user_guesses_history']['Row'];
  type UserGuessHistoryPartial = Pick<
    UserGuessHistoryRecord,
    'guess_results' | 'question_type_id' | 'country_id' | 'updated_at'
  >;
  type UserGuessHistoryInsert =
    Database['public']['Tables']['user_guesses_history']['Insert'];
  type UserGuessHistoryUpdate =
    Database['public']['Tables']['user_guesses_history']['Update'];

  // Aliases for 'countries_complete_view' view
  type CountryCompleteViewRecordOriginal =
    Database['public']['Views']['countries_complete_view']['Row'];

  // NOTE: postgress makes the fields nullable by default. We need to make them non-nullable
  type CountryCompleteViewRecord = {
    id: NonNullable<CountryCompleteViewRecord['id']>;
    name: NonNullable<CountryCompleteViewRecordOriginal['name']>;
    capital: NonNullable<CountryCompleteViewRecordOriginal['capital']>;
    region: NonNullable<CountryCompleteViewRecordOriginal['region']>;
    subregion: NonNullable<CountryCompleteViewRecordOriginal['subregion']>;
    iso2: NonNullable<CountryCompleteViewRecordOriginal['iso2']>;
    capital_guessed_count: NonNullable<
      CountryCompleteViewRecordOriginal['capital_guessed_count']
    >;
    flagGuessedCount: NonNullable<
      CountryCompleteViewRecordOriginal['flag_guessed_count']
    >;
    custom_difficulty: NonNullable<
      CountryCompleteViewRecordOriginal['custom_difficulty']
    >;
  } & {
    // Include all other fields from CountryCompleteViewRecordOriginal
    [K in Exclude<
      keyof CountryCompleteViewRecordOriginal,
      | 'id'
      | 'name'
      | 'capital'
      | 'region'
      | 'subregion'
      | 'iso2'
      | 'capital_guessed_count'
      | 'flag_guessed_count'
      | 'custom_difficulty'
    >]: CountryCompleteViewRecordOriginal[K];
  };

  // Aliases for 'view_cotd_with_country_names' view
  type ViewCotdWithCountryRecord =
    Database['public']['Views']['view_cotd_with_country_names']['Row'];

  // Types for Supabase RPC functions
  type UpdateCountriesStatsParams =
    Database['rpc']['update_countries_stats']['Args'];
  type UpdateCountriesStatsReturn = Awaited<ReturnType<UpdateCountriesStats>>;
}
