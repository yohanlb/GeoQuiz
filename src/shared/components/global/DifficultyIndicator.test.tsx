import { expect, test } from '@jest/globals';
import { calculateDifficultyRank } from './DifficultyIndicator';

describe('calculateDifficultyRank', () => {
  const testCases: [number, number][] = [
    [100, 0], // 100% -> difficulty 0
    [96, 0], // 96% -> difficulty 0
    [90, 0], // 90% -> difficulty 0
    [86, 1], // 86% -> difficulty 1
    [80, 1], // 80% -> difficulty 1
    [50, 4], // 50% -> difficulty 4
    [20, 7], // 20% -> difficulty 7
    [0, 9], // 0% -> highest difficulty (9)
    [105, 0], // Should clamp to 0
    [-10, 9], // Should clamp to 9
  ];

  test.each(testCases)(
    'input %p should have difficulty %p',
    (input, expected) => {
      const result = calculateDifficultyRank(input);
      expect(result).toBe(expected);
    },
  );
});
