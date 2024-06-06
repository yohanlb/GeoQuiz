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
    success_rate: number;
    updated_at: string;
    sovereignCountry?: string;
  };

  type Deck = {
    id: number;
    name: string;
    description: string | null;
    countryIds: number[];
    isDynamic: boolean;
    isAvailable: boolean;
    averageSuccessRatio: number;
    categories: string[] | null;
    displayName: string;
    isTextTransparent: boolean;
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

  export type UserResultsStatus = 'default' | 'valid' | 'invalid';

  export type UserResults = UserResultsStatus[];

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
    countryId: Deck['id'];
  }

  export type CountryWithScores = CountryData & CountryGuessHistory;

  export type GroupedCountries = {
    [key: string]: { [subregion: string]: CountryData[] };
  };
}
