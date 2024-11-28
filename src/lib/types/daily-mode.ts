import { CONTINENTS } from '@lib/data/consts';

export type DailyQuestionType = 'capital' | 'region' | 'flag' | 'shape';

export type Continent = (typeof CONTINENTS)[number];

export type DailyQuestion = {
  questionId: number;
  countryId: number;
  countryName: string;
  capitalOptions: string[];
  capitalCorrectIndex: number;
  regionOptions: Continent[];
  regionCorrectIndex: number;
  flagOptions: string[];
  flagCorrectIndex: number;
  shapeOptions: string[];
  shapeCorrectIndex: number;
};

export interface Guesses {
  capital: boolean | null;
  region: boolean | null;
  flag: boolean | null;
  shape: boolean | null;
}

export type DaysHistory = {
  [key: string]: {
    questionId: number;
    rightAnswers: number;
    wrongAnswers: number;
    guesses: Guesses;
  };
};
