export {};

declare global {
  type GameState = 'notStarted' | 'playing' | 'finished';

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
