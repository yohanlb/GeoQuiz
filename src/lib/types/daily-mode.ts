export type DailyQuestionType = 'capital' | 'region' | 'flag' | 'shape';

export type DailyQuestion = {
  questionId: number;
  countryId: number;
  countryName: string;
  capitalOptions: string[];
  capitalCorrectIndex: number;
  regionOptions: string[];
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
