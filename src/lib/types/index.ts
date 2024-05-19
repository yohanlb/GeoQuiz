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

  //Deprecated
  type GameDeck = {
    name: string;
    available: boolean;
    visible: boolean;
    displayName: string;
    description: string;
    countryIds: number[];
  };
  //NEW
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
    displayPriority?: number;
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

  export type GameType = 'capital' | 'flag';

  export type DeckScores = {
    [key in GameType]: number | undefined;
  };

  export type CountryScores = {
    [key in GameType]: boolean[] | undefined;
  };
}
