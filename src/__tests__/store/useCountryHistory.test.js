import { useCountryHistory } from '@/src/stores/countryHistoryStore';
import useGameStore from '@/src/stores/gameStore';
import { AVAILABLE_QUESTION_TYPES } from '@lib/consts';
import { act, renderHook } from '@testing-library/react';

jest.mock('@/src/stores/gameStore');

const mockGameStore = useGameStore;

const testQuestionType = AVAILABLE_QUESTION_TYPES[0];

describe('useCountryHistory', () => {
  beforeEach(() => {
    mockGameStore.getState = jest
      .fn()
      .mockReturnValue({ questionType: testQuestionType });
  });

  const addScores = (hookResult, scores) => {
    act(() => {
      scores.forEach(([countryId, score]) => {
        hookResult.current.addCountryScores(countryId, score);
      });
    });
  };

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCountryHistory());
    expect(result.current.countryResultsData).toBeTruthy();
    expect(result.current.countryResultsData.history_per_country).toBeTruthy();
    expect(result.current.countryResultsData.user_history).toBeTruthy();
  });

  it('should add country history_per_country and user_history', () => {
    const { result } = renderHook(() => useCountryHistory());
    const countryId = 1;
    const score = true;

    act(() => {
      result.current.addCountryScores(countryId, score);
    });

    expect(
      result.current.countryResultsData.history_per_country[testQuestionType][
        countryId
      ],
    ).toHaveLength(1);
    expect(
      result.current.countryResultsData.history_per_country[testQuestionType][
        countryId
      ][0].scores,
    ).toBe(score);
    expect(
      result.current.countryResultsData.user_history[testQuestionType][0]
        .countryId,
    ).toBe(countryId);
    expect(
      result.current.countryResultsData.user_history[testQuestionType][0]
        .scores,
    ).toBe(score);
  });

  it('should check if country is remembered', () => {
    const { result } = renderHook(() => useCountryHistory());

    addScores(result, [
      [1, true],
      [1, true],
      [1, true],
      [1, true],
      [1, true],
      [2, false],
    ]);

    expect(result.current.isCountryRemembered(1)).toBe(true);
    expect(result.current.isCountryRemembered(2)).toBe(false);
  });

  it('should calculate the  right progress percent for country IDs', () => {
    const { result } = renderHook(() => useCountryHistory());

    addScores(result, [
      [1, true],
      [1, true],
      [1, true],
      [1, true],
      [1, true],
      [2, false],
    ]);

    expect(result.current.getProgressPercentForCountryIds([1])).toBe(100);
    expect(result.current.getProgressPercentForCountryIds([2])).toBe(0);
    expect(result.current.getProgressPercentForCountryIds([1, 2])).toBe(50);
  });
});
