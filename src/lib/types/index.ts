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
  };

  type GameDeck = {
    name: string;
    available: boolean;
    visible: boolean;
    displayName: string;
    description: string;
    countryIds: number[];
  };

  export type Question = {
    questionType: 'CountryToCapital' | 'CapitalToCountry';
    countryData: CountryData;
    answerOptions: string[];
    answer: string;
  };

  export type UserResultsStatus = 'default' | 'valid' | 'invalid';

  export type UserResults = UserResultsStatus[];

  export type CountryStatsResponse = {
    country_id: CountryData['id'];
    guessed: number;
    guessed_right: number;
  }[];
}
