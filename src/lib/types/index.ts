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
    countryData: CountryCompleteViewRecord;
    optionsCapitals: CountryCompleteViewRecord['capital'][];
    optionsIso2: CountryCompleteViewRecord['iso2'][];
    answerCapital: CountryCompleteViewRecord['capital'];
    answerIso2: CountryCompleteViewRecord['iso2'];
  };

  export type CountryScoreHistory = { [key: CountryRecord['id']]: boolean[] };

  export type UserResultsStatus = 'default' | 'valid' | 'invalid';

  export type UserCountryResult = {
    countryId: CountryRecord['id'];
    result: UserResultsStatus;
    questionIndex: number; // Could remove this field later.
  };

  export type CountryStatsResponse = {
    country_id: CountryRecord['id'];
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
    countryId: CountryRecord['id'];
  }

  export type CountryWithScores = CountryCompleteViewRecord &
    CountryGuessHistory;

  export type GroupedCountries = {
    [key: string]: { [subregion: string]: CountryCompleteViewRecord[] };
  };

  export type AnsweredQuestion = {
    questionId: number;
    countryData: CountryCompleteViewRecord;
    questionType: QuestionType;
    answer: string;
    isCorrect: boolean;
  };
}
