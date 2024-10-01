export {};

declare global {
  type GameState = 'notStarted' | 'playing' | 'finished';

  type Option = {
    value: string | number;
    text: string;
    status: 'unclicked' | 'wrong' | 'correct';
  };

  type GameParams = {
    length?: number;
    continents: string[];
  };

  type CountryData = {
    capital: string;
    emoji: string;
    guessed: number;
    guessed_right: number;
    id: number;
    iso2: string;
    iso3: string;
    name: string;
    region: string;
    subregion: string;
    updated_at: string;
    sovereignCountry?: string;
    success_rate: number; // TODO to deprecate BD side
    success_rate_capital: number;
    success_rate_flag: number;
    flag_guessed_right: number;
    flag_guessed_count: number;
    capital_guessed_right: number;
    capital_guessed_count: number;
    custom_difficulty: number;
  };

  type DeckStats = {
    id: number;
    deckId: number;
    playCount: number;
    created_at: string;
    updated_at: string;
    averageScore: number;
  };

  interface DeckStatsObject {
    [questionType: string]: DeckStats;
  }

  type Deck = {
    id: number;
    name: string;
    description: string | null;
    countryIds: number[];
    isDynamic: boolean;
    isAvailable: boolean;
    categories: string[] | null;
    displayName: string;
    isTextTransparent: boolean;
    image_name: string;
    decks_stats: DeckStatsObject;
    displayPriority?: number;
  };

  export type QuestionType =
    | 'CountryToCapital'
    | 'CapitalToCountry'
    | 'CountryToFlag'
    | 'FlagToCountry';

  export type Question = {
    countryData: CountryData;
    optionsCapitals: CountryData['capital'][];
    optionsIso2: CountryData['iso2'][];
    answerCapital: CountryData['capital'];
    answerIso2: CountryData['iso2'];
  };

  export type CountryScoreHistory = { [key: CountryData['id']]: boolean[] };

  export type UserResultsStatus = 'default' | 'valid' | 'invalid';

  export type UserCountryResult = {
    countryId: CountryData['id'];
    result: UserResultsStatus;
    questionIndex: number; // Could remove this field later.
  };

  export type CountryStatsResponse = {
    country_id: CountryData['id'];
    guessed: number;
    guessed_right: number;
  }[];

  export type GameType = 'capital' | 'flag';

  export type DeckScores = {
    [key in GameType]: number | undefined;
  };

  export type CountryScores = {
    [key in GameType]: boolean[] | undefined;
  };

  interface CountryScore {
    scores: boolean;
    timestamp: string; // ISO 8601 formatted date-time string
  }

  export interface CountryGuessHistory extends CountryScore {
    countryId: CountryData['id'];
  }

  export type CountryWithScores = CountryData & CountryGuessHistory;

  export type GroupedCountries = {
    [key: string]: { [subregion: string]: CountryData[] };
  };

  export type AnsweredQuestion = {
    questionId: number;
    countryData: CountryData;
    questionType: QuestionType;
    answer: string;
    isCorrect: boolean;
  };
}
