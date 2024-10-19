import { DECK_CARDS_GRADIENTS } from '@lib/consts';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

export function shuffleArray<T>(array: T[]): T[] {
  // Create a copy of the array to avoid mutating the original one
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

export const getRandomCardGradient = () => {
  const gradient1 =
    DECK_CARDS_GRADIENTS[
      Math.floor(Math.random() * DECK_CARDS_GRADIENTS.length)
    ];
  const gradient2 =
    DECK_CARDS_GRADIENTS[
      Math.floor(Math.random() * DECK_CARDS_GRADIENTS.length)
    ];
  return `${gradient1}, ${gradient2}`;
};

export const QUESTION_TYPES: Record<
  number,
  { name: string; displayName: string }
> = {
  1: { name: 'CountryToCapital', displayName: 'Guess the Capital' },
  2: { name: 'CountryToFlag', displayName: 'Guess the Flag' },
};

export const questionTypeIdToQuestionTypeDisplayName = (
  questionTypeId: Question['questionTypeId'] = 1,
) => {
  return QUESTION_TYPES[questionTypeId].displayName;
};

export const questionTypeToQuestionTypeId = (questionType: string) => {
  return Object.keys(QUESTION_TYPES).find(
    (key) => QUESTION_TYPES[Number(key)].name === questionType,
  );
};
