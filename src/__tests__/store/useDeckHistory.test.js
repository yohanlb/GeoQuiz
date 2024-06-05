import {
  initializeDeckResults,
  useDeckHistory,
} from '@/src/stores/deckHistoryStore';
import useGameStore from '@/src/stores/gameStore';
import { AVAILABLE_QUESTION_TYPES } from '@lib/consts';
import { act, renderHook } from '@testing-library/react';

jest.mock('@/src/stores/gameStore', () => ({
  getState: jest.fn(),
}));

describe('useDeckHistory', () => {
  beforeEach(() => {
    useGameStore.getState.mockReturnValue({
      questionType: AVAILABLE_QUESTION_TYPES[0],
    });
  });

  it('should initialize with default deck results data', () => {
    const { result } = renderHook(() => useDeckHistory());
    expect(result.current.deckResultsData).toEqual(initializeDeckResults());
  });

  it('should clear all deck scores', () => {
    const { result } = renderHook(() => useDeckHistory());

    act(() => {
      result.current.updateDeckScore(1, 100);
    });

    act(() => {
      result.current.clearAllDeckScores();
    });

    expect(result.current.deckResultsData).toEqual(initializeDeckResults());
  });

  it('should get deck score', () => {
    const { result } = renderHook(() => useDeckHistory());

    act(() => {
      result.current.updateDeckScore(1, 100);
    });

    const score = result.current.getDeckScore(1);
    expect(score).toBe(100);
  });

  it('should get all deck scores', () => {
    const { result } = renderHook(() => useDeckHistory());

    act(() => {
      result.current.updateDeckScore(1, 100);
      result.current.updateDeckScore(2, 200);
    });

    const scores = result.current.getAllDeckScores();
    expect(scores).toEqual({ 1: 100, 2: 200 });
  });

  it('should get all played deck ids', () => {
    const { result } = renderHook(() => useDeckHistory());

    act(() => {
      result.current.updateDeckScore(1, 100);
      result.current.updateDeckScore(2, 200);
    });

    const ids = result.current.getAllPlayedDeckIds();
    expect(ids).toEqual([1, 2]);
  });

  it('should get last played deck ids', () => {
    const { result } = renderHook(() => useDeckHistory());

    act(() => {
      result.current.updateDeckScore(1, 100);
      result.current.updateDeckScore(2, 200);
    });

    const ids = result.current.getLastPlayedDeckIds();
    expect(ids).toEqual([2, 1]);
  });

  it('should update deck score and maintain history length', () => {
    const { result } = renderHook(() => useDeckHistory());

    act(() => {
      for (let i = 1; i <= 12; i++) {
        result.current.updateDeckScore(i, i * 100);
      }
    });

    const history = result.current.getLastPlayedDeckIds();
    expect(history.length).toBeLessThanOrEqual(10);
    expect(history).toEqual([12, 11, 10, 9, 8, 7, 6, 5, 4, 3]);
  });
});
